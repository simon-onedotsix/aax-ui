import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import {useTranslations} from 'next-intl'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { handlePosts } from "../../lib/handle-posts"
import { handleTags } from "../../lib/handle-tags"

import { CtaVideo } from "../../fuselage/components/cta-video/cta-video"
import { CategorySearchButton } from '../../fuselage/components/category-search-button/category-search-button'

export default function CategoryPage ({ category, entries, tags }) {

    const t = useTranslations('Global')

    // console.log('category:', category)
    // console.log('childCategories:', category.children)
    // console.log('category page entries:', entries)
    // console.log('tags:', tags)

    const router = useRouter()
    // console.log('ROUTER:', router)
    // console.log('ROUTER:', router.locale)


    let metaTitle
	let metaTags
	// let metaLinks

	if ( category && category.seomatic ) {
		metaTitle = JSON.parse(category.seomatic.metaTitleContainer)
		metaTags = JSON.parse(category.seomatic.metaTagContainer)  
		// metaLinks = JSON.parse(seomatic.metaLinkContainer)
	}


    const handleRelatedCategories = () => {

        if ( !category ) return

        if ( category.children.length ) {
            // console.log('kids:', category.children)
            return (
                <section className="mt-lg">
                    <p className="h fs-1 serif c-primary">{t('Related searches')}</p>
    
                    <p className="mt-sm">
                        {
                            category.children.map( childCategory => <CategorySearchButton key={childCategory.id} href={`/category/${childCategory.slug}`} outline>{childCategory.title}</CategorySearchButton>)
                        }
                    </p>
                </section>
            )
        }

    }

    const handleHrefLangLinks = () => {
        
        // console.log('current locales: ', router.locales)
        // console.log('current locale: ', router.locale)
        
        // console.log(`<link href="https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}" rel="canonical"/>`)
        // console.log(`<link href="https://trends.aax.com" rel="home">`)
        // console.log(`<link href="https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}" rel="alternate" hreflang="x-default"/>`)
        // console.log(`<link href="https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}" rel="alternate" hreflang="${router.locale}"/>`)
        
        // if ( router.locales ) {
        //     router.locales.map( locale => {
        //         if ( router.locale != 'en') console.log( 
        //             `<link href="https://trends.aax.com/${locale}${router.asPath}" rel="alternate" hreflang="${locale}"/>` 
        //         )
        //     })
        // }

        // return (
        //     <>
        //         <link href={`https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}`} rel="canonical"/>
        //         <link href="https://trends.aax.com" rel="home"/>
        //         <link href={`https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}`} rel="alternate" hrefLang="x-default"/>
        //         <link href={`https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}`} rel="alternate" hrefLang={router.locale}/>

        //         {
        //             availableLocales && availableLocales.map( link => {
        //                 if ( link && link.data && link.locale !== router.locale ) {
        //                     return <link key={link.locale} href={`https://trends.aax.com/${link.locale}/${link.data.slug}`} rel="alternate" hrefLang={link.locale}/>
        //                 }
        //             })
        //         }
        //     </>
        // )
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
			</Head>

            
            <h1 className="h fs-1 serif c-primary pb-sm">{ category ? category.title : 'fallback' }</h1>

            {
                entries.length ?
                handlePosts(entries)
                : <p className="fs-6">{t("There are no posts in this category")}</p>
            }

            {handleRelatedCategories()}

            <section>
                <p className='fw-600 mt-md'>{t('Tags')}</p>
                {handleTags(tags)}
            </section>
            
        </>
    )

    
}


// add (id: "not 103") to prevent video-and-webinar category from being queried

export async function getStaticPaths({ locales }) {
    
    const categoryData = await craftApolloClient().query({
        query: gql`
            query Category {
                categories (id: "not 103") {
                    id
                    slug
                }
            }
        `
    })

    const categories = await categoryData.data.categories

    // console.log('categories:', categories)

    let localisedCategories = []

    categories.map( category => {
        return (
            locales.forEach( locale => localisedCategories.push({ params: { category: category.slug }, locale: locale }) )
        )
    })

    return {
        paths: localisedCategories,
        fallback: false
    }

}

export async function getStaticProps({ params, preview, previewData, locale }) {

    // fix for not being able to query cms for language (convert indonesian)
    let siteHandle

    if ( locale === 'id') {
        siteHandle = 'in'
    } else if ( locale === 'default') {
        siteHandle = 'en'
    } else {
        siteHandle = locale
    }

    const entryData = await craftApolloClient( preview, previewData ).query({
        query: gql`
            query CategoryPage {
                category(slug: "${params.category}" site: "${siteHandle}") {
                    slug
                    title
                    children {
                        id
                        title
                        slug
                    }
                    seomatic(asArray: true) {
                        metaTitleContainer
                        metaTagContainer
                        metaLinkContainer
                    }
                }
                tags {
                    id
                    slug
                    title
                }
                entries(section: "posts", relatedToCategories: {slug: "${params.category}"} site: "${siteHandle}" limit: 50) {
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
        `
    })

    const entries = entryData.data.entries
    const category = entryData.data.category
    const tags = entryData.data.tags


    return { props: { 
        category, 
        entries, 
        tags,
        messages: (await import(`../../translations/${locale}.json`)).default 
    }}
}