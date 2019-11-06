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
    const { getByText } = renderComponent({
      coupon: '',
      showPromoButton: false,
    })

    expect(getByText('Apply')).toBeTruthy()
  })

  it('should show coupon tag', () => {
    const { getByText } = renderComponent({
      coupon: 'testcoupon',
      showPromoButton: true,
    })

    expect(getByText('testcoupon')).toBeTruthy()
  })
})
