import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { handlePosts } from "../../lib/handle-posts"
import { handleTags } from "../../lib/handle-tags"

import { CategorySearchButton } from '../../fuselage/components/category-search-button/category-search-button'

export default function CategoryPage ({ category, entries, tags }) {

    // console.log('category:', category)
    // console.log('childCategories:', category.children)
    // console.log('category page entries:', entries)
    // console.log('tags:', tags)


    const handleRelatedCategories = () => {

        if ( category.children.length ) {
            // console.log('kids:', category.children)
            return (
                <section className="mt-lg">
                    <p className="h fs-1 serif c-primary">Related searches</p>
    
                    <p>
                        {
                            category.children.map( childCategory => <CategorySearchButton key={childCategory.id} href={`/category/${childCategory.slug}`} outline>{childCategory.title}</CategorySearchButton>)
                        }
                    </p>
                </section>
            )
        }

    }


    return (
        <>
            <h1 className="h fs-1 serif c-primary pb-sm">{ category.title }</h1>

            {handlePosts(entries)}

            {handleRelatedCategories()}

            {handleTags(tags)}
            
        </>
    )

    
}




export async function getStaticPaths() {
    
    const categoryData = await craftApolloClient().query({
        query: gql`
            query Category {
                categories {
                    id
                    slug
                }
            }
        `
    })

    const categories = await categoryData.data.categories

    return {
        paths: categories.map( category => ({ params: { category: category.slug } })),
        fallback: false
    }

}

export async function getStaticProps({ params, preview, previewData }) {

    const entryData = await craftApolloClient( preview, previewData ).query({
        query: gql`
            query CategoryPage {
                category(slug: "${params.category}") {
                    slug
                    title
                    children {
                        id
                        title
                        slug
                    }
                }
                tags {
                    id
                    slug
                    title
                }
                entries(section: "posts", relatedToCategories: {slug: "${params.category}"}) {
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
            }
        `
    })

    const entries = entryData.data.entries
    const category = entryData.data.category
    const tags = entryData.data.tags

    return { props: { category, entries, tags }}
}