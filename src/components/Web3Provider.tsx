import { APP_NAME, CHAIN } from '@/lib/consts'
import { createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const client = createClient(
	getDefaultClient({
		chains: [CHAIN],
		appName: APP_NAME,
		autoConnect: true,
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
	})
)

const Web3Provider = ({ children }) => {
	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider mode="light">{children}</ConnectKitProvider>
		</WagmiConfig>
	)
}

export default Web3Provider
