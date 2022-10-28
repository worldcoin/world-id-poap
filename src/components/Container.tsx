import { FC, ReactNode } from 'react'
import clsx from 'clsx'

interface ContainerInterface {
    className?: string
    children: ReactNode
}

const Container: FC<ContainerInterface> = (props) => {
    const { className, children } = props
    return (
        <div className={clsx('w-full max-w-container mx-auto', className)}>
            {children}
        </div>
    )
}

export default Container
