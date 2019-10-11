import React, { Fragment } from 'react'
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl'
import { Button, Input, Tag } from 'vtex.styleguide'

import { useOrderCoupon } from 'vtex.order-coupon/OrderCoupon'

defineMessages({
  Apply: {
    id: 'store/coupon.Apply',
    defaultMessage: 'Apply',
  },
  ApplyPromoCode: {
    id: 'store/coupon.ApplyPromoCode',
    defaultMessage: 'Apply Promo Code',
  },
  couponNotFound: {
    id: 'store/coupon.couponNotFound',
    defaultMessage: `Invalid Promo Code.`,
  },
  couponExpired: {
    id: 'store/coupon.couponExpired',
    defaultMessage: `This Promo Code has expired.`,
  },
  PromoCode: {
    id: 'store/coupon.PromoCode',
    defaultMessage: 'Promo Code',
  },
  PromoCodeLabel: {
    id: 'store/coupon.PromoCode',
    defaultMessage: 'Promo Code',
  },
})

const NO_ERROR = ''

const Coupon: StorefrontFunctionComponent<CouponProps & InjectedIntlProps> = ({
  intl,
}) => {
  const toggle = () => setShowPromoButton(!showPromoButton)

  const {
    coupon,
    setCoupon,
    insertCoupon,
    showPromoButton,
    setShowPromoButton,
    errorKey,
    setErrorKey,
  } = useOrderCoupon()

  const handleBlur = (evt: any) => {
    evt.preventDefault()
    const newCoupon = evt.target.value.trim()
    if (!newCoupon) {
      toggle()
    }
  }

  const handleCouponChange = (evt: any) => {
    evt.preventDefault()
    const newCoupon = evt.target.value.trim()
    setCoupon(newCoupon)
  }

  const resetCouponInput = () => {
    insertCoupon('')
    setCoupon('')
    setShowPromoButton(false)
  }

  const submitCoupon = (evt: any) => {
    evt.preventDefault()
    setErrorKey(NO_ERROR)
    insertCoupon(coupon)
  }

  return (
    <Fragment>
      {showPromoButton ? (
        <Fragment>
          {!coupon && (
            <div className="mb5">
              <Button variation="tertiary" collapseLeft noUpperCase onClick={toggle}>
                {intl.formatMessage({ id: `store/coupon.ApplyPromoCode` })}
              </Button>
            </div>
          )}

          {coupon && (
            <div className="mb6">
              <div className="c-on-base t-small mb3">
                {intl.formatMessage({ id: `store/coupon.PromoCode` })}
              </div>
              <Tag onClick={resetCouponInput}>{coupon}</Tag>
            </div>
          )}
        </Fragment>
      ) : (
        <form className="mb6" onSubmit={submitCoupon}>
          <Input
            autoFocus
            onChange={handleCouponChange}
            onBlur={handleBlur}
            placeholder=""
            errorMessage={
              errorKey
                ? intl.formatMessage({
                    id: `store/coupon.${errorKey}`,
                  })
                : NO_ERROR
            }
            label={intl.formatMessage({ id: `store/coupon.PromoCodeLabel` })}
            value={coupon}
            suffix={
              <Button variation="secondary" size="small" type="submit">
                {intl.formatMessage({ id: `store/coupon.Apply` })}
              </Button>
            }
          />
        </form>
      )}
    </Fragment>
  )
}

interface CouponProps {
  intl: object
}

export default injectIntl(Coupon)
