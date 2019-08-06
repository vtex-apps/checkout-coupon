import React, { useState }  from 'react'
import { Button, Input } from 'vtex.styleguide'
import { compose, graphql } from 'react-apollo'
// import { Spinner } from 'vtex.styleguide'

import * as Coupons from './graphql/coupons.graphql'

import styles from './styles.css'

const Coupon: StorefrontFunctionComponent<CouponProps> = ({ }) => {

  const [isShowingPromoButton, setIsShowingPromoButton ] = useState(true);
  const [coupon, setCoupon] = useState('');
  const toggle = () => setIsShowingPromoButton(!isShowingPromoButton)

  const handleCouponChange = (evt: any) => {
      evt.preventDefault();
      const newCoupon = evt.target.value;
      setCoupon(newCoupon);
  }

  return (
    <div className={`${styles.container} flex flex-column ph4`}>
      <div className="mr4">
        <div className="ma0 dib">

          {isShowingPromoButton &&
            <div className="flex">
              <p>Promo Code</p>
              <Button className="ml7" variation="tertiary" onClick={toggle}>APPLY</Button>
          </div>
          }

          {!isShowingPromoButton && 
            <div className="flex">
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