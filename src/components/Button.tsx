import { ComponentPropsWithoutRef, ElementType } from 'react'
import clsx from 'clsx'

interface ButtonInterface<C extends ElementType> {
    variant?: 'contained' | 'outlined'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    className?: string
    component?: C
}

const Button = <C extends ElementType = 'button'>(props: ButtonInterface<C> & ComponentPropsWithoutRef<C>) => {
    const {
        variant,
        size,
        fullWidth,
        disabled,
        className,
        component: Component = 'button',
        ...otherProps
    } = props
    return (
        <Component
            className={clsx(
                'inline-flex items-center justify-center leading-1px hover:opacity-80',
                { 'opacity-30 pointer-events-none': disabled },
                { 'rounded-[4px] border border-[1.5px]': variant === 'outlined' },
                { 'h-8 text-sm': size === 'sm' },
                { 'h-9 px-6 text-md': size === 'md' },
                { 'h-14 px-12 text-lg': size === 'lg' },
                { 'w-full': fullWidth },
                className
            )}
            {...otherProps}
        />
    )
}

export default Button
