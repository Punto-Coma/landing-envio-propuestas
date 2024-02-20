import { cn } from '@/utils/cn'
import React from 'react'

interface Props {
    disabled?: boolean;
    onClick: (x: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({ disabled, onClick}:Props) => {

    const sendButtonClass = cn('py-3 w-full md:w-1/4 flex-shrink rounded-lg bg-[#5865f2] text-neutral-50 font-bold text-md z-50 transition-all',{
        'opacity-40': disabled,
        'hover:bg-[#4553e6]': ready,
        'opacity-75': !ready
    })

  return (
    <button
        onClick={(e) => onClick(e)}
        className={sendButtonClass}
        type='submit'>
         Enviar
    </button>
  )
}

export default Button