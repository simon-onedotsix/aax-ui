import { useState } from 'react'
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

export default function Post ({ entry }) {

    const router = useRouter()
    // console.log('ROUTER:', router)


    const t = useTranslations('Global')

    // console.log('entry:', entry)
    // console.log('SEO — title:', JSON.parse(entry.seomatic.metaTitleContainer))
    // console.log('SEO — tags:', JSON.parse(entry.seomatic.metaTagContainer))
    // console.log('schema:', entry.schemaCode)

    let metaTitle = JSON.parse(entry.seomatic.metaTitleContainer)
    let metaTags = JSON.parse(entry.seomatic.metaTagContainer)  


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

            if ( entry.hero.length && entry.hero[0].image.length ) { 
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
                        <ArticleMeta author={entry.postAuthor[0]} date={entry.postDate}/>
                    </div>
                </>
            )
        }
    }
 
    const handleSchema = () => {
        if ( entry.heroType && entry.hero[0].video ) {
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
                            "url": "${process.env.NEXT_PUBLIC_SITE_URL}"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "AAX Trends",
                            "url": "${process.env.NEXT_PUBLIC_SITE_URL}",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "${process.env.NEXT_PUBLIC_SITE_URL}/assets/ui/AAX-trends-logo.svg"
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
                                "item": "${process.env.NEXT_PUBLIC_SITE_URL}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "${entry.categories[0].title}",
                                "item": "${process.env.NEXT_PUBLIC_SITE_URL}/category/${entry.categories[0].slug}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "${entry.categories[1].title}",
                                "item": "${process.env.NEXT_PUBLIC_SITE_URL}/category/${entry.categories[1].slug}"
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
                                "${entry.postAuthor.length ? entry.postAuthor[0].socialPlatforms[0].weblink : ''}",
                                "${entry.postAuthor.length ? entry.postAuthor[0].socialPlatforms[1].weblink : ''}"
                            ]
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "AAX Trends",
                            "url": "${process.env.NEXT_PUBLIC_SITE_URL}",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "${process.env.NEXT_PUBLIC_SITE_URL}/assets/ui/AAX-trends-logo.svg"
                            }
                        },
                        "headline": "${entry.title}",
                        "image": "${entry.hero[0].image[0].url}",
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
                                "item": "${process.env.NEXT_PUBLIC_SITE_URL}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "${entry.categories[0].title}",
                                "item": "${process.env.NEXT_PUBLIC_SITE_URL}/category/${entry.categories[0].slug}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "${entry.categories[1].title}",
                                "item": "${process.env.NEXT_PUBLIC_SITE_URL}/category/${entry.categories[1].slug}"
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
    

    console.log('satus:', entry.status)

    if ( entry.status === 'live' ) {
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
                    
                    <link rel='canonical' href={metaTags['og:url'].content} key='canonical' />
    
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `${handleSchema()}` }} />
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
                
                    <ButtonSocial href={`https://www.facebook.com/sharer/sharer.php?u=${`https://aax-ui.vercel.app`}${router.asPath}`} icon='facebook'/>
                    <ButtonSocial href={`https://twitter.com/intent/tweet?url=${`https://aax-ui.vercel.app`}${router.asPath}`} icon='twitter'/>
                    <ButtonSocial href={`https://www.linkedin.com/sharing/share-offsite/?url=${`https://aax-ui.vercel.app`}${router.asPath}`} icon='linkedin'/>
                </section>
    
    
                { 
                    entry.postAuthor.length ?
                    entry.postAuthor.map( author => {
                        return (
                            <AuthorCredit
                                key={ author.id }
                                fullName={ author.title }
                                jobTitle={ author.jobTitle }
                                bio={ author.bio }
                                avatarUrl={ author.avatar[0].url }
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


    async function queryLocalisedPosts ( localeCode ) {

        // let locale
        // localeCode === 'id' ? locale = 'in' : locale = localeCode

        let locale

        if ( localeCode === 'id') {
            locale = 'in'
        } else if ( localeCode === 'default') {
            locale = 'en'
        } else {
            locale = localeCode
        }

        const entriesData = await craftApolloClient().query({
            query: gql`
                query Posts {
                    entries(section: "posts" site: "${locale}", status: ["live","disabled"]) {
                        id
                        title
                        slug
                        siteId
                    }
    
                }
            `
        })
        const entries = await entriesData.data.entries
        const entriesLocalised = entries.map( entry => ({ params: { slug: entry.slug }, locale: localeCode }) )
        return entriesLocalised
    }

    const enEntries = await queryLocalisedPosts('en')
    const ruEntries = await queryLocalisedPosts('ru')
    const zhEntries = await queryLocalisedPosts('zh')
    const koEntries = await queryLocalisedPosts('ko')
    const frEntries = await queryLocalisedPosts('fr')
    const esEntries = await queryLocalisedPosts('es')
    const ptEntries = await queryLocalisedPosts('pt')
    const idEntries = await queryLocalisedPosts('id')
    const viEntries = await queryLocalisedPosts('vi')

    const entries = [ 
        ...enEntries, 
        ...ruEntries, 
        ...zhEntries, 
        ...koEntries,
        ...frEntries,
        ...esEntries,
        ...ptEntries,
        ...idEntries,
        ...viEntries 
    ]

    // console.log('ENTRIES FOUND:', entries.length)
    // console.log('ENTRIES:', entries)

    return {
        paths: entries,
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
            query Post {
                entry(section: "posts", slug: "${params.slug}", site: "${siteHandle}", status: ["live","disabled"]) {
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

    const page = entryData

    return { 
        props: { 
            entry: page.data.entry,
            messages: (await import(`../translations/${locale}.json`)).default
        }
    }
}