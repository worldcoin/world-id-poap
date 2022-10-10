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

	const response = await fetch('https://developer.worldcoin.org/api/v1/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.WLD_DEV_PORTAL_API_KEY}`,
		},
		// TODO: user_interfaces: {enabled_interfaces: ["widget"]}
		body: JSON.stringify({
			query: `mutation InsertAction($app_id: String!, $name: String!, $description: String!, $engine: String!, $public_description: String!, $status: String!, $is_staging: Boolean!) {
			insert_action_one(object: {app_id: $app_id, name: $name, description: $description, engine: $engine, public_description: $public_description, status: $status, is_staging: $is_staging })
			{
				id
			}
		  }`,
			variables: {
				app_id: process.env.WLD_APP_ID,
				name: meta.name,
				description: 'Created with POAP x Worldcoin integration',
				engine: 'cloud',
				public_description: 'Claim this POAP once',
				status: 'active',
				is_staging: false,
			},
		}),
	})

	if (!response.ok) {
		console.error('Error creating action on API', await response.json())
		return res.status(500).end()
	}

	const {
		data: {
			insert_action_one: { id },
		},
	} = await response.json()

	try {
		const poap = await prisma.poap.create({
			data: {
				name: meta.name,
				slug: meta.fancy_id,
				image_url: meta.image_url,
				description: meta.description,
				links: { createMany: { data: links } },
				action_id: id,
			},
		})

		return res.status(200).json(poap)
	} catch (e) {
		console.error(e)
		if (e.code == 'P2002') return res.status(409).end()

		return res.status(500).end()
	}
}

export default withSession(handler)
