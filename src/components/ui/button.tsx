import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from "@/lib/utils"


interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?: ReactNode;
    className?: string; 
}

export const Button = ({ children, className, ...props}: Props) => {
    return (
        <button
            {...props}
            className={cn("p-3 w-full rounded-lg bg-[#5865f2] text-neutral-50 font-bold text-md z-50 transition-all hover:bg-[#4553e6] active:bg-[#3c44a2]", className)}
            >
            {children}
        </button>
    );
}
