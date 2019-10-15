import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Input, Tag } from 'vtex.styleguide'

import { useOrderCoupon } from 'vtex.order-coupon/OrderCoupon'

const NO_ERROR = ''

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
            <div className="mb5">
              <Button
                variation="tertiary"
                collapseLeft
                noUpperCase
                onClick={toggle}
              >
                <FormattedMessage id="store/coupon.ApplyPromoCode" />
              </Button>
            </div>
          )}

          {coupon && (
            <div className="mb6">
              <div className="c-on-base t-small mb3">
                <FormattedMessage id="store/coupon.PromoCode" />
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
              errorKey ? (
                <FormattedMessage id={`store/coupon.${errorKey}`} />
              ) : (
                NO_ERROR
              )
            }
            label={<FormattedMessage id="store/coupon.PromoCodeLabel" />}
            value={coupon}
            suffix={
              <Button variation="secondary" size="small" type="submit">
                <FormattedMessage id="store/coupon.Apply" />
              </Button>
            }
          />
        </form>
      )}
    </Fragment>
  )
}

export default Coupon
