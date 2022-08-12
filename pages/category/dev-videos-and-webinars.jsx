import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { QueryPostForCard } from "../../graphql/queries"

import Head from 'next/head'
import { useTranslations } from 'next-intl'

import { Button, AppStoreIcon, PlayStoreIcon } from '../../fuselage/components/button/button'
import { UnderlineBarLink } from '../../fuselage/components/u-bar-link/u-bar-link'

import { FeatureVideo } from '../../fuselage/components/feature-video-card/feature-video-card'
import { ArticleCardVideo } from '../../fuselage/components/article-card-video/article-card-video'
import { FeatureArticle } from '../../fuselage/components/feature-article-card/feature-article-card'
import { ArticleCard } from '../../fuselage/components/article-card/article-card'

import { CtaCallout } from '../../fuselage/components/cta-callout/cta-callout'

export default function Home({ features, explainers, videos, news, press, analysis, cta }) {

	const t = useTranslations('Global')

	// console.log('features:', features)
	// console.log('explainers:', explainers)
	// console.log('videos:', videos)
	// console.log('news:', news)
	// console.log('analysis:', analysis)
	// console.log('press:', press)
	// console.log('cta:', cta)


	const handleMainFeature = () => {

		if ( !features ) return
		if ( !features.mainFeatureArticle.length ) return
		
		const mainFeature = features.mainFeatureArticle[0]

		if ( mainFeature.heroType ) {

			//video hero

			return (
				<FeatureVideo 
					href={`/${mainFeature.slug}`}
					title={mainFeature.title}
					videoUrl={`https://www.youtube.com/watch?v=${mainFeature.hero[0].video}`}
					categories={mainFeature.categories}
					excerpt={mainFeature.body}
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
					excerpt={mainFeature.body}
					ctaLabel='Read more'
					categories={mainFeature.categories}
					author={mainFeature.postAuthor && null}
					date={mainFeature.postDate}
				/>
			)
		}

	}

	const handleFeatures = () => {

		if ( !features ) return
		if ( !features.featureArticles.length ) return
		
		const featuredArticles = features.featureArticles

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

	const handleCta = () => {

		// return

		if ( !cta || !cta.showCta ) return

		let hero = cta.ctaHero[0]
		let background
		
		cta.ctaBackground.length ? background = cta.ctaBackground[0].url : null


		return (
			<CtaCallout 
				heroSrc={hero.url}
				heroWidth={hero.width}
				heroHeight={hero.height}
				backgroundSrc={background}
				backgroundOpacity={cta.ctaBackgroundImageOpacity}
				backgroundColor={cta.ctaBackgroundColor}
				textColor={cta.ctaTextColor}
			>
				<div>
					<div className='formatted'>
						<p className='h fs-0 serif lh-1'>{ cta.ctaBody[0].heading }</p>
						<p className="fw-600 mt-sm">{ cta.ctaBody[0].body }</p>
					</div>

					{
						cta.ctaButton.length && cta.ctaButton.buttonLink ?
						<p className='mt-md'><Button href={cta.ctaButton[0].buttonLink} inverse>{cta.ctaButton[0].buttonLabel}</Button></p>
						: null
					}
				</div>

				<div>
					{
						cta.appStoreButtons[0].appleAppStoreLink ?
						<Button href={ cta.appStoreButtons[0].appleAppStoreLink } outline inverse target='_blank'>
							<AppStoreIcon color={cta.ctaTextColor}/>App Store
						</Button> 
						: null
					}
					{
						cta.appStoreButtons[0].googlePlayLink ?
						<Button href={cta.appStoreButtons[0].googlePlayLink} outline inverse target='_blank'>
							<PlayStoreIcon color={cta.ctaTextColor}/>Google Play
						</Button>
						: null
					}
				</div>
			</CtaCallout>
		)
	}

	return (
		<>
			<Head>
				<title>AAX</title>
				<meta name="description" content="AAX blog" />
			</Head>

			<p className="mb-sm">[ video and webinars custom layout ]</p>

			{handleMainFeature()}

			{handleFeatures()}

			{handleCategory(news)}
			
			{handleCategory(analysis)}


			{handleCta()}


			{handleCategory(explainers)}
			
			{handleCategory(videos)}
			
			{handleCategory(press)}

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

	//feature articles
    const featuresData = await craftApolloClient().query({
        query: gql`
			query FeatureArticles {
				entry(id: "2", site: "${siteHandle}") {
					id
					... on homepage_homepage_Entry {
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
    const features = await featuresData

	//CTA 
	const ctaData = await craftApolloClient().query({
        query: gql`
			query FeatureArticles {
				entry(id: "2", site: "${siteHandle}") {
					... on homepage_homepage_Entry {
						id
						showCta
						ctaHero {
							id
							url
							width
							height
						}
						ctaBackground {
							id
							url
							width
							height
						}
						ctaBackgroundImageOpacity
						ctaBackgroundColor
						ctaTextColor
						ctaBody {
							... on ctaBody_BlockType {
								id
								heading
								body
							}
						}
						ctaButton {
							... on ctaButton_BlockType {
								buttonLink
								buttonLabel
							}
						}
						appStoreButtons {
							... on appStoreButtons_BlockType {
								id
								googlePlayLink
								appleAppStoreLink
							}
						}
					}
				}
			}
        `
    })
    const cta = await ctaData

	//explainers
    const explainersData = await craftApolloClient().query({
        query: gql`
			query ExplainerPosts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "explainers"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "explainers", site: "${siteHandle}") {
					id
					slug
					title
				}
			}
        `
    })
    const explainers = await explainersData


	// videos
    const videosData = await craftApolloClient().query({
        query: gql`
			query VideoPosts {
                entries(section: "posts", limit: 3, relatedToCategories: {slug: "videos-and-webinars"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "videos-and-webinars", site: "${siteHandle}") {
					id
					slug
					title
				}
            }
        `
    })
    const videos = await videosData


	// news
    const newsData = await craftApolloClient().query({
        query: gql`
            query NewsPosts {
                entries(section: "posts", limit: 3, relatedToCategories: {slug: "news-and-insights"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "news-and-insights", site: "${siteHandle}") {
					id
					slug
					title
				}
            }
        `
    })
    const news = await newsData


	// press
    const pressData = await craftApolloClient().query({
        query: gql`
			query NewsPosts {
				entries(section: "posts", limit: 3, relatedToCategories: {slug: "press-room"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "press-room", site: "${siteHandle}") {
					id
					slug
					title
				}
			}
        `
    })
    const press = await pressData
	

	// crypto-technical-analysis
    const analysisData = await craftApolloClient().query({
        query: gql`
			query AnalysisPosts {
                entries(section: "posts", limit: 3, relatedToCategories: {slug: "crypto-technical-analysis"}, site: "${siteHandle}") {
					${QueryPostForCard}
				}
				category (slug: "crypto-technical-analysis", site: "${siteHandle}") {
					id
					slug
					title
				}
            }
        `
    })
    const analysis = await analysisData


    return { 
		props: { 
			features : features.data.entry,
			explainers : explainers.data,
			videos : videos.data,
			news : news.data,
			press : press.data,
			analysis : analysis.data,
			cta : cta.data.entry,
			messages: (await import(`../../translations/${locale}.json`)).default
		}
	}
}