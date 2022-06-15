import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { useRouter } from 'next/router'

export default function CategoryPage ({ page }) {

    console.log('category pageData:', page)

    const router = useRouter()
    const { category } = router.query

    console.log( 'slug:', category)

    return (
        <>
            <p>Category page</p>
        </>
    )
}


export async function getStaticPaths(category) {
    
    const entriesData = await craftApolloClient().query({
        query: gql`
            query Posts {
                entries(section: "posts", relatedToCategories: {slug: "${category}"}) {
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
                entry(section: "posts", slug: "text-video-post") {
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
                }
            }
        `
    })

    const page = entryData

    return { props: { page }}
}