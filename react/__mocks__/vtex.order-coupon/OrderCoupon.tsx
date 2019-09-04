import React, { createContext, useContext } from 'react'

interface Context {
  coupon: string
  showPromoButton: boolean
}

export const OrderCouponContext = createContext<Context | undefined>(undefined)

export const useOrderCoupon = () => {
  const context = useContext(OrderCouponContext)

  if (context === undefined) {
    throw new Error('useOrderCoupon must be used within a OrderCouponProvider')
  }

  return context
}
