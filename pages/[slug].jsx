import { useState } from 'react'

import { gql } from "@apollo/client"
import craftApolloClient from "./api/apollo"

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { VideoPlayer } from '../fuselage/components/video-player/video-player'
import { ArticleCategories } from '../fuselage/components/article-categories/article-categories'
import { ArticleMeta } from '../fuselage/components/article-meta/article-meta'
import { VideoMeta } from "../fuselage/components/video-meta/video-meta"
import { ButtonSocial } from '../fuselage/components/button-social/button-social'
import { AuthorCredit } from '../fuselage/components/author-credit/author-credit'
import { ArticleCard } from '../fuselage/components/article-card/article-card'

export default function Post ({ page }) {
    
    const entry = page.data.entry

    // console.log('page:', entry)
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
        if ( entry.heroType ) {
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
        }
        return (
            <>
                <Image 
                    src={entry.hero[0].image[0].url}
                    width={entry.hero[0].image[0].width}
                    height={entry.hero[0].image[0].height}
                    alt={entry.title}
                />
                <div className="flex jc-between mt-xs">
                    <ArticleCategories categories={entry.categories} />
                    <ArticleMeta author={entry.postAuthor[0]} date={entry.postDate}/>
                </div>
            </>
        )
    }


    return (
        <>
            <Head>
                <title>{metaTitle.title.title}</title>

                <meta name="description" content={metaTags.description.content} />
                <meta name="referrer" content={metaTags.referrer.content} />
                {/* <meta name="robots" content={metaTags.robots.content} /> */}
                <meta content={metaTags['og:locale'].content} property="og:locale" />
                <meta content={metaTags['og:site_name'].content} property="og:site_name" />
                <meta content={metaTags['og:type'].content} property="og:type" />
                <meta content={metaTags['og:url'].content} property="og:url" />
                <meta content={metaTags['og:title'].content} property="og:title" />
                <meta content={metaTags['og:description'].content} property="og:description" />
                <meta content={metaTags['og:image'].content} property="og:image"></meta>
                
                <link rel='canonical' href={metaTags['og:url'].content} key='canonical' />

                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: `${entry.schemaCode}` }}
                />
            </Head>


            <section>
				<h1 className='h fs-0 serif lh-2 maxw-55 pb-xs'>{ entry.title }</h1>
                { handleHero() }
				<p className='fs-5 fw-500 maxw-55 mt-sm'>{ entry.excerpt }</p>
			</section>


            <section className="mt-lg">
				<p className="fw-500 caps ls-2 c-primary pb-xs">Table of contents</p>
				<ul className='tableOfContents'>
					<li><Link href='#'><a>Mauris purus. Donec est nunc</a></Link></li>
					<li><Link href='#'><a>Ornare non, aliquet non tempus vel dolor. </a></Link></li>
					<li><Link href='#'><a>Integer sapien nibh</a></Link></li>
					<li><Link href='#'><a>Egestas ut cursus sit amet</a></Link></li>
				</ul>
			</section>


            <section className="mt-lg maxw-55 formatted">
                <div dangerouslySetInnerHTML={{__html: entry.body }} />
			</section>


			<section className='mt-md'>
				<p className='fw-500 mb-xs'>Share this article</p>
			
				<ButtonSocial icon='facebook'/>
				<ButtonSocial icon='twitter'/>
				<ButtonSocial icon='linkedin'/>
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
			
			<section className="mt-lg mb-md">
				<h2 className="h fs-1 serif c-primary">Related Articles</h2>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

			</section>
        </>
    )
}





export async function getStaticPaths() {

    const entriesData = await craftApolloClient().query({
        query: gql`
            query Posts {
                entries(section: "posts") {
                    slug
                }
            }
        `
    })

    const entries = await entriesData.data.entries

    return {
        paths: entries.map( entry => ({ params: { slug: entry.slug } })),
        fallback: false
    }

}

export async function getStaticProps({ params, preview, previewData }) {

    const entryData = await craftApolloClient( preview, previewData ).query({
        query: gql`
            query Post {
                entry(section: "posts", slug: "${params.slug}") {
                    ... on posts_Post_Entry {
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

    return { props: { page }}
}