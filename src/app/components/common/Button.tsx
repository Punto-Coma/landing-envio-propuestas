import { cn } from '@/utils/cn'
import React from 'react'

interface Props {
    disabled?: boolean;
    onClick: (x: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({ disabled, onClick}:Props) => {

    const sendButtonClass = cn('py-2 mx-auto w-36 rounded-lg bg-[#5865f2] text-neutral-50 cursor-default font-bold text-md mt-4 z-50 transition-all md:h-[50px] md:mt-8 ease-out duration-400 ',{
        'opacity-40': disabled,
        'cursor-pointer hover:scale-110': !disabled,

    })

    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if(disabled) return 
      onClick(e)
    }


  return (
    <button
        onClick={handleClick }
        className={sendButtonClass}
        type='submit'>
         Enviar
    </button>
  )
}

export default Button