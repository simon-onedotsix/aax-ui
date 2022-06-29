import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import {useTranslations} from 'next-intl'

import { handlePosts } from "../../lib/handle-posts"
import { handleTags } from "../../lib/handle-tags"

import { CategorySearchButton } from '../../fuselage/components/category-search-button/category-search-button'

export default function CategoryPage ({ category, entries, tags }) {

    const g = useTranslations('Global')
    const t = useTranslations('Category')

    // console.log('category:', category)
    // console.log('childCategories:', category.children)
    // console.log('category page entries:', entries)
    // console.log('tags:', tags)


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


    return (
        <>
            <h1 className="h fs-1 serif c-primary pb-sm">{ category ? category.title : 'fallback' }</h1>

            {handlePosts(entries)}

            {handleRelatedCategories()}

            <section>
                <p className='fw-600 mt-md'>{g('Tags')}</p>
                {handleTags(tags)}
            </section>
            
        </>
    )

    
}




export async function getStaticPaths({ locales }) {
    
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
    locale === 'id' ? siteHandle = 'in' : siteHandle = locale

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
                }
                tags {
                    id
                    slug
                    title
                }
                entries(section: "posts", relatedToCategories: {slug: "${params.category}"} site: "${siteHandle}") {
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