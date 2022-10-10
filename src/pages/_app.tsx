import '@/styles/styles.css'
import { Toaster } from 'react-hot-toast'
import Web3Provider from '@/components/Web3Provider'
import { usePostHog } from '@/hooks/usePostHog';
import { useEffect } from 'react';
import posthog from 'posthog-js';

const App = ({ Component, pageProps }) => {
	usePostHog();
	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;
		if (apiKey) {
			posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
				autocapture: true,
				debug: process.env.NODE_ENV === "development",
				persistence: 'localStorage+cookie',
				loaded: (posthog) => {
				  posthog.register({ env: process.env.NODE_ENV });
				},
			  });
			  posthog.register({'app': 'world-id-poap'})
		}
	}, [])
	return (
		<Web3Provider>
			<Toaster />
			<Component {...pageProps} />
		</Web3Provider>
	)
}

export default App
