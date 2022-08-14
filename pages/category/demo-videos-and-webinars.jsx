import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { QueryPostForCard } from "../../graphql/queries"

import Head from 'next/head'
import { useTranslations } from 'next-intl'

import { UnderlineBarLink } from '../../fuselage/components/u-bar-link/u-bar-link'

import { FeatureVideo } from '../../fuselage/components/feature-video-card/feature-video-card'
import { ArticleCardVideo } from '../../fuselage/components/article-card-video/article-card-video'
import { FeatureArticle } from '../../fuselage/components/feature-article-card/feature-article-card'
import { ArticleCard } from '../../fuselage/components/article-card/article-card'
import { CtaVideo } from "../../fuselage/components/cta-video/cta-video"

export default function Home({ entry, featured, ben, update, bitcoin, crypto, trends, tutorials, videoCta }) {

	const t = useTranslations('Global')

	console.log('entry:', entry)
	// console.log('featured:', featured)
	// console.log('ben:', ben)
	// console.log('update:', update)
	// console.log('bitcoin:', bitcoin)
	// console.log('crypto:', crypto)
	// console.log('trends:', trends)
	// console.log('tutorials:', tutorials)
	// console.log('videoCta:', videoCta)


	let metaTitle = JSON.parse(entry.seomatic.metaTitleContainer)
    let metaTags = JSON.parse(entry.seomatic.metaTagContainer)  
    // let metaLinks = JSON.parse(seomatic.metaLinkContainer)


	const handleMainFeature = () => {

		if ( !featured || !featured.mainFeatureArticle.length ) return
		
		const mainFeature = featured.mainFeatureArticle[0]
		let excerpt

		mainFeature.excerpt ? excerpt = mainFeature.excerpt : mainFeature.body

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

	const handleRecommendations = () => {

		if ( !featured || !featured.featureArticles.length ) return
		
		const featuredArticles = featured.featureArticles

		return (
			<section className="mt-md bt-1 bc-grey-20 pt-sm">
				<div>
					<p className="fs-5 fw-600 c-primary">Recommended for you</p>
				</div>

				<div className="columns-3 gap-sm mt-sm">

					{
						featuredArticles.map( entry => {
							if ( entry.heroType ) {
								//video hero
								return (
									<ArticleCardVideo
										key={entry.id}
										videoUrl={`https://www.youtube.com/watch?v=${entry.hero[0].video}`}
										href={`/${entry.slug}`}
										// categories={entry.categories}
										title={entry.title}
										excerpt={entry.body}
										date='2022-06-02T06:20:00-07:00'
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
										excerpt={entry.body}
										date='2022-06-02T06:20:00-07:00'
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

		if ( !section.entries.length ) return

		return (
			<section className="mt-lg">
				<h2 className="h fs-1 serif c-primary">{ section.category.title }</h2>

				<div className="columns-3 gap-sm mt-sm">

					{ 
						section.entries.map( entry => {
							if ( entry.heroType ) {
								//video hero
								return (
									<ArticleCardVideo
										key={entry.id}
										videoUrl={`https://www.youtube.com/watch?v=${entry.hero[0].video}`}
										href={`/${entry.slug}`}
										// categories={entry.categories}
										title={entry.title}
										excerpt={entry.body}
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
										excerpt={entry.body}
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

        if ( !videoCta.showCta ) return 

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

	const handlePeopleAreWatching = () => {
		return (
			<section className="mt-md bt-1 bc-grey-20 pt-sm">
				<div>
					<p className="fs-5 fw-600 c-primary">People are also watching</p>
				</div>

				<div className="columns-3 gap-sm mt-sm">

					{
						featuredArticles.map( entry => {
							if ( entry.heroType ) {
								//video hero
								return (
									<ArticleCardVideo
										key={entry.id}
										videoUrl={`https://www.youtube.com/watch?v=${entry.hero[0].video}`}
										href={`/${entry.slug}`}
										// categories={entry.categories}
										title={entry.title}
										excerpt={entry.body}
										date='2022-06-02T06:20:00-07:00'
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
										excerpt={entry.body}
										date='2022-06-02T06:20:00-07:00'
									/>
								)

							}
						})
					}
				</div>
			</section>
		)
	}

	return (
		<>
			<Head>
				<title>{metaTitle.title.title}</title>

				<meta name="description" content={metaTags.description.content} />
				<meta name="referrer" content={metaTags.referrer.content} />
				<meta content={metaTags['og:locale'].content} property="og:locale" />
				<meta content={metaTags['og:site_name'].content} property="og:site_name" />
				<meta content={metaTags['og:type'].content} property="og:type" />
				<meta content={metaTags['og:url'].content} property="og:url" />
				<meta content={metaTags['og:title'].content} property="og:title" />
				<meta content={metaTags['og:description'].content} property="og:description" />
				<meta content={metaTags['og:image'].content} property="og:image"></meta>
			</Head>

			{handleMainFeature()}

			{handleRecommendations()}

			{handleVideoCta()}

			{handleCategory(ben)}

			{handleCategory(update)}

			{handleCategory(bitcoin)}

			{handleCategory(crypto)}

			{handleCategory(trends)}

			{handleCategory(tutorials)}

			<div className="mt-md"></div>

		</>
	)
}



export async function getStaticProps({ locale, preview, previewData }) {

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
				entry(id: "	4231", site: "${siteHandle}") {
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
					}
				}
			}
        `
    })
    const featured = await featureArticlesData

	// video cta
	const videoCtaData = await craftApolloClient( preview, previewData ).query({
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
				}
			}
        `
    })
    const ben = await benData

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
				}
			}
        `
    })
    const update = await updateData

	// bitcoin riase and shine
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
				}
			}
        `
    })
    const crypto = await cryptoData

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
				}
			}
        `
    })
    const tutorials = await tutorialsData





    return { 
		props: { 
			entry: entry.data.entry,
			featured: featured.data.entry,
			ben : ben.data,
			update : update.data,
			bitcoin : bitcoin.data,
			crypto : crypto.data,
			trends : trends.data,
			tutorials : tutorials.data,
			videoCta,
			messages: (await import(`../../translations/${locale}.json`)).default
		}
	}
}