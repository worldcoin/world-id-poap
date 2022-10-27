import { ChangeEventHandler, useCallback, useState } from 'react'
import Modal from '@/components/Modal'
import WorldcoinLogo from '@/components/icons/WorldcoinLogo'
import Button from '@/components/Button'
import toast from 'react-hot-toast'
import { toText } from '@/lib/utils'
import { useModal } from 'connectkit'
import Spinner from './icons/Spinner'
import { useRouter } from 'next/router'
import { POAP_URL_REGEX } from '@/lib/consts'
import useWalletAuth from '@/hooks/useWalletAuth'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

interface CreateModalInterface {
	open: boolean
	onClose: () => void
}

const CreateModal = (props: CreateModalInterface) => {
	const { open, onClose } = props
	const router = useRouter()
	const { setOpen } = useModal()
	const { authenticated } = useWalletAuth()
	const [links, setLinks] = useState<string[]>([])
	const [creating, setCreating] = useState(false)

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

			setCreating(true)

			const response = await fetch('/api/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ links }),
			})

			setCreating(false)

			if (!response.ok) {
				if (response.status == 409) throw toast.error('You have already added this POAP!')
				throw toast.error('Something went wrong.')
			}

			const poap = await response.json()
			router.push(`/claim/${poap.slug}`)
		},
		[router, links, authenticated, setOpen, setCreating]
	)

	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<form className="text-center" onSubmit={submitForm}>
				<div className="mx-auto flex items-center justify-center w-24 h-24 rounded-full text-poap-blue bg-poap-blue/10">
					<WorldcoinLogo className="h-8"/>
				</div>
				<h2 className="mt-6 text-h2 leading-[1.375]">
					Create Your Dispenser
				</h2>
				<p className="mt-1 text-md text-poap-blue">
					Worldcoin x Magic POAP Dispenser
				</p>
				<hr className="my-4 border-poap-gray-light"/>
				<div className="mt-2">
					<p className="text-xs text-gray-500 mb-2 text-left flex items-center space-x-1">
						<span>Select a .txt file that contains your POAP mint links.</span>
						<button
							onClick={() =>
								alert(
									'You get this directly from POAP via email once your POAP gets approved.'
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
							disabled={creating}
							className="w-full text-sm text-black/50 file:mr-3 file:py-2 file:px-6 file:rounded-lg file:border-0 file:text-sm file:bg-poap-blue file:text-white hover:file:cursor-pointer focus:outline-none focus-visible:ring"
						/>
					</label>
					{links.length > 0 && (
						<p className="text-xs text-gray-500 mt-2">
							You will create a POAP claim link for {links.length} links.
						</p>
					)}
				</div>
				<hr className="my-4 border-poap-gray-light"/>
				<Button
					className="mt-2 mb-12 text-poap-blue border-poap-blue"
					variant="outlined"
					size="lg"
					fullWidth
					type="submit"
					disabled={links.length === 0 || creating}
				>
					{creating && <Spinner />}
					Create Dispenser
				</Button>
			</form>
		</Modal>
	)
}

export default CreateModal
