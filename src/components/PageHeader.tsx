import { ReactNode } from 'react'
import ConnectWallet from '@/components/ConnectWallet'

interface PageHeaderInterface {
    className?: string
    children: ReactNode
}

export default function PageHeader(props: PageHeaderInterface) {
    return (
        <header
            className={props.className}
        >
            <div className="flex justify-end px-4 py-3">
                <ConnectWallet />
            </div>
            {props.children}
        </header>
    )
}
