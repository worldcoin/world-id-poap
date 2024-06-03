import { ReactNode } from 'react'
import clsx from 'clsx'

interface PaperInterface {
    className?: string
    children: ReactNode
}

const Paper = (props: PaperInterface) => {
    const { className, children } = props
    return (
        <div className={clsx('bg-white rounded-lg shadow-paper', className)}>
            {children}
        </div>
    )
}

export default Paper
