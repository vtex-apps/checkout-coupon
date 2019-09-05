import { render } from '@vtex/test-tools/react'
import React from 'react'
import Coupon from '../Coupon'
import { OrderCouponContext } from 'vtex.order-coupon/OrderCoupon'

const promoButtonText = 'Apply Promo Code'

describe('<Coupon />', () => {
  const renderComponent = (customProps: any) => {
    const wrapper = render(
      <OrderCouponContext.Provider value={customProps}>
        <Coupon />
      </OrderCouponContext.Provider>
    )
    return wrapper
  }

  it('should be rendered', () => {
    const component = renderComponent({})
    expect(component).toBeDefined()
  })

  it('should show apply promo button', () => {
    const { getByText } = renderComponent({
      coupon: '',
      showPromoButton: true,
    })

    const element = getByText(promoButtonText)

    expect(element).toBeTruthy()
  })

  it('should show input when showPromoButton is false', () => {
    const { container } = renderComponent({
      coupon: '',
      showPromoButton: false,
    })

    expect(container.querySelector('input')).toBeTruthy()
  })

  it('should show coupon tag', () => {
    const { container, getByText } = renderComponent({
      coupon: 'testcoupon',
      showPromoButton: true,
    })

    expect(container.querySelector('input')).toBeFalsy()
    expect(getByText('testcoupon')).toBeTruthy()
  })
})
