import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { withSession } from '@/lib/session'
import { POAP_URL_REGEX } from '@/lib/consts'
import { hasError, PoapResponse } from '@/types/poap'
import { NextApiRequest, NextApiResponse } from '@/types/next'

const handler = async (req: NextApiRequest<{ links: string[]; poapId: number }>, res: NextApiResponse) => {
	if (!req.body.links) return res.status(400).end()
	if (req.method != 'POST') return res.status(405).end()
	if (!req.session.userAddress) return res.status(403).end()

	const links = req.body.links.map(link => ({ claim_code: POAP_URL_REGEX.exec(link)[1] }))

	const meta = (await fetch(`https://api.poap.tech/events/id/${req.body.poapId}`, {
		headers: { 'X-API-Key': process.env.POAP_TOKEN },
	}).then(res => res.json())) as PoapResponse

	if (hasError(meta)) return res.status(meta.statusCode).send(meta.message)

	const poap = await prisma.poap.create({
		data: {
			name: meta.name,
			slug: slugify(meta.name),
			image_url: meta.image_url,
			description: meta.description,
			links: { createMany: { data: links } },
		},
	})

	return res.status(200).json(poap)
}

export default withSession(handler)
