import Head from 'next/head'

import { Button } from '../fuselage/components/button/button'
import { UnderlineLink } from '../fuselage/components/u-link/u-link'

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

			<section>
				<p className="h fs-1 serif c-primary">Featured Article</p>

				<img className='w-100pc mb-xs' src="https://picsum.photos/1920/1080" alt="" />

				<div className="flex jc-between">
					<ArticleCategories categories={[{title: 'Features'}, {title: 'Markets'}]} />
					<ArticleMeta author='Forename Surname' date='Nov 12, 2021'/>
				</div>

				<p className='h fs-0 serif lh-1 maxw-60 mt-xs'>AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA</p>
				<p className='fs-5 fw-500 maxw-60'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius adipisci quam reprehenderit. Nemo, vero eos!</p>
				
				<p className='mt-sm'><Button href='/post' outline>Read more</Button></p>
			</section>


			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Editor's Choice</p>

				<ArticleCardLandscape />
				<ArticleCardLandscape />
				<ArticleCardLandscape />
			</section>
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">News and Opinion</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineLink href="/category">See all in News and Opinion</UnderlineLink>
				</p>

			</section>
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Crypto Technical Analysis</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineLink href="/category">See all in Crypto Technical Analysis</UnderlineLink>
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
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineLink href="/category">See all in Explainers</UnderlineLink>
				</p>
			</section>
			
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Videos and Webinars</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineLink href="/category">See all in Videos and Webinars</UnderlineLink>
				</p>
			</section>
			
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Press Room</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineLink href="/category">See all in Press Room</UnderlineLink>
				</p>
			</section>

			<div className="mt-lg">
				<CtaBanner />
			</div>


		</>
	)
}
