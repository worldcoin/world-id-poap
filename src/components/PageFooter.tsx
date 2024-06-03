import Poap from '@/components/icons/Poap'
import External from '@/components/icons/External'
import WorldcoinLogo from '@/components/icons/WorldcoinLogo'
import clsx from 'clsx'

interface PageFooterInterface {
    className?: string
}

export default function PageFooter(props: PageFooterInterface) {
    return (
        <footer
            className={clsx(
                'sticky bottom-0 h-12 mt-32 px-4 flex items-center gap-x-8 text-sm text-white leading-1px bg-[#766FF1]',
                props.className
            )}
        >
            <div className="grow">
                Worldcoin x POAP is an open source project.{' '}
                <a
                    className="font-bold"
                    href="https://github.com/worldcoin/world-id-poap"
                    target="_blank"
                    rel="noreferrer"
                >
                    Check it out on GitHub.
                </a>
            </div>
            <a
                className="justify-self-end grid grid-flow-col gap-x-2 items-center"
                href="" // FIXME: fill href
                target="_blank"
                rel="noreferrer"
            >
                <Poap/> Learn about POAP <External/>
            </a>
            <a
                className="justify-self-end grid grid-flow-col gap-x-2 items-center"
                href="" // FIXME: fill href
                target="_blank"
                rel="noreferrer"
            >
                <WorldcoinLogo className="w-4 h-4"/> Learn about POAP <External/>
            </a>
        </footer>
    )
}
