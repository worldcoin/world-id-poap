import toast from 'react-hot-toast'
import { toText } from '@/lib/utils'
import { useModal } from 'connectkit'
import { useRouter } from 'next/router'
import { POAP_URL_REGEX } from '@/lib/consts'
import WorldcoinLogo from './icons/WorldcoinLogo'
import useWalletAuth from '@/hooks/useWalletAuth'
import { Transition, Dialog } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { ChangeEventHandler, FC, Fragment, useCallback, useState } from 'react'

const CreateModal: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
	const router = useRouter()
	const { setOpen } = useModal()
	const { authenticated } = useWalletAuth()
	const [links, setLinks] = useState<string[]>([])

	const onFileUpload: ChangeEventHandler<HTMLInputElement> = useCallback(async event => {
		event.preventDefault()

		const file = event.target.files[0]
		if (!file) throw toast.error('No file selected')

		const links = await toText(file).then(links => links.trim().split('\n'))
		if (!links.every(link => POAP_URL_REGEX.test(link))) throw toast.error('Invalid links file.')

		setLinks(links)
	}, [])

	const submitForm = useCallback(
		async event => {
			event.preventDefault()
			if (links.length == 0) return

			if (!authenticated) {
				setOpen(true)
				throw toast.error('Please sign in first.')
			}

			const response = await fetch('/api/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ links }),
			})

			if (!response.ok) {
				if (response.status == 409) throw toast.error('You have already added this POAP!')
				throw toast.error('Something went wrong.')
			}

			const poap = await response.json()
			router.push(`/claim/${poap.slug}`)
		},
		[router, links, authenticated, setOpen]
	)

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full justify-center text-center items-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel
								as="form"
								onSubmit={submitForm}
								className="relative transform overflow-hidden rounded-lg bg-white px-4 py-5 pb-4 text-left shadow-xl transition-all md:my-8 w-full max-w-sm sm:p-6 sm:pt-8"
							>
								<div>
									<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-poap-blue/10">
										<WorldcoinLogo className="h-6 w-6 text-poap-purple" aria-hidden="true" />
									</div>
									<div className="mt-3 text-center sm:mt-6">
										<div className="mb-4 sm:mb-6">
											<Dialog.Title as="h3" className="text-3xl text-gray-900">
												Create Your Dispenser
											</Dialog.Title>
											<p className="text-poap-purple">Worldcoin x Magic POAP Dispenser</p>
										</div>
										<div className="mt-2">
											<p className="text-xs text-gray-500 mb-2 text-left flex items-center space-x-1">
												<span>Select a .txt file that contains your POAP mint links.</span>
												<button
													onClick={() =>
														alert(
															"You'll get this from POAP via email once your POAP gets approved."
														)
													}
												>
													<QuestionMarkCircleIcon className="w-4 h-4 text-poap-blue/30" />
												</button>
											</p>
											<label className="block border bg-poap-blue/10 p-1 rounded-lg">
												<input
													type="file"
													accept="text/plain"
													onChange={onFileUpload}
													className="w-full text-sm text-black/50 file:mr-3 file:py-2 file:px-6 file:rounded-lg file:border-0 file:text-sm file:bg-poap-blue file:text-white hover:file:cursor-pointer focus:outline-none focus-visible:ring"
												/>
											</label>
											{links.length > 0 && (
												<p className="text-xs text-gray-500 mt-2">
													You will create a POAP claim link for {links.length} links.
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="mt-5 sm:mt-6">
									<button
										type="submit"
										disabled={links.length === 0}
										className="inline-flex w-full justify-center rounded-md border border-poap-blue px-4 py-3 text-poap-blue shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-poap-blue sm:text-sm disabled:cursor-not-allowed disabled:opacity-50 transition-opacity"
									>
										Create Dispenser
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default CreateModal
