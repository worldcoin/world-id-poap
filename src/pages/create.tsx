import toast from 'react-hot-toast'
import { toText } from '@/lib/utils'
import { useModal } from 'connectkit'
import { POAP_URL_REGEX } from '@/lib/consts'
import useWalletAuth from '@/hooks/useWalletAuth'
import ConnectWallet from '@/components/ConnectWallet'
import { ChangeEventHandler, useCallback, useState } from 'react'

const CreatePage = () => {
	const { setOpen } = useModal()
	const [poapId, setPoapId] = useState<string>('')
	const { authenticated } = useWalletAuth()
	const [links, setLinks] = useState<string[]>(null)

	const submitForm = useCallback(
		async event => {
			event.preventDefault()

			if (!authenticated) {
				setOpen(true)
				throw toast.error('Please sign in first.')
			}

			fetch('/api/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ poapId, links }),
			})
		},
		[poapId, links, authenticated, setOpen]
	)

	const onFileUpload: ChangeEventHandler<HTMLInputElement> = useCallback(async event => {
		event.preventDefault()

		const file = event.target.files[0]
		if (!file) throw toast.error('No file selected')

		const links = await toText(file).then(links => links.trim().split('\n'))
		if (!links.every(link => POAP_URL_REGEX.test(link))) throw toast.error('Invalid links file.')

		setLinks(links)
	}, [])

	return (
		<div>
			<ConnectWallet />
			<form onSubmit={submitForm}>
				<input type="text" value={poapId} onChange={e => setPoapId(e.target.value)} placeholder="POAP id" />
				<input onChange={onFileUpload} name="links" type="file" accept="text/plain" />
				{links && <p>Found {links.length} links.</p>}
				<button>Create</button>
			</form>
		</div>
	)
}

export default CreatePage
