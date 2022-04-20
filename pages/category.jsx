import Head from 'next/head'

import { TagLink } from '../fuselage/components/tag-link/tag-link'
import { Button } from '../fuselage/components/button/button'
import { CategorySearchButton } from '../fuselage/components/category-search-button/category-search-button'

import { ArticleCardLandscape } from '../fuselage/components/article-card-landscape/article-card-landscape'

export default function Home() {

	return (
		<>
			<Head>
				<title>AAX</title>
				<meta name="description" content="AAX blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

		
			{/* featured article */}

			<section>
				<p className="h fs-1 serif c-primary pb-sm">Category Heading</p>

				<ArticleCardLandscape href='/post' />
				<ArticleCardLandscape href='/post' />
				<ArticleCardLandscape href='/post' />
				<ArticleCardLandscape href='/post' />
				<ArticleCardLandscape href='/post' />
				<ArticleCardLandscape href='/post' />
			</section>
			



			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Related searches</p>

				<p>
					<CategorySearchButton href='#' outline>Bitcoin</CategorySearchButton>
					<CategorySearchButton href='#' outline>SATS</CategorySearchButton>
					<CategorySearchButton href='#' outline>Global Digital Finance</CategorySearchButton>
					<CategorySearchButton href='#' outline>Crypto Currency</CategorySearchButton>
				</p>


				<p className='fw-600 mt-md'>Tags</p>

				<p className='mt-xs maxw-100pc' style={{ width: `100%`, overflow: `hidden`}}>
					<TagLink href='#'>Bitcoin</TagLink>
					<TagLink href='#'>SATS</TagLink>
					<TagLink href='#'>Global</TagLink>
					<TagLink href='#'>Digital</TagLink>
					<TagLink href='#'>Finance regulation</TagLink>
					<TagLink href='#'>AAB</TagLink>
					<TagLink href='#'>AAX</TagLink>
					<TagLink href='#'>coin burns</TagLink>
					<TagLink href='#'>cryptocurrency</TagLink>
					<TagLink href='#'>michael wong</TagLink>
					<TagLink href='#'>Thor Chan</TagLink>
					<TagLink href='#'>gold</TagLink>
					<TagLink href='#'>phigold</TagLink>
					<TagLink href='#'>Invest</TagLink>
					<TagLink href='#'>institutional</TagLink>
					<TagLink href='#'>Singapore</TagLink>
					<TagLink href='#'>The Capital</TagLink>
				</p>
			</section>
			
		




			<section className="mt-lg bg-dark px-md py-sm c-white formatted flex gap-sm jc-between">
				<p className='h fs-2 serif'>Are you a journalist or an editor?</p>
				<p><Button href='#' inverse>Call to action!</Button></p>
			</section>

		</>
	)
}
