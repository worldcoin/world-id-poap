import prisma from '@/lib/prisma'
import { arr_random } from '@/lib/utils'
import { withSession } from '@/lib/session'
import { POAP_URL_REGEX } from '@/lib/consts'
import { getDetailsFromClaimCode } from '@/lib/poap'
import { NextApiRequest, NextApiResponse } from '@/types/next'

const handler = async (req: NextApiRequest<{ links: string[] }>, res: NextApiResponse) => {
	if (!req.body.links) return res.status(400).end()
	if (req.method != 'POST') return res.status(405).end()
	if (!req.session.userAddress) return res.status(403).end()

	const links = req.body.links.map(link => ({ claim_code: POAP_URL_REGEX.exec(link)[1] }))
	const meta = await getDetailsFromClaimCode(arr_random(links).claim_code)

	const poap = await prisma.poap.create({
		data: {
			name: meta.name,
			slug: meta.fancy_id,
			image_url: meta.image_url,
			description: meta.description,
			links: { createMany: { data: links } },
		},
	})

	return res.status(200).json(poap)
}

export default withSession(handler)
