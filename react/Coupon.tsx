import React, { useState }  from 'react'
import { Button, Input, Tag } from 'vtex.styleguide'
import { compose, graphql } from 'react-apollo'

import * as Coupons from './graphql/coupons.graphql'

import styles from './styles.css'

const Coupon: StorefrontFunctionComponent<CouponProps> = ({ }) => {

  const [isShowingPromoButton, setIsShowingPromoButton ] = useState(true);
  const [coupon, setCoupon] = useState('');
  const toggle = () => setIsShowingPromoButton(!isShowingPromoButton)

  const handleCouponChange = (evt: any) => {
      evt.preventDefault();
      const newCoupon = evt.target.value.trim();
      setCoupon(newCoupon);
  }

  return (
    <div className={`${styles.container} flex flex-column`}>
      <div className="mr4">
        <div>

          {isShowingPromoButton &&
            <div className="flex">
              <div className="w-60 pv5 b">Promo Code</div>

              <div className="w-40 pa2 tr">
                {!coupon &&
                    <Button variation="tertiary" onClick={toggle}>APPLY</Button>                    
                }

                {coupon &&
                  <span className="pv3 ph2 mr4">
                    <Tag size="large" onClick={toggle}>{coupon}</Tag>
                  </span>
                }
              </div>
            </div>
          }

          {!isShowingPromoButton && 
            <div className="pv4">
              <Input
                onChange={handleCouponChange}
                placeholder="Promo Code"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Promo Code"
                value={coupon}
                suffix={<Button variation="secondary" size="small" onClick={toggle}>OK</Button>}
              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

interface CouponProps {
  title?: string,
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
    options: { ssr: false}  
  })
) (Coupon)