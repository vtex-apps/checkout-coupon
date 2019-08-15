import React, { useState } from 'react'
import { Button, Input, Tag, ButtonWithIcon, IconClose } from 'vtex.styleguide'
import { compose, graphql } from 'react-apollo'

import * as Coupons from './graphql/coupons.graphql'

// import styles from './styles.css'

const iconClose = <IconClose color="#727273"></IconClose>

const Coupon: StorefrontFunctionComponent<CouponProps> = () => {
  const [isShowingPromoButton, setIsShowingPromoButton] = useState(true)
  const [coupon, setCoupon] = useState('')
  const toggle = () => setIsShowingPromoButton(!isShowingPromoButton)

  const handleCouponChange = (evt: any) => {
    evt.preventDefault()
    const newCoupon = evt.target.value.trim()
    setCoupon(newCoupon)
  }

  const closeCouponInput = () => {
    setCoupon('')
    toggle()
  }

  return (
    <div>
      <div>
        {isShowingPromoButton && (
          <div className="flex w-100 c-on-base lh-copy items-center">
            <div className="flex-none fw6 fw5-l">Promo Code</div>

            <div className="flex-auto tr">
              {!coupon && (
                <Button variation="tertiary" onClick={toggle}>
                  APPLY
                </Button>
              )}

              {coupon && (
                <span className="pv5 ph2">
                  <Tag size="large" onClick={toggle}>
                    {coupon}
                  </Tag>
                </span>
              )}
            </div>
          </div>
        )}

        {!isShowingPromoButton && (
          <div className="flex">
            <div className="w-90 pv4">
              <Input
                onChange={handleCouponChange}
                placeholder="Promo Code"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Promo Code"
                value={coupon}
                suffix={
                  <Button variation="secondary" size="small" onClick={toggle}>
                    OK
                  </Button>
                }
              />
            </div>
            <div>
              <ButtonWithIcon
                icon={iconClose}
                variation="tertiary"
                onClick={closeCouponInput}
              ></ButtonWithIcon>
            </div>
          </div>
        )}
      </div>
    </div>
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
