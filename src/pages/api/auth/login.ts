import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { withSession } from '@/lib/session'
import { generateNonce, SiweMessage } from 'siwe'
import { NextApiRequest, NextApiResponse } from '@/types/next'

export type LoginResponse = { authenticated: boolean; nonce: string | null; user: User | null }

const handler = async (req: NextApiRequest<{ message: string; signature: string }>, res: NextApiResponse) => {
	if (req.method == 'GET') {
		if (req.session.userAddress) {
			return res.json({
				authenticated: true,
				user: { address: req.session.userAddress },
			} as LoginResponse)
		}

		req.session.nonce = generateNonce()
		await req.session.save()

		return res.status(200).json({ nonce: req.session.nonce, authenticated: false } as LoginResponse)
	}

	if (req.method == 'DELETE') {
		req.session.destroy()
		return res.status(200).end()
	}

	const message = new SiweMessage(req.body.message)
	const {
		data: { address },
	} = await message.verify({ signature: req.body.signature, nonce: req.session.nonce, domain: req.headers.host }, {})

	req.session.nonce = null
	req.session.userAddress = address
	await req.session.save()

	res.status(200).json(await prisma.user.upsert({ where: { address }, create: { address }, update: {} }))
}

export default withSession(handler)
