import prisma from '@/lib/prisma'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { Poap } from '@prisma/client'
import { getActionId } from '@/lib/wld'
import { serialize } from '@/lib/utils'
import { FC, useCallback, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { worldIDHash } from '@worldcoin/id/dist/utils'
import { VerificationResponse, WidgetProps } from '@worldcoin/id'
const WorldIDWidget = dynamic<WidgetProps>(() => import('@worldcoin/id').then(mod => mod.WorldIDWidget), { ssr: false })

const ClaimPage: FC<{ poap: Poap }> = ({ poap }) => {
	const [proof, setProof] = useState<VerificationResponse>(null)

	const claimPoap = useCallback(
		async event => {
			event.preventDefault()

			//@TODO: Handle case where no more codes left
			const { claim_code } = await fetch(`/api/claim/${poap.slug}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(proof),
			}).then(res => res.json())

			window.location.href = `https://poap.xyz/claim/${claim_code}`
		},
		[poap, proof]
	)

	return (
		<div>
			<h1>Claim {poap.name}</h1>
			<WorldIDWidget
				signal={poap.slug}
				onSuccess={setProof}
				enableTelemetry={true}
				actionId={getActionId(poap)}
				advancedUseRawActionId={true}
				onError={() => toast.error('Something went wrong!')}
			/>
			<button onClick={claimPoap}>Claim</button>
		</div>
	)
}

export const getStaticProps: GetStaticProps<{}, { slug: string }> = async ({ params: { slug } }) => {
	const poap = await prisma.poap.findUnique({ where: { slug } })
	if (!poap) return { notFound: true }

	return { props: { poap: serialize(poap) } }
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export default ClaimPage
