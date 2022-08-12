import Script from "next/script"

import { gql } from "@apollo/client"
import craftApolloClient from "./api/apollo"

import {NextIntlProvider} from 'next-intl'

import Layout from '../fuselage/layout/layout'

import '../css/index.css'

function App({ Component, pageProps, globals, categories }) {
	return (
		<NextIntlProvider messages={pageProps.messages}>
			<Script id="google-tag-manager" strategy="afterInteractive">
				{`
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-PV785MR');
				`}
			</Script>
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

    if ( locale === 'id') {
        siteHandle = 'in'
    } else if ( locale === 'default') {
        siteHandle = 'en'
    } else {
        siteHandle = locale
    }

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

					... on header_GlobalSet {
						id
						name
						ctaButton {
						  ... on ctaButton_BlockType {
								id
								buttonLabel
								buttonLink
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
