import { cn } from '@/utils/cn'
import React from 'react'

const Button = ({ ...props}) => {


  return (
    <button
        {...props}
    >
         Enviar
    </button>
  )
}

export default Button