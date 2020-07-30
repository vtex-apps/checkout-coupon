import React, { createContext, useContext } from 'react'

interface InsertCouponResult {
  success: boolean
  errorKey: string
}

interface OrderCouponContext {
  coupon: string
  insertCoupon: (coupon: string) => Promise<InsertCouponResult>
}

const CouponContext = createContext<undefined | OrderCouponContext>(undefined)

export const OrderCouponProvider: React.FC<OrderCouponContext> = ({
  coupon,
  insertCoupon,
  children,
}) => {
  return (
    <CouponContext.Provider value={{ coupon, insertCoupon }}>
      {children}
    </CouponContext.Provider>
  )
}

export const useOrderCoupon = () => useContext(CouponContext)
