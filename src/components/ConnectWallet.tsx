import { FC } from 'react'
import { motion } from 'framer-motion'
import { ConnectKitButton } from 'connectkit'
import useWalletAuth from '@/hooks/useWalletAuth'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

const MotionArrow = motion(ChevronRightIcon)

const ConnectWallet: FC = () => {
	const { authenticated } = useWalletAuth()

	return (
		<ConnectKitButton.Custom>
			{({ isConnected, show }) => {
				if (!isConnected) {
					return (
						<motion.button
							onClick={show}
							whileHover="groupHover"
							className="px-4 py-1.5 border border-poap-purple text-poap-purple rounded-lg flex items-center text-xs"
						>
							<span>Login</span>
							<MotionArrow style={{ y: -0.2 }} variants={{ groupHover: { x: 2 } }} className="w-4 h-4" />
						</motion.button>
					)
				}

				if (!authenticated) {
					return (
						<div
							onClick={show}
							className="px-4 py-1.5 border border-poap-purple text-poap-purple rounded-lg flex items-center text-xs"
						>
							<span>Sign message to continue</span>
						</div>
					)
				}

				return (
					<motion.button
						onClick={show}
						whileHover="groupHover"
						className="px-4 py-1.5 border border-poap-purple text-poap-purple rounded-lg flex items-center space-x-0.5 text-xs"
					>
						<span>Log out</span>
					</motion.button>
				)
			}}
		</ConnectKitButton.Custom>
	)
}

export default ConnectWallet
