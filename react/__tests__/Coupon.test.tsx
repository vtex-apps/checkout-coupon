import { render, fireEvent } from '@vtex/test-tools/react'
import React from 'react'
import Coupon from '../Coupon'

const promoButtonText = 'Apply promo code'
const applyButtonText = 'Apply'

describe('<Coupon />', () => {
  const renderComponent = (customProps: any) => {
    const wrapper = render(<Coupon {...customProps} />)
    return wrapper
  }

  it('should be rendered', () => {
    const component = renderComponent({})
    expect(component).toBeDefined()
  })

  it('should show apply promo button', () => {
    const { getByText } = renderComponent({
      coupon: '',
    })

    const element = getByText(promoButtonText)

    expect(element).toBeTruthy()
  })

  it('should show input when showPromoButton is false', () => {
    const { getByText } = renderComponent({
      coupon: '',
    })

    const button = getByText(promoButtonText)
    fireEvent.click(button)

    expect(getByText(applyButtonText)).toBeTruthy()
  })

  it('should show coupon tag', () => {
    const { getByText } = renderComponent({
      coupon: 'testcoupon',
    })

    expect(getByText('testcoupon')).toBeTruthy()
  })
})
