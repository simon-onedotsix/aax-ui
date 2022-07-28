import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import {useTranslations} from 'next-intl'

import { handlePosts } from "../../lib/handle-posts"
import { handleTags } from "../../lib/handle-tags"

import { CtaVideo } from "../../fuselage/components/cta-video/cta-video"
import { CategorySearchButton } from '../../fuselage/components/category-search-button/category-search-button'

export default function CategoryPage ({ category, entries, tags, videoCta }) {

    const t = useTranslations('Global')

    // console.log('category:', category)
    // console.log('childCategories:', category.children)
    // console.log('category page entries:', entries)
    // console.log('tags:', tags)
    // console.log('videoCta:', videoCta)


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


    const handleVideoCta = () => {

        if ( category.slug != 'videos-and-webinars' || !videoCta.showCta ) return 

        return (
            <section className="mb-md">
                <CtaVideo
                    videoUrl={`https://www.youtube.com/watch?v=${videoCta.video}`} 
                    autoplay={true}
                    muted={false}
                    controls={true}
                    heading={videoCta.ctaBody[0].heading}
                    body={videoCta.ctaBody[0].body}
                    date={videoCta.date}
                /> 
            </section>
        )
    }


    return (
        <>
            <h1 className="h fs-1 serif c-primary pb-sm">{ category ? category.title : 'fallback' }</h1>

            {handleVideoCta()}

            {
                entries.length ?
                handlePosts(entries)
                : <p className="fs-6">{t("There are no posts in this category")}</p>
            }

            {handleRelatedCategories()}

            <section>
                <p className='fw-600 mt-md'>{t('Tags')}</p>
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

    // console.log('categories:', categories)

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

    if ( locale === 'id') {
        siteHandle = 'in'
    } else if ( locale === 'default') {
        siteHandle = 'en'
    } else {
        siteHandle = locale
    }

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
                entries(section: "posts", relatedToCategories: {slug: "${params.category}"} site: "${siteHandle}" limit: 50) {
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


    const videoCtaData = await craftApolloClient( preview, previewData ).query({
        query: gql`
            query VideoCategoryPage {
                entry(id: 4231, site: "${siteHandle}") {
                    ... on videoCategoryPage_videoCategoryPage_Entry {
                        id
                        showCta
                        video
                        date
                        ctaBody {
                            ... on ctaBody_BlockType {
                                id
                                heading
                                body
                            }
                        }
                    }
                }
            }
        `
    })
    const videoCta = videoCtaData.data.entry


    return { props: { 
        category, 
        entries, 
        tags,
        videoCta,
        messages: (await import(`../../translations/${locale}.json`)).default 
    }}
}