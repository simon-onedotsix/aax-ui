import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { useRouter } from 'next/router'

import {useTranslations} from 'next-intl'

import { handlePosts } from "../../lib/handle-posts"
import { handleTags } from "../../lib/handle-tags"

export default function TagPage ({ entries, tags }) {

    const t = useTranslations('Global')

    // console.log('entries:', entries)
    // console.log('tags:', tags)

    const router = useRouter()
    const tagTitle = tags.find( obj => obj.slug == router.query.tag )


    return (
        <>
            <h1 className="h fs-1 serif c-primary pb-sm">{t("Articles tagged with")} &ldquo;{ tagTitle.title }&rdquo;</h1>

            {handlePosts(entries)}

            {handleTags(tags)}
            
        </>
    )
}


export async function getStaticPaths({ locales }) {
    
    const tagData = await craftApolloClient().query({
        query: gql`
            query Tags {
                tags {
                    id
                    slug
                    title
                }
            }
        `
    })

    const tags = await tagData.data.tags

    // return {
    //     paths: tags.map( tag => ({ params: { tag: tag.slug } })),
    //     fallback: false
    // }

    let localisedTags = []

    tags.map( tag => {
        return (
            locales.forEach( locale => localisedTags.push({ params: { tag: tag.slug }, locale: locale }) )
        )
    })

    // console.log('tags:', tags)

    return {
        paths: localisedTags,
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
            query Entries {
                entries(section: "posts", relatedToTags: {slug: "${params.tag}"} site: "${siteHandle}") {
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
                    }
                }
                tags {
                    id
                    slug
                    title
                }
            }
        `
    })

    const entries = entryData.data.entries
    const tags = entryData.data.tags

    return { 
        props: { 
            entries, 
            tags, 
            messages: (await import(`../../translations/${locale}.json`)).default 
        }
    }
}