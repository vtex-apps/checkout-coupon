import React, { Fragment, useState } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { ButtonPlain, InputButton, Tag } from 'vtex.styleguide'

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

const Coupon: StorefrontFunctionComponent<CouponProps> = ({
  coupon,
  insertCoupon,
  couponErrorKey,
}) => {
  const [showPromoButton, setShowPromoButton] = useState(true)
  const [errorKey, setErrorKey] = useState(couponErrorKey)
  const [currentCoupon, setCurrentCoupon] = useState(coupon)
  const toggle = () => setShowPromoButton(!showPromoButton)

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
    setCurrentCoupon(newCoupon)
  }

  const resetCouponInput = () => {
    insertCoupon('')
    setCurrentCoupon('')
    setShowPromoButton(false)
  }

  const submitCoupon = (evt: any) => {
    evt.preventDefault()
    setErrorKey(NO_ERROR)
    insertCoupon(currentCoupon).then((result: boolean) => {
      if (result) {
        setErrorKey(NO_ERROR)
        setShowPromoButton(true)
      } else {
        setErrorKey(couponErrorKey)
      }
    })
  }

  return (
    <Fragment>
      {showPromoButton ? (
        <Fragment>
          {!currentCoupon && (
            <div>
              <ButtonPlain id="add-coupon" onClick={toggle}>
                <FormattedMessage id="store/coupon.ApplyPromoCode" />
              </ButtonPlain>
            </div>
          )}

          {currentCoupon && (
            <div>
              <div className="c-on-base t-small mb3">
                <FormattedMessage id="store/coupon.PromoCode" />
              </div>
              <Tag id="coupon-code" onClick={resetCouponInput}>
                {currentCoupon}
              </Tag>
            </div>
          )}
        </Fragment>
      ) : (
        <form onSubmit={submitCoupon}>
          <InputButton
            id="coupon-input"
            button={<FormattedMessage id="store/coupon.Apply" />}
            isLoading={false}
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
            value={currentCoupon}
          />
        </form>
      )}
    </Fragment>
  )
}

interface CouponProps {
  coupon: string
  insertCoupon: (coupon: string) => Promise<boolean>
  couponErrorKey: string
}

export default Coupon
