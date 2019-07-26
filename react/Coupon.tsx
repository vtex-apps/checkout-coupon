import React from 'react'
// import React, { useState } from 'react'
import { Button } from 'vtex.styleguide'
// import { FormattedMessage } from 'react-intl'

// import TranslatedTitle from './components/TranslatedTitle'

import styles from './styles.css'

// const Example: StorefrontFunctionComponent<ExampleProps> = ({ title }) => {
//   const [inputValue, setValue] = useState<string | null>(null)

//   return (
//     <div className={`${styles.container} flex flex-column pv6 ph4`}>
//       <TranslatedTitle title={title} />
//       <div className="t-body pv4">
//         <FormattedMessage
//           id="base.change-value"
//           values={{ value: inputValue || '' }}
//         />
//       </div>
//       <Input
//         value={inputValue}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//           setValue(e.target.value)
//         }
//       />
//     </div>
//   )
// }

const Coupon: StorefrontFunctionComponent<CouponProps> = ({  }) => {

  return (
    <div className={`${styles.container} flex flex-column pv6 ph4`}>
      <div className="mb4 mr4">
        <div className="ma0 dib">
          <h3 className="t-heading-3">Promotions</h3>

          <Button variation="tertiary" collapseLeft>APPLY PROMO CODE</Button>
        </div>
        </div>
        
    </div>
  )
}

interface CouponProps {
  title?: string
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

export default Coupon
