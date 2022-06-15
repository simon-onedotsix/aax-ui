import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { useRouter } from 'next/router'
import Link from "next/link"

export default function CategoryPage ({ posts }) {

    console.log('category pageData:', posts)

    const router = useRouter()
    const { category } = router.query

    console.log( 'slug:', category)

    return (
        <>
            <p className="fs-4 pb-sm">Category page</p>
            {
                posts.map( post => <p key={post.id}><Link href={`/${post.slug}`}><a className='fw-600'>{post.title}</a></Link></p>)
            }
        </>
    )
}


export async function getStaticProps({ params, preview, previewData }) {

    const entryData = await craftApolloClient( preview, previewData ).query({
        query: gql`
            query Posts {
                entries(section: "posts", relatedToCategories: {slug: "explainers"}) {
                    id
                    slug
                    title
                }
            }
        `
    })

    const posts = entryData.data.entries

    return { props: { posts }}
}