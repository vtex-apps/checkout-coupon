import React, { Fragment, useState } from 'react'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import { ButtonPlain, InputButton, Tag } from 'vtex.styleguide'
import { OrderCoupon } from 'vtex.order-coupon'

import styles from './Coupon.css'

const { useOrderCoupon } = OrderCoupon

const NO_ERROR = ''

const messages = defineMessages({
  Apply: {
    id: 'store/coupon.Apply',
    defaultMessage: 'Apply',
  },
  ApplyPromoCode: {
    id: 'store/coupon.ApplyPromoCode',
    defaultMessage: 'Apply promo code',
  },
  couponNotFound: {
    id: 'store/coupon.couponNotFound',
    defaultMessage: `Invalid promo code.`,
  },
  couponExpired: {
    id: 'store/coupon.couponExpired',
    defaultMessage: `This promo code has expired.`,
  },
  PromoCode: {
    id: 'store/coupon.PromoCode',
    defaultMessage: 'Promo Code',
  },
  PromoCodeLabel: {
    id: 'store/coupon.PromoCode',
    defaultMessage: 'Promo code',
  },
})

const Coupon: React.FC = () => {
  const { coupon, insertCoupon } = useOrderCoupon()
  const [showPromoButton, setShowPromoButton] = useState(true)
  const [errorKey, setErrorKey] = useState(NO_ERROR)
  const [currentCoupon, setCurrentCoupon] = useState('')
  const [loadingCoupon, setLoadingCoupon] = useState(false)
  const toggle = () => setShowPromoButton(!showPromoButton)
  const intl = useIntl()

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    evt.preventDefault()
    const newCoupon = evt.target.value.trim()

    if (!newCoupon) {
      setErrorKey(NO_ERROR)
      toggle()
    }
  }

  const handleCouponChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    const newCoupon = evt.target.value.trim()

    setCurrentCoupon(newCoupon)
  }

  const resetCouponInput = () => {
    insertCoupon('')
    setCurrentCoupon('')
    setShowPromoButton(false)
  }

  const submitCoupon = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setErrorKey(NO_ERROR)
    insertCoupon(currentCoupon).then(result => {
      setLoadingCoupon(false)
      if (result.success) {
        setErrorKey(NO_ERROR)
        setShowPromoButton(true)
      } else {
        setErrorKey(result.errorKey)
      }
    })
    setLoadingCoupon(true)
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
        <form className={styles.inputForm} onSubmit={submitCoupon}>
          <InputButton
            id="coupon-input"
            button={intl.formatMessage({ id: 'store/coupon.Apply' })}
            isLoading={loadingCoupon}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={handleCouponChange}
            onBlur={handleBlur}
            placeholder=""
            errorMessage={
              errorKey
                ? intl.formatMessage(
                    messages[errorKey as keyof typeof messages]
                  )
                : NO_ERROR
            }
            label={<FormattedMessage id="store/coupon.PromoCodeLabel" />}
            value={currentCoupon}
          />
        </form>
      )}
    </Fragment>
  )
}

export default Coupon
