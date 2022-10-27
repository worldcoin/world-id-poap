import { FC, useState } from 'react'
import CreateModal from '@/components/CreateModal'
import ManageModal from '@/components/ManageModal'
import ConnectWallet from '@/components/ConnectWallet'
import Container from '@/components/Container'
import Button from '@/components/Button'
import Image from 'next/image'
import Poap from '@/components/icons/Poap'
import External from '@/components/icons/External'
import WorldcoinLogo from '@/components/icons/WorldcoinLogo'
import bg from '../../public/images/bg.svg'

const Home: FC = () => {
	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
	const [manageModalOpen, setManageModalOpen] = useState<boolean>(false)

	return (
		<>
			<CreateModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
			<ManageModal open={manageModalOpen} onClose={() => setManageModalOpen(false)} />
			<div
				className="min-h-screen flex flex-col bg-center bg-no-repeat" // bg-gradient-to-b from-[#FF6848]/10 to-[#4940E0]/10
				style={{
					backgroundImage: `url(${bg.src})`
				}}
			>
				<header className="">
					<div>
						<ConnectWallet />
					</div>
					<Container>
						<h1 className="text-h1 text-poap-purple">
							Human-only POAP dispenser
						</h1>
						<p className="mt-3 text-h2 text-poap-pink">
							Worldcoin meets Magic POAP Dispenser
						</p>
						<p className="mt-6 text-lg text-poap-gray">
							Distribute POAPs ensuring a single person can only claim once.
						</p>
						<div className="mt-8 flex items-center space-x-4">
							<Button
								className="border-poap-purple text-poap-purple"
								variant="outlined"
								size="lg"
								onClick={() => setCreateModalOpen(true)}
							>
								Create Dispenser
							</Button>
							<Button
								className="px-6 text-poap-gray"
								size="lg"
								onClick={() => setManageModalOpen(true)}
							>
								Manage Dispenser
							</Button>
						</div>
					</Container>
				</header>
				<Container>
					<section className="mt-32 py-9 grid grid-cols-2 gap-x-6">
						<div className="grid items-center justify-center">
							<div className="relative">
								<Image
									src="/images/lesson1.svg"
									alt="Ethereum"
									width={420}
									height={248}
								/>
								<div className="absolute top-0 right-0 w-[441px]">
									<Image
										src="/images/lesson1-overlay.svg"
										alt=""
										width={441}
										height={331}
									/>
								</div>
							</div>
						</div>
						<div className="grid items-center justify-center">
							<h2 className="self-end mb-8 text-h2 text-poap-pink">
								Users
							</h2>
							<ol className="self-start list-decimal list-inside marker:text-poap-gray/30 grid grid-flow-row gap-y-4 text-lg text-poap-gray">
								<li>User taps or scans your QR code</li>
								<li>User verifies with World ID</li>
								<li>User gets the POAP 🎉</li>
							</ol>
						</div>
					</section>
					<section className="mt-32 py-9 grid grid-cols-2 gap-x-6">
						<div className="grid items-center justify-center">
							<h2 className="self-end mb-8 text-h2 text-poap-pink">
								Distributors
							</h2>
							<ol className="self-start list-decimal list-inside marker:text-poap-gray/30 grid grid-flow-row gap-y-4 text-lg text-poap-gray">
								<li>You upload your .txt file from PAOP</li>
								<li>You get a link and QR code you can share repeatedly</li>
								<li>A single person can only claim your POAP once 🥳</li>
							</ol>
						</div>
						<div className="grid items-center justify-center">
							<Image
								src="/images/lesson2.svg"
								alt="Bitcoin"
								width={420}
								height={248}
							/>
						</div>
					</section>
					<section className="mt-32 grid grid-flow-row gap-y-12 justify-center">
						<h2 className="font-light text-h2 text-poap-pink text-center">
							Start distributing<br/>human-only POAPs
						</h2>
						<Button
							className="border-poap-purple text-poap-purple"
							variant="outlined"
							size="lg"
							onClick={() => setCreateModalOpen(true)}
						>
							Create Dispenser
						</Button>
					</section>
				</Container>
				<footer className="sticky bottom-0 h-12 mt-32 px-4 flex items-center gap-x-8 text-sm text-white leading-[1px] bg-[#766FF1]">
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
			</div>
		</>
	)
}

export default Home
