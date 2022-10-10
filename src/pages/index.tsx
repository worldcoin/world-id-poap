import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import CreateModal from '@/components/CreateModal'
import ConnectWallet from '@/components/ConnectWallet'

const Home: FC = () => {
	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)

	return (
		<>
			<CreateModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
			<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FF6848]/10 to-[#4940E0]/10">
				<header className="flex items-center justify-end py-3 px-4">
					<ConnectWallet />
				</header>
				<main className="px-10">
					<div className="flex items-start">
						<h1 className="text-5xl font-light text-poap-purple mr-2">Human-only POAP dispenser</h1>
					</div>
					<p className="mt-2 text-xl text-poap-pink">Worldcoin meets Magic POAP Dispenser</p>
					<p className="mt-2 text-sm text-poap-gray">
						Distribute POAPs ensuring a single person can only claim once.
					</p>
					<div className="mt-8 flex items-center space-x-4">
						<button
							onClick={() => setCreateModalOpen(true)}
							className="px-4 py-1.5 border border-poap-purple text-poap-purple rounded flex items-center space-x-0.5 text-sm"
						>
							Create Dispenser
						</button>
						<button
							onClick={() => toast.error('Not implemented yet.')}
							className="px-4 py-1.5 text-sm text-poap-gray"
						>
							Manage Dispenser
						</button>
					</div>
				</main>
			</div>
		</>
	)
}

export default Home
