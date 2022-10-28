import { ReactNode } from 'react'
import clsx from 'clsx'
import bg from '@images/bg.svg'

interface PageInterface {
    className?: string
    children: ReactNode
}

export default function Page(props: PageInterface) {
    const { className, children } = props
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FF6848]/10 to-[#4940E0]/10">
            <div
                className={clsx('min-h-screen flex flex-col bg-center bg-no-repeat', className)}
                style={{
                    backgroundImage: `url(${bg.src})`
                }}
            >
                {children}
            </div>
        </div>
    )
}
