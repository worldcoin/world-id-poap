import Head from 'next/head'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import toast from 'react-hot-toast'
import { Poap } from '@prisma/client'
import { serialize } from '@/lib/utils'
import { FC, useCallback, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'

const ClaimPage: FC<{ poap: Poap }> = ({ poap }) => {
	const [proof, setProof] = useState<ISuccessResult>(null)

	const claimPoap = useCallback(
		async event => {
			event.preventDefault()
			if (!proof) return

			//@TODO: Handle case where no more codes left
			const response = await fetch(`/api/claim/${poap.slug}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(proof),
			})

			if (!response.ok) {
				if (response.status == 404) throw toast.error('POAP not found.')
				if (response.status == 403) throw toast.error('You have already claimed this POAP!')

				throw toast.error('Something went wrong. Please try again later.')
			}

			const { claim_code } = await response.json()
			window.location.href = `https://poap.xyz/claim/${claim_code}`
		},
		[poap, proof]
	)

	return (
		<>
			<Head>
				<link rel="icon" href={poap.image_url} />
			</Head>
			<div className="flex flex-col items-center justify-center py-4 rounded-3xl space-y-8 max-w-xs md:max-w-md mx-auto min-h-screen">
				<p className="text-poap-blue text-lg">Worldcoin x POAP</p>
				<form onSubmit={claimPoap} className="flex flex-col items-center space-y-6">
					<div className="flex flex-col items-center space-y-4">
						<Image src={poap.image_url} width={128} height={128} alt={poap.name} />
						<div className="space-y-3">
							<h1 className="text-poap-blue text-2xl text-center">
								Prove you are a unique person to claim your POAP
							</h1>
							<p className="font-medium text-black/70 text-center">{poap.name}</p>
						</div>
					</div>
					<div className="flex flex-col items-center space-y-6">
						<IDKitWidget
							signal={poap.slug}
							enableTelemetry
							actionId={poap.action_id}
							onSuccess={setProof}
							methods={['orb']}
						/>
						{poap.fallback_url && (
							<p className="text-black/50 text-sm text-center max-w-xs mx-auto">
								If you don’t have World ID, this POAP has an{' '}
								<a href={poap.fallback_url} target="_blank" className="text-poap-blue" rel="noreferrer">
									alternate version
								</a>{' '}
								that does not verify you are a unique person.
							</p>
						)}
					</div>
					<button
						disabled={!proof}
						type="submit"
						className="bg-poap-blue py-3 text-center text-white rounded-lg w-full disabled:opacity-75 disabled:cursor-not-allowed transition"
					>
						Claim POAP
					</button>
				</form>
			</div>
		</>
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
