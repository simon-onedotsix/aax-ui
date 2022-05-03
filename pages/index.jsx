import Head from 'next/head'

import { Button } from '../fuselage/components/button/button'
import { UnderlineBarLink } from '../fuselage/components/u-bar-link/u-bar-link'

import { FeatureArticle } from '../fuselage/components/feature-article-card/feature-article-card'
import { ArticleCardLandscape } from '../fuselage/components/article-card-landscape/article-card-landscape'
import { ArticleCard } from '../fuselage/components/article-card/article-card'
import { ArticleCategories } from '../fuselage/components/article-categories/article-categories'
import { ArticleMeta } from '../fuselage/components/article-meta/article-meta'
import { CtaBanner } from '../fuselage/components/cta-banner/cta-banner'

export default function Home() {

	return (
		<>
			<Head>
				<title>AAX</title>
				<meta name="description" content="AAX blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

		
			{/* featured article */}

			<FeatureArticle
				href='/post'
				eyebrow=''
				heroUrl='https://picsum.photos/1920/1080'
				title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
				excerpt='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius adipisci quam reprehenderit. Nemo, vero eos!'
				ctaLabel='Read more'
				categories={[{title: 'Features'}, {title: 'Markets'}]}
				author='Forename Surname'
				date='Feb 12, 2022'
			/>


			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Editor&apos; s Choice</p>

				<ArticleCardLandscape href='/post' />
				<ArticleCardLandscape href='/post' />
				<ArticleCardLandscape href='/post' />
			</section>
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">News and Opinion</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in News and Opinion</UnderlineBarLink>
				</p>

			</section>
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Crypto Technical Analysis</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in Crypto Technical Analysis</UnderlineBarLink>
				</p>
			</section>


			<section className="mt-lg bg-dark p-md c-white formatted">
				<p className='h fs-1 serif c-primary'>Callout</p>
				<p className='h fs-0 serif lh-1'>Praesent congue lorem non dolor nonsma?</p>
				<p className="fw-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste distinctio quis vero qui veniam corrupti autem tenetur, esse repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde deserunt quod, amet tempore consequatur perferendis iusto nam illum voluptatibus velit alias, officiis iure eum reprehenderit voluptates non quos, fuga inventore?</p>
				<p className='mt-md'><Button href='#' inverse>Call to action!</Button></p>
			</section>


			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Explainers</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in Explainers</UnderlineBarLink>
				</p>
			</section>
			
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Videos and Webinars</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in Videos and Webinars</UnderlineBarLink>
				</p>
			</section>
			
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Press Room</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in Press Room</UnderlineBarLink>
				</p>
			</section>

			<div className="mt-lg">
				<CtaBanner />
			</div>


		</>
	)
}
