import prisma from './prisma'
import { PoapDetails } from '@/types/poap'

const HOURS = 60 * 60 * 1000

export const getToken = async (): Promise<string> => {
	const token = await prisma.credential.findUnique({ where: { slug: 'poap-token' } })

	// if the last token was generated less than 24h ago, return it
	if (token && token.updated_at > new Date(Date.now() - 24 * HOURS)) return token.value

	const res: { access_token: string } = await fetch('https://poapauth.auth0.com/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			client_id: process.env.POAP_ID,
			grant_type: 'client_credentials',
			audience: process.env.POAP_AUDIENCE,
			client_secret: process.env.POAP_SECRET,
		}),
	}).then(res => res.json())

	await prisma.credential.upsert({
		where: { slug: 'poap-token' },
		update: { value: res.access_token },
		create: { slug: 'poap-token', value: res.access_token },
	})

	return res.access_token
}

export const getDetailsFromClaimCode = async (claimCode: string): Promise<PoapDetails> => {
	return fetch(`https://api.poap.tech/actions/claim-qr?qr_hash=${claimCode}`, {
		headers: {
			Authorization: `Bearer ${await getToken()}`,
		},
	})
		.then(res => res.json())
		.then(res => res.event as PoapDetails)
}
