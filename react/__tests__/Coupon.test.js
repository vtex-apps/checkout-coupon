import expect from 'expect'
import { render } from '@vtex/test-tools/react'
import React from 'react'
import Coupon from '../Coupon.tsx'

describe('CouponComponent', () => {
  const renderComponent = customProps => {
    const wrapper = render(<Coupon></Coupon>)
    return wrapper
  }

  it('should be rendered', () => {
    const component = renderComponent()
    expect(component).toBeDefined()
  })

  it('should match the snapshot', () => {
    const component = renderComponent()
    expect(component).toMatchSnapshot()
  })
})
