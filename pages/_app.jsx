import { gql } from "@apollo/client"
import craftApolloClient from "./api/apollo"

import {NextIntlProvider} from 'next-intl'

import Layout from '../fuselage/layout/layout'

import '../css/index.css'

function App({ Component, pageProps, globals, categories }) {
	return (
		<NextIntlProvider messages={pageProps.messages}>
			<Layout globals={globals} categories={categories}>
				<Component {...pageProps} />
			</Layout>
		</NextIntlProvider>
	)
}

App.getInitialProps = async (ctx) => {

	let locale = ctx.router.locale

	// fix for not being able to query cms for language (convert indonesian)
    let siteHandle
    locale === 'id' ? siteHandle = 'in' : siteHandle = locale

	const { data } = await craftApolloClient().query({
		query: gql`
			query Globals {
				globalSets(site: "${siteHandle}") {
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
					... on footer_GlobalSet {
						id
						name
						footerLinks {
							... on footerLinks_BlockType {
								id
								column {
									... on column_heading_BlockType {
										id
										heading
									}
									... on column_link_BlockType {
										id
										label
										linkUrl
										openInNewWindow
									}
								}
							}
						}
						disclaimer {
							... on disclaimer_BlockType {
								id
								heading
								body
							}
						}
						subscribeForm {
							... on subscribeForm_BlockType {
								id
								heading
								body
							}
						}
					}
				}
				categories(site: "${siteHandle}", level: 1) {
                    id
					title
					slug
                }
			}
		
		`
	})

	// console.log(data)

	return { 
		globals: data.globalSets, 
		categories: data.categories
	}

}

export default App
