import Head from 'next/head'

import { Button } from '../fuselage/components/button/button'

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
				<p>Author credit</p>

				<p className='h fs-0 serif lh-1 maxw-55'>AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA</p>
				<p className='fs-5 fw-500 maxw-55'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius adipisci quam reprehenderit. Nemo, vero eos!</p>
				
				<p className='mt-sm'><Button href='#' outline>Read more</Button></p>
			</section>


			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Editor's Choice</p>


			</section>
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">News and Opinion</p>

				<div className="columns-3 gap-md">
					<article className='formatted'>
						<img className='w-100pc mb-xs' src="https://picsum.photos/1920/1080" alt="" />
						<p className='fw-500'>Category crumbs</p>

						<p className='h fs-4 fw-600'>AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA</p>
						<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius.</p>
						<p className='fw-400'>Author credit</p>
					</article>


				</div>

				<p className='fw-500 mt-sm'>See all in News and Opinion</p>

			</section>
			
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Crypto Technical Analysis</p>


			</section>


			<section className="mt-lg bg-dark p-md c-white">
				<p>[ callout ]</p>
			</section>


			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Explainers</p>


			</section>

		</>
	)
}
