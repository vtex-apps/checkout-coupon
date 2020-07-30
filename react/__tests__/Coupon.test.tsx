import { render, fireEvent, wait } from '@vtex/test-tools/react'
import React, { useState } from 'react'

import Coupon from '../Coupon'

const {
  OrderCoupon: { OrderCouponProvider },
} = jest.requireMock('vtex.order-coupon')

describe('<Coupon />', () => {
  it('should show input after clicking to apply promotion code', () => {
    const { getByText, getByRole } = render(
      <OrderCouponProvider coupon="" insertCoupon={jest.fn()}>
        <Coupon />
      </OrderCouponProvider>
    )

    const button = getByText(/apply promo code/i)

    fireEvent.click(button)

    const couponInput = getByRole('textbox')

    expect(couponInput).toBeInTheDocument()
  })

  it('should show coupon tag if coupon already applied', () => {
    const { getByText } = render(
      <OrderCouponProvider coupon="testcoupon" insertCoupon={jest.fn()}>
        <Coupon />
      </OrderCouponProvider>
    )

    expect(getByText('testcoupon')).toBeInTheDocument()
  })

  it('should focus on the input after clicking on apply promo code button', () => {
    const { getByRole, getByText } = render(
      <OrderCouponProvider coupon="" insertCoupon={jest.fn()}>
        <Coupon />
      </OrderCouponProvider>
    )

    const addPromoButton = getByText(/apply promo code/i)

    fireEvent.click(addPromoButton)

    const couponInput = getByRole('textbox')

    expect(document.activeElement).toBe(couponInput)
  })

  it('should be able to submit the coupon code', async () => {
    const Component: React.FC = () => {
      const [coupon, setCoupon] = useState('')

      const insertCoupon = (newCoupon: string) => {
        setCoupon(newCoupon)

        return Promise.resolve({ success: true, errorKey: '' })
      }

      return (
        <OrderCouponProvider coupon={coupon} insertCoupon={insertCoupon}>
          <Coupon />
        </OrderCouponProvider>
      )
    }

    const { getByRole, getByText } = render(<Component />)

    const addPromoButton = getByText(/apply promo code/i)

    fireEvent.click(addPromoButton)

    const couponInput = getByRole('textbox')

    fireEvent.change(couponInput, { target: { value: 'freeshipping' } })

    const submitCouponButton = getByRole('button')

    fireEvent.click(submitCouponButton)

    await wait(() => expect(getByText('freeshipping')).toBeInTheDocument())
  })

  it('should remove coupon after clicking on coupon tag', () => {
    const Component: React.FC = () => {
      const [coupon, setCoupon] = useState('freeshipping')

      const insertCoupon = (newCoupon: string) => {
        setCoupon(newCoupon)

        return Promise.resolve({ success: true, errorKey: '' })
      }

      return (
        <OrderCouponProvider coupon={coupon} insertCoupon={insertCoupon}>
          <Coupon />
        </OrderCouponProvider>
      )
    }

    const { getByText, getByRole } = render(<Component />)

    const couponTag = getByText('freeshipping')

    expect(couponTag).toBeInTheDocument()

    fireEvent.click(couponTag)

    const couponInput = getByRole('textbox')

    expect(couponInput).toBeInTheDocument()
    expect(couponInput).toHaveValue('')
  })

  it.each`
    couponName          | errorKey            | messageRegex
    ${'expired coupon'} | ${'couponExpired'}  | ${/this promo code has expired/i}
    ${'invalid coupon'} | ${'couponNotFound'} | ${/invalid promo code/i}
  `(
    'should handle $errorKey error when submitting the coupon',
    async ({
      couponName,
      errorKey,
      messageRegex,
    }: {
      couponName: string
      errorKey: string
      messageRegex: RegExp
    }) => {
      const Component: React.FC = () => {
        const [coupon, setCoupon] = useState('')

        const insertCoupon = (newCoupon: string) => {
          if (newCoupon === couponName) {
            return Promise.resolve({ success: false, errorKey })
          }

          setCoupon(newCoupon)

          return Promise.resolve({ success: true, errorKey: '' })
        }

        return (
          <OrderCouponProvider coupon={coupon} insertCoupon={insertCoupon}>
            <Coupon />
          </OrderCouponProvider>
        )
      }

      const { getByRole, getByText } = render(<Component />)

      const addPromoButton = getByText(/apply promo code/i)

      fireEvent.click(addPromoButton)

      const couponInput = getByRole('textbox')

      fireEvent.change(couponInput, { target: { value: couponName } })

      const applyButton = getByRole('button')

      fireEvent.click(applyButton)

      await wait(() => expect(getByText(messageRegex)).toBeInTheDocument())
    }
  )
})
