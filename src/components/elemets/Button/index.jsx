'use client';

export const Button = ({className = "bg-black", children = "...", onclick = () => {}, type = "button"}) => {
    return (
        <button type={type} onClick={onclick} className={`text-white dark:text-black dark:bg-white rounded-2xl w-full py-3 text-sm font-medium mt-3 ${className}`}>{children}</button>
    )
}