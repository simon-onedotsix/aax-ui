import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { useRouter } from 'next/router'

import { handlePosts } from "../../lib/handle-posts"
import { handleTags } from "../../lib/handle-tags"

export default function TagPage ({ entries, tags }) {

    // console.log('entries:', entries)
    // console.log('tags:', tags)

    const router = useRouter()
    const tagTitle = tags.find( obj => obj.slug == router.query.tag )


    return (
        <>
            <h1 className="h fs-1 serif c-primary pb-sm">Articles tagged with &ldquo;{ tagTitle.title }&rdquo;</h1>

            {handlePosts(entries)}

            {handleTags(tags)}
            
        </>
    )
}


export async function getStaticPaths() {
    
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

    return {
        paths: tags.map( tag => ({ params: { tag: tag.slug } })),
        fallback: false
    }

}


export async function getStaticProps({ params, preview, previewData }) {

    const entryData = await craftApolloClient( preview, previewData ).query({
        query: gql`
            query Entries {
                entries(section: "posts", relatedToTags: {slug: "${params.tag}"}) {
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

    return { props: { entries, tags }}
}