import '@/styles/styles.css'
import { Toaster } from 'react-hot-toast'
import Web3Provider from '@/components/Web3Provider'

const App = ({ Component, pageProps }) => {
	return (
		<Web3Provider>
			<Toaster />
			<Component {...pageProps} />
		</Web3Provider>
	)
}

export default App
