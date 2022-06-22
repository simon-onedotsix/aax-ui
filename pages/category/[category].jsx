import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { ArticleCardLandscape } from "../../fuselage/components/article-card-landscape/article-card-landscape"
import { ArticleCardVideoLandscape } from "../../fuselage/components/article-card-video-landscape/article-card-video-landscape"

export default function CategoryPage ({ category, entries }) {

    // console.log('category:', category)
    // console.log('category page entries:', entries)

    if ( entries.length ) {
        return (
            <>
                <h1 className="h fs-1 serif c-primary pb-sm">{ category.title }</h1>
                {
                    entries.map( entry => {
                        
                        if ( entry.heroType ) {
                            return (
                                <ArticleCardVideoLandscape
                                    key={entry.id}
                                    href={`/${entry.slug}`}
                                    videoUrl={'https://www.youtube.com/watch?v=e6aogh5OFJ8'}
                                    title={entry.title}
                                    excerpt={entry.excerpt}
                                    date={entry.postDate}
                                    categories={entry.categories}
                                />
                            )
    
                        } else {
                            let heroImage
                            if ( entry.hero[0].image.length ) { 
                                heroImage = entry.hero[0].image[0].url
                            } else {
                                heroImage = '/assets/ui/fallback.png'
                            }
                            return (
                                <ArticleCardLandscape 
                                    key={entry.id}
                                    href={`/${entry.slug}`}
                                    title={entry.title}
                                    excerpt={entry.excerpt}
                                    image={heroImage}
                                    date={entry.postDate}
                                    categories={entry.categories}
                                />
                            )
                        }
                        
                    })
                }
            </>
        )

    } else {
        return (
            <>
                <h1 className="h fs-1 serif c-primary pb-sm">{ category.title }</h1>
                <p className="fs-6"><span className="fw-600">Sorry!</span> Currently, there are no posts in this category.</p>
            </>
        )
    }

    
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

    return { props: { category, entries }}
}