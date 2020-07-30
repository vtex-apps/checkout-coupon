import { ComponentType } from 'react'

declare module 'vtex.styleguide' {
  export const Input: ComponentType<InputProps>

  interface InputProps {
    [key: string]: any
  }

  export const Tag: ComponentType<any>

  export const InputButton: ComponentType<any>
}
