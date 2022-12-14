import { SiweMessage } from 'siwe'
import { CHAIN } from '@/lib/consts'
import { User } from '@prisma/client'
import useSWRImmutable from 'swr/immutable'
import { LoginResponse } from '@/pages/api/auth/login'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'

type WalletAuth = {
	user: User
	loading: boolean
	logout: () => void
	authenticated: boolean
}

const useWalletAuth = (): WalletAuth => {
	const { address } = useAccount()
	const { disconnect } = useDisconnect()
	const isConnected = useRef<boolean>(false)

	const { data, isLoading, mutate } = useSWRImmutable<LoginResponse>('/api/auth/login', url =>
		fetch(url, { credentials: 'include' }).then(res => res.json())
	)

	const message = useMemo<string>(() => {
		if (typeof window === 'undefined' || !address || !data?.nonce) return

		return new SiweMessage({
			address,
			version: '1',
			chainId: CHAIN.id,
			nonce: data?.nonce,
			uri: window.location.origin,
			domain: window.location.host,
			statement: 'Sign in with Ethereum to protect your POAPs with World ID.',
		}).prepareMessage()
	}, [address, data?.nonce])

	const onLogout = useCallback(
		(shouldDisconnect: boolean = true) => {
			if (shouldDisconnect) disconnect()
			isConnected.current = false
			localStorage.removeItem('walletconnect')
			fetch('/api/auth/login', { method: 'DELETE', credentials: 'include' }).then(() => mutate())
		},
		[mutate, disconnect]
	)

	const { signMessage } = useSignMessage({
		message,
		onError: () => onLogout(),
		onSuccess: signature => {
			return fetch('/api/auth/login', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({ message, signature }),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(() => mutate())
		},
	})

	useEffect(() => {
		if (address) isConnected.current = true
		if (!address || isLoading || data?.authenticated) return

		signMessage()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, data?.authenticated])

	useEffect(() => {
		if (address || !isConnected.current) return

		onLogout(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address])

	return {
		user: data?.user,
		logout: onLogout,
		loading: isLoading,
		authenticated: data?.authenticated,
	}
}

export default useWalletAuth
