import Head from 'next/head'

import { Button, AppStoreIcon, PlayStoreIcon } from '../fuselage/components/button/button'
import { UnderlineBarLink } from '../fuselage/components/u-bar-link/u-bar-link'

import { FeatureVideo } from '../fuselage/components/feature-video-card/feature-video-card'
import { ArticleCardVideo } from '../fuselage/components/article-card-video/article-card-video'
import { FeatureArticle } from '../fuselage/components/feature-article-card/feature-article-card'
import { ArticleCardLandscape } from '../fuselage/components/article-card-landscape/article-card-landscape'
import { ArticleCard } from '../fuselage/components/article-card/article-card'

import { CtaCallout, SecondayActions } from '../fuselage/components/cta-callout/cta-callout'

export default function Home() {

	return (
		<>
			<Head>
				<title>AAX</title>
				<meta name="description" content="AAX blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<FeatureVideo 
                href='#'
                title='Libero hic sint aliquam sunt fuga cum rerum'
                videoUrl='https://www.youtube.com/watch?v=aPK1VQtsteQ'
				date='2022-06-02T06:20:00-07:00'
            />


			<section className="mt-md">

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCardVideo
						videoUrl='https://www.youtube.com/watch?v=0NrnwW8Vz2I'
						href='#'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-06-02T06:20:00-07:00'
					/>
					<ArticleCardVideo
						videoUrl='https://www.youtube.com/watch?v=Zz72RG9hUYA'
						href='#'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-06-02T06:20:00-07:00'
					/>
					<ArticleCardVideo
						videoUrl='https://www.youtube.com/watch?v=Njyo-ovCB-g'
						href='#'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-06-02T06:20:00-07:00'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in Videos &amp; Webinars</UnderlineBarLink>
				</p>

			</section>



		
			{/* featured article */}

			{/* <section className="mt-lg">
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
			</section>


			<section className="mt-lg">
				<h2 className="h fs-1 serif c-primary">Editor&apos; s Choice</h2>
				<ArticleCardLandscape href='/post' />
				<ArticleCardLandscape href='/post' />
				<ArticleCardLandscape href='/post' />
			</section> */}
			
			
			<section className="mt-lg">
				<h2 className="h fs-1 serif c-primary">News and Insights</h2>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in News and Insights</UnderlineBarLink>
				</p>

			</section>
			
			
			<section className="mt-lg">
				<h2 className="h fs-1 serif c-primary">Crypto Technical Analysis</h2>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in Crypto Technical Analysis</UnderlineBarLink>
				</p>
			</section>


			<CtaCallout 
				heroSrc={'/assets/img/iphone.png' }
				backgroundSrc={''}
			>
				<div>
					<div className='formatted'>
						<p className='h fs-0 serif lh-1'>Praesent congue lorem non dolor?</p>
						<p className="fw-600 mt-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste distinctio quis vero qui veniam corrupti autem tenetur, esse repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?</p>
					</div>

					<p className='mt-md'><Button href='#' inverse>Call to action!</Button></p>
				</div>

				<div>
					<Button href='#' outline inverse><AppStoreIcon />App Store</Button> 
					<Button href='#' outline inverse><PlayStoreIcon />Google Play</Button>
				</div>
			</CtaCallout>


			<section className="mt-lg">
				<h2 className="h fs-1 serif c-primary">Explainers</h2>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in Explainers</UnderlineBarLink>
				</p>
			</section>
			
			
			
			<section className="mt-lg">
				<h2 className="h fs-1 serif c-primary">Videos and Webinars</h2>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in Videos and Webinars</UnderlineBarLink>
				</p>
			</section>
			
			
			
			<section className="mt-lg mb-md">
				<h2 className="h fs-1 serif c-primary">Press Room</h2>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='2022-02-09T04:07:42-08:00'
					/>
					<ArticleCard
						href='/post'
						image='https://picsum.photos/1920/1080'
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						date='2022-02-09T04:07:42-08:00'
					/>
				</div>

				<p className='fs-6 fw-500 mt-sm'>
					<UnderlineBarLink href="/category">See all in Press Room</UnderlineBarLink>
				</p>
			</section>

		</>
	)
}
