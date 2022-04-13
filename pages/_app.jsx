import Layout from '../fuselage/layout/layout'

import '../css/index.css'

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
