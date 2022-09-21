import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { gql } from "@apollo/client"
import craftApolloClient from "./api/apollo"

import {useTranslations} from 'next-intl'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { format } from 'date-fns'

import { VideoPlayer } from '../fuselage/components/video-player/video-player'
import { ArticleCategories } from '../fuselage/components/article-categories/article-categories'
import { ArticleMeta } from '../fuselage/components/article-meta/article-meta'
import { VideoMeta } from "../fuselage/components/video-meta/video-meta"
import { ButtonSocial } from '../fuselage/components/button-social/button-social'
import { AuthorCredit } from '../fuselage/components/author-credit/author-credit'
import { ArticleCard } from '../fuselage/components/article-card/article-card'

import { LocalesContext } from './_app'

export default function Post ({ entry, availableLocales }) {
    
    // connect locales context
    const { langs, setLangs } = React.useContext(LocalesContext)

    useEffect( () => {
            
        // console.log('available translations:', availableLocales)        

        // set locales context
        setLangs(availableLocales)
        
    } ,[])



    const router = useRouter()
    // console.log('ROUTER:', router)
    // console.log('ROUTER:', router.locale)

    const t = useTranslations('Global')

    // console.log('entry:', entry)
    // console.log('SEO — title:', JSON.parse(entry.seomatic.metaTitleContainer))
    // console.log('SEO — tags:', JSON.parse(entry.seomatic.metaTagContainer))
    // console.log('SEO — links:', JSON.parse(entry.seomatic.metaLinkContainer))
    // console.log('schema:', entry.schemaCode)

    
    let metaTitle
    let metaTags
    let metaLinks 
    
    if ( entry && entry.seomatic ) {
        metaTitle = JSON.parse(entry.seomatic.metaTitleContainer)
        metaTags = JSON.parse(entry.seomatic.metaTagContainer)  
        metaLinks = JSON.parse(entry.seomatic.metaLinkContainer)  
    }
    
    // console.log('metaLinks:', metaLinks)

    const [ videoDuration, setVideoDuration ] = useState('00:00')

    function handleChange(newValue) {
        setVideoDuration(newValue)
    }

    const handleHero = () => {
        if ( entry.heroType && entry.hero[0].video ) {
            return (
                <>
                    <VideoPlayer 
                        videoUrl={`https://www.youtube.com/watch?v=${entry.hero[0].video}`} 
                        autoplay={false}
                        muted={false}
                        controls={true}
                        handleChange={handleChange}
                    />
                    <div className="flex jc-between mt-xs">
                        <ArticleCategories categories={entry.categories} />
                        <div className='flex flex-wrap gap-xs'>
                            <ArticleMeta author={entry.postAuthor} date={entry.postDate}/>
                            { videoDuration != '00:00' && <VideoMeta duration={videoDuration} /> }
                        </div>
                    </div>
                </>
            )

        } else {
            let heroImage
            let heroImageWidth
            let heroImageHeight

            if ( entry.hero && entry.hero.length && entry.hero[0].image.length ) { 
                heroImage = entry.hero[0].image[0].url
                heroImageWidth = entry.hero[0].image[0].width
                heroImageHeight = entry.hero[0].image[0].height
            } else {
                heroImage = '/assets/ui/fallback.png'
                heroImageWidth = 1920
                heroImageHeight = 1080
            }
            
            return (
                <>
                    <Image 
                        src={heroImage}
                        width={heroImageWidth}
                        height={heroImageHeight}
                        alt={entry.title}
                    />
                    <div className="flex jc-between mt-xs">
                        <ArticleCategories categories={entry.categories} />
                        <ArticleMeta author={entry.postAuthor && entry.postAuthor[0]} date={entry.postDate}/>
                    </div>
                </>
            )
        }
    }
 
    const handleSchema = () => {
        if ( entry && entry.heroType && entry.hero[0].video ) {
            // video hero schema
            return (
                `
                    {
                        "@context": "http://schema.org/",
                        "@type": "Article",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${metaTags['og:url'].content}"
                        },
                        "author": {
                            "@type": "Organization",
                            "name": "AAX Trends",
                            "url": "${process.env.NEXT_PUBLIC_CMS_URL}"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "AAX Trends",
                            "url": "${process.env.NEXT_PUBLIC_CMS_URL}",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "${process.env.NEXT_PUBLIC_CMS_URL}/assets/ui/AAX-trends-logo.svg"
                            }
                        },
                        "headline": "${entry.title}",
                        "image": "[URL of image under h1]",
                        "datePublished": "${entry.postDate}"
                    },
                    {
                        "@context": "http://schema.org/",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "AAX Trends",
                                "item": "${process.env.NEXT_PUBLIC_CMS_URL}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "${entry.categories && entry.categories[0] ? entry.categories[0].title : ''}",
                                "item": "${process.env.NEXT_PUBLIC_CMS_URL}/category/${entry.categories && entry.categories[0] ? entry.categories[0].slug : ''}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "${entry.categories && entry.categories[1] ? entry.categories[1].title : ''}",
                                "item": "${process.env.NEXT_PUBLIC_CMS_URL}/category/${entry.categories && entry.categories[1] ? entry.categories[1].slug : ''}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 4,
                                "name": "${entry.title}",
                                "item": "${metaTags['og:url'].content}"
                            }
                        ]
                    }
                
                `
            )

        } else {
            // image hero schema
            return (
                `
                    {
                        "@context": "http://schema.org/",
                        "@type": "Article",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${metaTags['og:url'].content}"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "${entry.postAuthor.length ? entry.postAuthor[0].title : ''}",
                            "url":[
                                "${entry.postAuthor.length && entry.postAuthor[0].socialPlatforms.length ? entry.postAuthor[0].socialPlatforms[0].weblink : ''}",
                                "${entry.postAuthor.length && entry.postAuthor[0].socialPlatforms.length ? entry.postAuthor[0].socialPlatforms[1].weblink : ''}"
                            ]
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "AAX Trends",
                            "url": "${process.env.NEXT_PUBLIC_CMS_URL}",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "${process.env.NEXT_PUBLIC_CMS_URL}/assets/ui/AAX-trends-logo.svg"
                            }
                        },
                        "headline": "${entry.title}",
                        "image": "${entry.hero[0] && entry.hero[0].image.length ? entry.hero[0].image[0].url : null}",
                        "datePublished": "${entry.postDate}"
                    },
                    {
                        "@context": "http://schema.org/",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "AAX Trends",
                                "item": "${process.env.NEXT_PUBLIC_CMS_URL}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "${entry.categories.length && entry.categories[0].title}",
                                "item": "${process.env.NEXT_PUBLIC_CMS_URL}/category/${entry.categories.length && entry.categories[0].slug}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "${entry.categories[1] ? entry.categories[1].title : null}",
                                "item": "${process.env.NEXT_PUBLIC_CMS_URL}/category/${entry.categories[1] ? entry.categories[1].slug : null}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 4,
                                "name": "${entry.title}",
                                "item": "${metaTags['og:url'].content}"
                            }
                        ]
                    }
                    
                `
            )
        }

    }

    const handleMetaTags = () => {
        if ( entry && entry.seomatic ) {
            
            return (
                <>
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
                </>
            )
        }
    }
    
    const handleMetaLinks = () => {
        if ( entry && entry.seomatic ) {

            return (
                <>
                    <link href={`https://trends.aax.com/${router.locale}${router.asPath}`} rel='canonical' />
                    <link href={metaLinks['home'].href} rel="home"/>
                    <link href={`https://trends.aax.com${router.asPath}`} rel="alternate" hrefLang="en"></link>
                    <link href={`https://trends.aax.com${router.asPath}`} rel="alternate" hrefLang="x-default"></link>

                    { metaLinks.alternate.map( (link, index) => {
                        if ( link.hreflang !== 'en' && link.hreflang !== 'x-default' ) {
                            return (
                                <link key={index} href={`https://trends.aax.com/${link.hreflang}${router.asPath}`} rel="alternate" hrefLang={link.hreflang}/> 
                            )}
                        }
                    )}
                </>
            )
        }
    }

    const handleHrefLangLinks = () => {
        
        console.log('current locale: ', router.locale)
        
        console.log(`<link href="https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}" rel="canonical"/>`)
        console.log(`<link href="https://trends.aax.com" rel="home">`)
        console.log(`<link href="https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}" hreflang="${router.locale}"/>`)
        
        if ( availableLocales ) {
            availableLocales.map( link => {
                if ( link && link.data && link.locale === 'en') console.log(`<link href="https://trends.aax.com/${link.data.slug}" rel="alternate" rel="x-default"/>`)

                if ( link && link.data && link.locale !== router.locale ) console.log( `<link href="https://trends.aax.com${link.locale !== 'en' ? `/${link.locale}` : ''}/${link.data.slug}" rel="alternate" hreflang="${link.locale}"/>` )
            })
        }

        return (
            <>
                <link href={`https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}`} rel="canonical"/>
                <link href="https://trends.aax.com" rel="home"/>
                <link href={`https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}`} rel="alternate" hrefLang={router.locale}/>

                {
                    availableLocales && availableLocales.map( link => {
                        if ( link && link.data && link.locale === 'en') {
                            return <link href={`https://trends.aax.com/${link.data.slug}`} rel="alternate" hrefLang="x-default"/>
                        }
                        if ( link && link.data && link.locale !== router.locale ) {
                            return <link key={link.locale} href={`https://trends.aax.com${link.locale !== 'en' ? `/${link.locale}` : ''}/${link.data.slug}`} rel="alternate" hrefLang={link.locale}/>
                        }
                    })
                }
            </>
        )
    }



    // console.log('satus:', entry.status)

    if ( entry ) {
        return (
            <>
                <Head>                    
                    { handleMetaTags() }
                    { handleHrefLangLinks() }
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `${ handleSchema() }` }} />
                </Head>
    
    
                <section>
                    <h1 className='h fs-0 serif lh-2 maxw-55 pb-sm'>{ entry.title }</h1>
                    
                    { handleHero() }
    
                    {
                        entry.excerpt ?
                        <p className='fs-5 fw-500 maxw-55 mt-sm'>{ entry.excerpt }</p>
                        : null
                    }
                </section>
    
    
                {/* <section className="mt-lg">
                    <p className="fw-500 caps ls-2 c-primary pb-xs">Table of contents</p>
                    <ul className='tableOfContents'>
                        <li><Link href='#'><a>Mauris purus. Donec est nunc</a></Link></li>
                        <li><Link href='#'><a>Ornare non, aliquet non tempus vel dolor. </a></Link></li>
                        <li><Link href='#'><a>Integer sapien nibh</a></Link></li>
                        <li><Link href='#'><a>Egestas ut cursus sit amet</a></Link></li>
                    </ul>
                </section> */}
    
    
                <section className="mt-md maxw-55 formatted">
                    <div dangerouslySetInnerHTML={{__html: entry.body }} />
                </section>
    
    
                <section className='mt-md'>
                    <p className='fw-500 mb-xs'>{t('Share this article')}</p>
                
                    <ButtonSocial href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} icon='facebook'/>
                    <ButtonSocial href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} icon='twitter'/>
                    <ButtonSocial href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} icon='linkedin'/>
                </section>
    
    
                { 
                    entry.postAuthor && entry.postAuthor.length ?
                    entry.postAuthor.map( author => {
                        return (
                            <AuthorCredit
                                key={ author.id }
                                fullName={ author.title }
                                jobTitle={ author.jobTitle }
                                bio={ author.bio }
                                avatarUrl={ author.avatar[0] && author.avatar[0].url }
                                socialConnections={ author.socialPlatforms }
                            />
                        )
                    }) : null
                }
    
    
    
                {/* related posts */}
                
                {/* <section className="mt-lg mb-md">
                    <h2 className="h fs-1 serif c-primary">Related Articles</h2>
    
                    <div className="columns-3 gap-sm mt-sm">
                        <ArticleCard
                            href='/'
                            image='https://picsum.photos/1920/1080'
                            title='Damn! Doze shares just got expensive, doh'
                            excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
                            date='2022-02-09T04:07:42-08:00'
                        />
                        <ArticleCard
                            href='/'
                            image='https://picsum.photos/1920/1080'
                            title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
                            excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
                            author='James Herbert'
                            date='2022-02-09T04:07:42-08:00'
                        />
                        <ArticleCard
                            href='/'
                            image='https://picsum.photos/1920/1080'
                            title='Damn! Doze shares just got expensive, doh'
                            excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
                            date='2022-02-09T04:07:42-08:00'
                        />
                    </div>
    
                </section> */}
            </>
        )

    } else if ( !entry ) {
        return (
            <section>
                <h1 className='h fs-0 serif lh-2 maxw-55 pb-sm'>404</h1>
                <p className='mt-sm fw-600'>{t("Generic 404")}</p>
            </section>
        )

    } else {
        return (
            <section>
                <h1 className='h fs-0 serif lh-2 maxw-55 pb-sm'>{ entry.title }</h1>
                <p className='mt-sm fw-600'>{t("Article 404")}</p>
            </section>
        )
    }

    
}




export async function getStaticPaths() {


    const entriesData = await craftApolloClient().query({
        query: gql`
            query Posts {
                entries(section: "posts", limit: 1000) {
                    id
                    title
                    slug
                }

            }
        `
    })
    const entries = await entriesData.data.entries
    const pathData = entries.map( entry => ({ params: { slug: entry.slug } }) )

    // console.log('ENTRIES FOUND:', pathData.length)
    // console.log('ENTRIES:', pathData)

    return {
        paths: pathData,
        fallback: 'blocking'
    }

}


export async function getStaticProps({ params, locale }) {

    let siteHandle

    if ( locale === 'id') {
        siteHandle = 'in'
    } else {
        siteHandle = locale
    }

    // post data
    
    const entryData = await craftApolloClient().query({
        query: gql`
        query Post {
            entry(section: "posts", slug: "${params.slug}", site: "${siteHandle}") {
                ... on posts_Post_Entry {
                    status
                    id
                    slug
                    title
                    postDate
                    excerpt
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
                    tags {
                        id
                        title
                        slug
                    }
                    body
                    postAuthor {
                        ... on profiles_profile_Entry {
                            id
                            title
                            jobTitle
                            bio
                            avatar {
                                id
                                url
                            }
                            socialPlatforms {
                                ... on socialPlatforms_BlockType {
                                    id
                                    platform
                                    weblink
                                }
                            }
                        }
                    }
                    schemaCode
                }
                seomatic (asArray: true) {
                    metaTitleContainer
                    metaTagContainer
                    metaLinkContainer
                    metaScriptContainer
                    metaJsonLdContainer
                    metaSiteVarsContainer
                    frontendTemplateContainer
                }
            } 
        }
        `
    })
    const page = entryData.data.entry
    
    
    // handle locales
    
    const availableLocales = []

    if ( page ) {

        //en
        const enData = await craftApolloClient( page ).query({
            query: gql`
                query Post {
                    entry(section: "posts", id: "${page.id}", site: "en") {
                        id
                        slug
                        title
                    }
                }
            `
        })
        availableLocales.push({ locale: 'en', data: enData.data.entry })

        //zh
        const zhData = await craftApolloClient( page ).query({
            query: gql`
                query Post {
                    entry(section: "posts", id: "${page.id}", site: "zh") {
                        id
                        slug
                        title
                    }
                }
            `
        })
        availableLocales.push({ locale: 'zh', data: zhData.data.entry })

        //ru
        const ruData = await craftApolloClient( page ).query({
            query: gql`
                query Post {
                    entry(section: "posts", id: "${page.id}", site: "ru") {
                        id
                        slug
                        title
                    }
                }
            `
        })
        availableLocales.push({ locale: 'ru', data: ruData.data.entry })

        //fr
        const frData = await craftApolloClient( page ).query({
            query: gql`
                query Post {
                    entry(section: "posts", id: "${page.id}", site: "fr") {
                        id
                        slug
                        title
                    }
                }
            `
        })
        availableLocales.push({ locale: 'fr', data: frData.data.entry })

        //es
        const esData = await craftApolloClient( page ).query({
            query: gql`
                query Post {
                    entry(section: "posts", id: "${page.id}", site: "es") {
                        id
                        slug
                        title
                    }
                }
            `
        })
        availableLocales.push({ locale: 'es', data: esData.data.entry })

        //pt
        const ptData = await craftApolloClient( page ).query({
            query: gql`
                query Post {
                    entry(section: "posts", id: "${page.id}", site: "pt") {
                        id
                        slug
                        title
                    }
                }
            `
        })
        availableLocales.push({ locale: 'pt', data: ptData.data.entry })

        //id [ note: craft cms site handle for indonesia is 'in' ]
        const idData = await craftApolloClient( page ).query({
            query: gql`
                query Post {
                    entry(section: "posts", id: "${page.id}", site: "in") {
                        id
                        slug
                        title
                    }
                }
            `
        })
        availableLocales.push({ locale: 'id', data: idData.data.entry })

        //vi
        const viData = await craftApolloClient( page ).query({
            query: gql`
                query Post {
                    entry(section: "posts", id: "${page.id}", site: "vi") {
                        id
                        slug
                        title
                    }
                }
            `
        })
        availableLocales.push({ locale: 'vi', data: viData.data.entry })

        // TEMP DISABLED –––––––––––––––––––––––––––––––––––---
        // * remember to update sitemap config when re-enabling

        //ko
        // const koData = await craftApolloClient( page ).query({
        //     query: gql`
        //         query Post {
        //             entry(section: "posts", id: "${page.id}", site: "ko") {
        //                 id
        //                 slug
        //                 title
        //             }
        //         }
        //     `
        // })
        // availableLocales.push({ locale: 'ko', data: koData.data.entry })

        // TEMP DISABLED –––––––––––––––––––––––––––––––––––---

    }
    

    // console.log('page:', page)
    // console.log('availableLocales:', availableLocales)
    

    return { 
        props: { 
            entry: page,
            availableLocales,
            messages: (await import(`../translations/${locale}.json`)).default
        },
        revalidate: 86400
    }
}