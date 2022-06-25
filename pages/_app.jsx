import { gql } from "@apollo/client"
import craftApolloClient from "./api/apollo"

import {NextIntlProvider} from 'next-intl'

import Layout from '../fuselage/layout/layout'

import '../css/index.css'

function App({ Component, pageProps, globals }) {
	return (
		<NextIntlProvider messages={pageProps.messages}>
			<Layout globals={globals}>
				<Component {...pageProps} />
			</Layout>
		</NextIntlProvider>
	)
}

App.getInitialProps = async () => {

	const { data } = await craftApolloClient().query({
		query: gql`
			query Globals {
				globalSet(id: 814) {
					id
					name
					... on sidebar_GlobalSet {
						id
						name
						ctaBody {
							... on ctaBody_BlockType {
								id
								heading
								body
							}
						}
						ctaButton {
							... on ctaButton_BlockType {
								id
								buttonLabel
								buttonLink
							}
						}
					}
				}
			}
		
		`
	})

	return { globals: data.globalSet }

}

export default App
