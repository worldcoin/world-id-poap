import { now } from '@/lib/utils'
import prisma from '@/lib/prisma'
import { getActionId } from '@/lib/wld'
import { VerificationResponse } from '@worldcoin/id'
import { NextApiRequest, NextApiResponse } from '@/types/next'

const handler = async (req: NextApiRequest<VerificationResponse, { slug: string }>, res: NextApiResponse) => {
	//@TODO: Handle case where there are no links left
	const poap = await prisma.poap.findUnique({
		where: { slug: req.query.slug as string },
		include: { links: { where: { claimed_at: null }, take: 1 } },
	})
	if (!poap) return res.status(404).end()

	const { success } = await fetch('https://developer.worldcoin.org/api/v1/verify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...req.body, signal: req.query.slug, action_id: getActionId(poap) }),
	}).then(res => res.json())
	if (!success) return res.status(403).end()

	prisma.poapLink.update({ where: { id: poap.links[0].id }, data: { claimed_at: now() } })

	return res.status(200).json({ claim_code: poap.links[0].claim_code })
}

export default handler
