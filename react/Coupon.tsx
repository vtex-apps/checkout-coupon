import React, { Fragment } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { ButtonPlain, Button, InputButton, Tag } from 'vtex.styleguide'

import { useOrderCoupon } from 'vtex.order-coupon/OrderCoupon'

const NO_ERROR = ''

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

const Coupon: StorefrontFunctionComponent = () => {
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
      setErrorKey(NO_ERROR)
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
            <div>
              <ButtonPlain id="add-coupon" onClick={toggle}>
                <FormattedMessage id="store/coupon.ApplyPromoCode" />
              </ButtonPlain>
            </div>
          )}

          {coupon && (
            <div>
              <div className="c-on-base t-small mb3">
                <FormattedMessage id="store/coupon.PromoCode" />
              </div>
              <Tag id="coupon-code" onClick={resetCouponInput}>
                {coupon}
              </Tag>
            </div>
          )}
        </Fragment>
      ) : (
        <form onSubmit={submitCoupon}>
          <InputButton
            id="coupon-input"
            button={<FormattedMessage id="store/coupon.Apply" />}
            autoFocus
            onChange={handleCouponChange}
            onBlur={handleBlur}
            placeholder=""
            errorMessage={
              errorKey ? (
                <FormattedMessage id={`store/coupon.${errorKey}`} />
              ) : (
                NO_ERROR
              )
            }
            label={<FormattedMessage id="store/coupon.PromoCodeLabel" />}
            value={coupon}
          />
        </form>
      )}
    </Fragment>
  )
}

export default Coupon
