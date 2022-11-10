import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { QueryPostForCard } from "../../graphql/queries"

import Head from 'next/head'
import Link from "next/link"
import { useRouter } from 'next/router'

import { useTranslations } from 'next-intl'

import { UnderlineBarLink } from '../../fuselage/components/u-bar-link/u-bar-link'

import { FeatureVideo } from '../../fuselage/components/feature-video-card/feature-video-card'
import { ArticleCardVideo } from '../../fuselage/components/article-card-video/article-card-video'
import { FeatureArticle } from '../../fuselage/components/feature-article-card/feature-article-card'
import { ArticleCard } from '../../fuselage/components/article-card/article-card'
import { CtaVideo } from "../../fuselage/components/cta-video/cta-video"

export default function Home({ entry, featured, videoCta, update, ben, bitcoin, crypto, videoExplainers, trends, tutorials, bitcoinAndBeyond, trends427, n2mu  }) {

	const t = useTranslations('Global')

	// console.log('entry:', entry)
	// console.log('featured:', featured)
	// console.log('ben:', ben)
	// console.log('update:', update)
	// console.log('bitcoin:', bitcoin)
	// console.log('crypto:', crypto)
	// console.log('trends:', trends)
	// console.log('tutorials:', tutorials)
	// console.log('videoCta:', videoCta)

	const router = useRouter()
    // console.log('ROUTER:', router)
    // console.log('ROUTER:', router.locale)

	const recommendations = featured && featured.featureArticles.length ? featured.featureArticles : null
	const peopleAreWatching = featured && featured.peopleAreWatching.length ? featured.peopleAreWatching : null


	let metaTitle
	let metaTags
	// let metaLinks

	if ( entry && entry.seomatic ) {
		metaTitle = JSON.parse(entry.seomatic.metaTitleContainer)
		metaTags = JSON.parse(entry.seomatic.metaTagContainer)  
		// metaLinks = JSON.parse(seomatic.metaLinkContainer)
	}


	const handleMainFeature = () => {

		if ( !featured || !featured.mainFeatureArticle.length ) return
		
		const mainFeature = featured.mainFeatureArticle[0]
		
		let excerpt
		mainFeature.excerpt ? excerpt = mainFeature.excerpt : excerpt = mainFeature.body

		if ( mainFeature.heroType ) {

			//video hero

			return (
				<FeatureVideo 
					href={`/${mainFeature.slug}`}
					title={mainFeature.title}
					videoUrl={`https://www.youtube.com/watch?v=${mainFeature.hero[0].video}`}
					categories={mainFeature.categories}
					excerpt={excerpt}
					author={mainFeature.postAuthor && null}
					date={mainFeature.postDate}
				/>
			)

		} else {
			
			// image hero

			let heroImage

		    if ( mainFeature.hero.length && mainFeature.hero[0].image.length ) { 
		        heroImage = mainFeature.hero[0].image[0].url
		    } else {
		        heroImage = '/assets/ui/fallback.png'
		    }

			return (
				<FeatureArticle
					href={`/${mainFeature.slug}`}
					title={mainFeature.title}
					heroUrl={heroImage}
					excerpt={excerpt}
					ctaLabel='Read more'
					categories={mainFeature.categories}
					author={mainFeature.postAuthor && null}
					date={mainFeature.postDate}
				/>
			)
		}

	}

	const handleRecommendations = ( heading, entries ) => {

		if ( !entries || !entries.length ) return
		
		return (
			<section className="mt-md bt-1 bc-grey-20 pt-sm">
				{
					heading &&
					<div><p className="fs-5 fw-600 c-primary">{ heading }</p></div>
				}

				<div className="columns-3 gap-sm mt-sm">

					{
						entries.map( entry => {

							let excerpt
							entry.excerpt ? excerpt = entry.excerpt : excerpt = entry.body

							if ( entry.heroType ) {
								//video hero
								return (
									<ArticleCardVideo
										key={entry.id}
										videoUrl={`https://www.youtube.com/watch?v=${entry.hero[0].video}`}
										href={`/${entry.slug}`}
										// categories={entry.categories}
										title={entry.title}
										excerpt={excerpt}
										date={entry.postDate}
									/>
								)

							} else {
								// image hero
								let heroImage
								if ( entry.hero.length && entry.hero[0].image.length ) { 
									heroImage = entry.hero[0].image[0].url
								} else {
									heroImage = '/assets/ui/fallback.png'
								}
								return (
									<ArticleCard
										key={entry.id}
										href={`/${entry.slug}`}
										image={heroImage}
										// categories={entry.categories}
										title={entry.title}
										excerpt={excerpt}
										date={entry.postDate}
									/>
								)

							}
						})
					}
				</div>
			</section>
		)
	}

	const handleCategory = ( section ) => {

		if ( !section || !section.entries.length || !section.category ) return

		return (
			<section className="mt-lg">
				{/* <h2 className="h fs-1 serif c-primary">{ section.category.title }</h2> */}
				<h2 className="h fs-1 serif c-primary">
					<Link href={`/category/${section.category.slug}`}><a style={{textDecoration: `none`}}>{ section.category.title }</a></Link>
				</h2>

				<div className="columns-3 gap-sm mt-sm">

					{ 
						section.entries.map( entry => {

							let excerpt
							entry.excerpt ? excerpt = entry.excerpt : excerpt = entry.body

							if ( entry.heroType ) {
								//video hero
								return (
									<ArticleCardVideo
										key={entry.id}
										videoUrl={`https://www.youtube.com/watch?v=${entry.hero[0].video}`}
										href={`/${entry.slug}`}
										// categories={entry.categories}
										title={entry.title}
										excerpt={excerpt}
										date={entry.postDate}
									/>
								)

							} else {
								// image hero
								let heroImage
								if ( entry.hero.length && entry.hero[0].image.length ) { 
									heroImage = entry.hero[0].image[0].url
								} else {
									heroImage = '/assets/ui/fallback.png'
								}
								return (
									<ArticleCard
										key={entry.id}
										href={`/${entry.slug}`}
										image={heroImage}
										// categories={entry.categories}
										title={entry.title}
										excerpt={excerpt}
										date={entry.postDate}
									/>
								)

							}
						})
					}

				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href={`/category/${section.category.slug}`}>{t("See all in")} { section.category.title }</UnderlineBarLink>
				</p>

			</section>
		)
	}

	const handleVideoCta = () => {

        if ( !videoCta || !videoCta.showCta ) return 

        return (
            <section className="my-md">
                <CtaVideo
                    videoUrl={`https://www.youtube.com/watch?v=${videoCta.video}`} 
                    autoplay={true}
                    muted={false}
                    controls={true}
                    heading={videoCta.ctaBody[0].heading}
                    body={videoCta.ctaBody[0].body}
                    date={videoCta.date}
                /> 
            </section>
        )
    }

	const handleVideoPageHrefLangLinks = () => {
        
		if ( !router ) return
	
		// console.log('current locales: ', router.locales)
		// console.log('current locale: ', router.locale)
		
		// console.log('router:', router)
		// console.log('path:', `/category/${router.query.category}`)
	
		let path = `/category/${router.query.category}`
	
		return (
			<>
				<link href={`https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.pathname}`} rel="canonical"/>
				<link href="https://trends.aax.com" rel="home"/>
				<link href={`https://trends.aax.com${router.pathname}`} rel="alternate" hrefLang="x-default"/>
	
				{
					router.locales.map( locale => {
						return <link key={locale} href={`https://trends.aax.com${locale !== 'en' ? `/${locale}` : ''}${router.pathname}`} rel="alternate" hrefLang={locale}/>
					})
				}
			</>
		)
	}


	return (
		<>
			<Head>
				<title>{metaTitle ? metaTitle.title.title : 'AAX Trends'}</title>

				<meta name="description" content={metaTags && metaTags.description.content} />
				<meta name="referrer" content={metaTags && metaTags.referrer.content} />
				<meta content={metaTags && metaTags['og:locale'].content} property="og:locale" />
				<meta content={metaTags && metaTags['og:site_name'].content} property="og:site_name" />
				<meta content={metaTags && metaTags['og:type'].content} property="og:type" />
				<meta content={metaTags && metaTags['og:url'].content} property="og:url" />
				<meta content={metaTags && metaTags['og:title'].content} property="og:title" />
				<meta content={metaTags && metaTags['og:description'].content} property="og:description" />
				<meta content={metaTags && metaTags['og:image'].content} property="og:image"></meta>

				{ handleVideoPageHrefLangLinks() }
			</Head>

			<h1 className="h fs-1 serif c-primary mb-xs">{t("Videos and webinars")}</h1>

			{handleMainFeature()}

			{handleRecommendations( t("Recommended"), recommendations )}
			
			{handleRecommendations( t("Most watched"), peopleAreWatching )}

			{handleVideoCta()}

			{handleCategory(ben)}

			{handleCategory(update)}

			{handleCategory(bitcoinAndBeyond)}

			{handleCategory(videoExplainers)}

			{handleCategory(bitcoin)}

			{handleCategory(crypto)}
			
			{handleCategory(n2mu)}

			{handleCategory(trends)}

			{handleCategory(tutorials)}
			
			{handleCategory(trends427)}

			<div className="mt-md"></div>

		</>
	)
}



export async function getStaticProps({ locale }) {

	// fix for not being able to query cms for language (convert indonesian)
    let siteHandle

    if ( locale === 'id') {
        siteHandle = 'in'
    } else if ( locale === 'default') {
        siteHandle = 'en'
    } else {
        siteHandle = locale
    }

	// seo meta
	const entryData = await craftApolloClient().query({
        query: gql`
			query SEO {
				entry(id: "4231", site: "${siteHandle}") {
					id
					... on videoCategoryPage_videoCategoryPage_Entry {
						id
						seomatic(asArray: true) {
								metaTitleContainer
								metaTagContainer
								metaLinkContainer
						}
					}
				}
			}
        `
    })
    const entry = await entryData

	//featured and recommended articles
    const featureArticlesData = await craftApolloClient().query({
        query: gql`
			query FeatureArticles {
				entry(id: "	4231", site: "${siteHandle}", status: ["live", "disabled"]) {
					id
					... on videoCategoryPage_videoCategoryPage_Entry {
						id
						featureArticles {
							... on posts_Post_Entry {
							id
							slug
							title
							postDate
							excerpt
							body
							heroType
							hero {
								... on hero_BlockType {
									id
									image {
										url
										width
										height
									}
									video
									}
								}
								categories {
									... on categories_Category {
									id
									title
									slug
									level
									}
								}
							}
						}

						mainFeatureArticle {
							... on posts_Post_Entry {
								id
								slug
								title
								postDate
								excerpt
								body
								heroType
								hero {
									... on hero_BlockType {
									id
									image {
										url
										width
										height
									}
									video
									}
								}
								categories {
									... on categories_Category {
									id
									title
									slug
									level
									}
								}
							}
						}

						peopleAreWatching {
							... on posts_Post_Entry {
								id
								slug
								title
								postDate
								excerpt
								body
								heroType
								hero {
									... on hero_BlockType {
										id
										image {
											url
											width
											height
										}
										video
									}
								}
								categories {
									... on categories_Category {
										id
										title
										slug
										level
									}
								}
							}
						}

					}
				}
			}
        `
    })
    const featured = await featureArticlesData

	// video cta
	const videoCtaData = await craftApolloClient().query({
        query: gql`
            query VideoCategoryPage {
                entry(id: 4231, site: "${siteHandle}") {
                    ... on videoCategoryPage_videoCategoryPage_Entry {
                        id
                        showCta
                        video
                        date
                        ctaBody {
                            ... on ctaBody_BlockType {
                                id
                                heading
                                body
                            }
                        }
                    }
                }
            }
        `
    })
    const videoCta = videoCtaData.data.entry




	// digital assets: market update
    const updateData = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "digital-assets-market-update"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "digital-assets-market-update", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
	const update = await updateData

	// ben and breakfast
    const benData = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "ben-and-breakfast"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "ben-and-breakfast", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
    const ben = await benData

	// bitcoin and beyond
    const bitcoinAndBeyondData = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "bitcoin-and-beyond"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "bitcoin-and-beyond", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
    const bitcoinAndBeyond = await bitcoinAndBeyondData

	// explainers (video)
    const videoExplainersData = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "video-explainers"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "video-explainers", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
    const videoExplainers = await videoExplainersData

	// bitcoin rise and shine
    const bitcoinData = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "bitcoin-rise-and-shine"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "bitcoin-rise-and-shine", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
    const bitcoin = await bitcoinData

	// crytpo en rouge
    const cryptoData = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "crypto-en-rouge"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "crypto-en-rouge", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
    const crypto = await cryptoData

	// n2mu
    const n2muData = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "n2mu"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "n2mu", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
    const n2mu = await n2muData

	// aax trends events
    const trendsData = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "aax-trends-events"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "aax-trends-events", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
    const trends = await trendsData

	// tutorials
    const tutorialsData = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "tutorials"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "tutorials", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
    const tutorials = await tutorialsData

	// tutorials
    const trends427Data = await craftApolloClient().query({
        query: gql`
			query Posts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "aax-trends-24-7"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "aax-trends-24-7", site: "${siteHandle}") {
					id
					slug
					title
					excerpt
					body
				}
			}
        `
    })
    const trends427 = await trends427Data
	
	





    return { 
		props: { 
			entry: entry.data.entry,
			featured: featured.data.entry,
			update : update.data,
			ben : ben.data,
			bitcoinAndBeyond : bitcoinAndBeyond.data,
			videoExplainers : videoExplainers.data,
			bitcoin : bitcoin.data,
			crypto : crypto.data,
			n2mu : n2mu.data,
			trends : trends.data,
			tutorials : tutorials.data,
			trends427 : trends427.data,
			videoCta,
			messages: (await import(`../../translations/${locale}.json`)).default
		}
	}
}