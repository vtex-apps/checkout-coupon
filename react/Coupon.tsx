import React, { useState, Fragment } from 'react'
import { Button, Input, Tag } from 'vtex.styleguide'
import { compose, graphql } from 'react-apollo'

import * as Coupons from './graphql/coupons.graphql'

const Coupon: StorefrontFunctionComponent<CouponProps> = () => {
  const [isShowingPromoButton, setIsShowingPromoButton] = useState(true)
  const [coupon, setCoupon] = useState('')
  const toggle = () => setIsShowingPromoButton(!isShowingPromoButton)

  const handleCouponChange = (evt: any) => {
    evt.preventDefault()
    const newCoupon = evt.target.value.trim()
    setCoupon(newCoupon)
  }

  const resetCouponInput = () => {
    setCoupon('')
    setIsShowingPromoButton(false)
  }

  const submitCoupon = (evt: any) => {
    evt.preventDefault()
    setIsShowingPromoButton(true)
  }

  return (
    <Fragment>
      {isShowingPromoButton ? (
        <Fragment>
          {!coupon && (
            <div className="mb5">
              <Button variation="tertiary" collapseLeft onClick={toggle}>
                Apply Promo Code
              </Button>
            </div>
          )}

          {coupon && (
            <div className="mb6">
              <div className="c-on-base t-small mb3">Promo Code</div>
              <Tag onClick={resetCouponInput}>{coupon}</Tag>
            </div>
          )}
        </Fragment>
      ) : (
        <form className="mb6" onSubmit={submitCoupon}>
          <Input
            autoFocus
            onChange={handleCouponChange}
            placeholder=""
            dataAttributes={{ 'hj-white-list': true, test: 'string' }}
            label="Promo Code"
            value={coupon}
            suffix={
              <Button variation="secondary" size="small" type="submit">
                Apply
              </Button>
            }
          />
        </form>
      )}
    </Fragment>
  )
}

interface CouponProps {
  title?: string
  CouponsQuery: any
}

Coupon.schema = {
  title: 'editor.base-store-component.title',
  description: 'editor.base-store-component.description',
  type: 'object',
  properties: {
    title: {
      title: 'editor.base-store-component.title.title',
      description: 'editor.base-store-component.title.description',
      type: 'string',
      default: null,
    },
  },
}

export default compose(
  graphql(Coupons.default, {
    options: { ssr: false },
  })
)(Coupon)
