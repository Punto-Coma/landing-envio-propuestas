import { cn } from '@/utils/cn'
import React from 'react'

interface Props {
    disabled?: boolean;
    onClick: (x: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({ disabled, onClick}:Props) => {

    const sendButtonClass = cn('py-2 mx-auto w-36 rounded-lg bg-[#5865f2] text-neutral-50 font-bold text-md mt-4 cursor-pointer z-50 transition-all ease-out duration-400 hover:scale-110',{
        'opacity-40': disabled,
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