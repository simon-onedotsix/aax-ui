import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import Head from 'next/head'

import {useTranslations} from 'next-intl'

import { TagLink } from '../../fuselage/components/tag-link/tag-link'
import { Button } from '../../fuselage/components/button/button'
import { CategorySearchButton } from '../../fuselage/components/category-search-button/category-search-button'
import { ArticleCardLandscape } from '../../fuselage/components/article-card-landscape/article-card-landscape'

export default function Categories({ categories }) {

	const t = useTranslations('Global')

	console.log('categories:', categories)

	const handleCategoryButtons = () => {

		if ( !categories ) return

		return (
			<p>
				{
					categories.map( category => <CategorySearchButton key={category.id} href={`/category/${category.slug}`} outline>{category.title}</CategorySearchButton> )
				}
			</p>
		)
	}

	return (
		<>
			<Head>
				<title>AAX</title>
				<meta name="description" content="AAX blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

		
			{/* featured article */}

			<section>
				<p className="h fs-1 serif c-primary pb-sm">{t('Categories')}</p>
			</section>
			

			<section>
				{handleCategoryButtons()}
			</section>
			

			{/* CTA */}

			{/* <section className="mt-lg bg-dark px-md py-sm c-white flex gap-sm jc-between">
				<p className='h fs-2 serif formatted'>Are you a journalist or an editor?</p>
				<p><Button href='#' inverse>Call to action!</Button></p>
			</section> */}

		</>
	)
}


export async function getStaticProps({ locale, preview, previewData }) {

    // fix for not being able to query cms for language (convert indonesian)
    let siteHandle

    if ( locale === 'id') {
        siteHandle = 'in'
    } else if ( locale === 'default') {
        siteHandle = 'en'
    } else {
        siteHandle = locale
    }

	const categoryData = await craftApolloClient( preview, previewData ).query({
        query: gql`
            query Categories {
                categories(site: "${siteHandle}") {
                    id
					title
					slug
                }
            }
        `
    })

    const categories = categoryData.data.categories


    return {
        props: {
			categories,
            messages: (await import(`../../translations/${locale}.json`)).default
        }
    }
}