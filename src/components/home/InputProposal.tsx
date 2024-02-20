import React from 'react'
import { BackgroundGradient } from '../ui/background-gradient'

interface Props {
    proposal: string
    onChange: (value:string) => void
}


const InputProposal = ({ proposal, onChange}: Props) => {
  return (
    <BackgroundGradient className="rounded-lg p-0 bg-neutral-950 dark:bg-zinc-900 mt-8">
        <input
            type="text"
            value={proposal}
            // this is giving me re renders on BackgroundGradient effect fix
            placeholder="Ingresá tu propuesta de proyecto..."
            onChange={v => onChange(v.target.value)}
            className="transition-all p-3 pl-4 rounded-lg border border-neutral-100 focus:ring-2 focus:ring-teal-500  w-full relative z-10   bg-neutral-950 placeholder:text-neutral-400 focus:placeholder:text-neutral-600 text-white"
        />
    </BackgroundGradient>
  )
}

export default InputProposal