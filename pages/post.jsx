import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../fuselage/components/button/button'
import { UnderlineLink } from '../fuselage/components/u-link/u-link'

import { ArticleCardLandscape } from '../fuselage/components/article-card-landscape/article-card-landscape'
import { ArticleCard } from '../fuselage/components/article-card/article-card'
import { ArticleCategories } from '../fuselage/components/article-categories/article-categories'
import { ArticleMeta } from '../fuselage/components/article-meta/article-meta'

import { AuthorCredit } from '../fuselage/components/author-credit/author-credit'

export default function Home() {

	return (
		<>
			<Head>
				<title>AAX</title>
				<meta name="description" content="AAX blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

		
			{/* main article */}

			<section>
				<img className='w-100pc mb-xs' src="https://picsum.photos/1920/1080" alt="" />

				<div className="flex jc-between">
					<ArticleCategories categories={[{title: 'Features'}, {title: 'Markets'}]} />
					<ArticleMeta author='Forename Surname' date='Nov 12, 2021'/>
				</div>

				<p className='h fs-0 serif lh-1 maxw-55 mt-xs'>AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA</p>
				<p className='fs-5 fw-500 maxw-55'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius adipisci quam reprehenderit. Nemo, vero eos!</p>
			</section>



			<section className="mt-lg">
				<p className="fw-500 caps ls-2 c-primary pb-xs">Table of contents</p>
				<ul className='tableOfContents'>
					<li><Link href='#'><a>Mauris purus. Donec est nunc</a></Link></li>
					<li><Link href='#'><a>Ornare non, aliquet non tempus vel dolor. </a></Link></li>
					<li><Link href='#'><a>Integer sapien nibh</a></Link></li>
					<li><Link href='#'><a>Egestas ut cursus sit amet</a></Link></li>
				</ul>
			</section>



			<section className="mt-lg maxw-55 formatted">
				<p className="h4 fw-600">Phasellus tincidunt, ante nec lacinia</p>
				<p>Nullam et tortor. Suspendisse tempor leo quis nunc fringilla volutpat. Donec rutrum ullamcorper lorem. Nunc tincidunt sagittis augue. Quisque lacinia. Phasellus sollicitudin.</p>
				<p>Mauris purus. Donec est nunc, ornare non, aliquet non, tempus vel, dolor. Integer sapien nibh, egestas ut, cursus sit amet, faucibus a, sapien. Vestibulum purus purus, elementum ac, luctus ullamcorper, ornare vitae, massa. Nullam posuere sem ut mauris. Nullam velit. Quisque sodales. Donec suscipit suscipit erat. Nam blandit. Praesent congue lorem non dolor. Maecenas vitae erat. Ut ac purus vel purus dapibus gravida.</p>
				<p>Nullam lorem sapien, tempus ac, fringilla at, elementum sed, purus. Duis molestie pede. Vivamus quis odio sit amet libero sodales tincidunt. Nam sit amet metus vitae lectus ullamcorper dignissim. Suspendisse leo. Praesent turpis justo, aliquet ac, accumsan vel, posuere quis, pede. Morbi pretium lacus. Cras non metus. Donec laoreet sem at elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus iaculis dolor id felis. Phasellus cursus Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aenean risus est, porttitor vel, placerat sit amet, vestibulum sit amet, nibh. Ut faucibus justo quis nisl. Etiam vulputate, sapien eu egestas rutrum, leo neque luctus dolor, sed hendrerit tortor metus ut dui. Etiam id pede porttitor turpis tristique lacinia. Suspendisse potenti. Etiam feugiat.</p>
				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cras gravida sem ut massa. Quisque accumsan porttitor dui. Sed interdum, nisl ut consequat tristique, lacus nulla porta massa, sed imperdiet sem nunc vitae eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque sit amet metus. Nullam tincidunt posuere ligula. Aenean volutpat ultrices ligula. In tincidunt. Aenean viverra suscipit tellus.</p>
				<p>Suspendisse sem lorem, ornare non, vestibulum ut, tempor porttitor, est. Quisque convallis aliquet eros. Nunc nec nulla eget urna convallis eleifend. Nulla feugiat eros at augue. Integer feugiat nisi vitae velit. Cras cursus ipsum vel dolor. Sed pulvinar. Etiam velit orci, pellentesque at, porttitor blandit, luctus eu, justo. Donec in odio sed nisl venenatis feugiat. Phasellus sodales, pede dapibus rhoncus dignissim, justo turpis ornare felis, in imperdiet pede metus quis tellus. Proin imperdiet, quam a gravida pulvinar, est sem faucibus felis, sit amet consequat pede turpis id ante. In facilisis sodales arcu.</p>
				<p className="h4 fw-600">Phasellus tincidunt, ante nec lacinia</p>
				<p>Nullam et tortor. Suspendisse tempor leo quis nunc fringilla volutpat. Donec rutrum ullamcorper lorem. Nunc tincidunt sagittis augue. Quisque lacinia. Phasellus sollicitudin.</p>
				<p>Mauris purus. Donec est nunc, ornare non, aliquet non, tempus vel, dolor. Integer sapien nibh, egestas ut, cursus sit amet, faucibus a, sapien. Vestibulum purus purus, elementum ac, luctus ullamcorper, ornare vitae, massa. Nullam posuere sem ut mauris. Nullam velit. Quisque sodales. Donec suscipit suscipit erat. Nam blandit. Praesent congue lorem non dolor. Maecenas vitae erat. Ut ac purus vel purus dapibus gravida.</p>
				<p>Nullam lorem sapien, tempus ac, fringilla at, elementum sed, purus. Duis molestie pede. Vivamus quis odio sit amet libero sodales tincidunt. Nam sit amet metus vitae lectus ullamcorper dignissim. Suspendisse leo. Praesent turpis justo, aliquet ac, accumsan vel, posuere quis, pede. Morbi pretium lacus. Cras non metus. Donec laoreet sem at elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus iaculis dolor id felis. Phasellus cursus Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aenean risus est, porttitor vel, placerat sit amet, vestibulum sit amet, nibh. Ut faucibus justo quis nisl. Etiam vulputate, sapien eu egestas rutrum, leo neque luctus dolor, sed hendrerit tortor metus ut dui. Etiam id pede porttitor turpis tristique lacinia. Suspendisse potenti. Etiam feugiat.</p>
				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cras gravida sem ut massa. Quisque accumsan porttitor dui. Sed interdum, nisl ut consequat tristique, lacus nulla porta massa, sed imperdiet sem nunc vitae eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque sit amet metus. Nullam tincidunt posuere ligula. Aenean volutpat ultrices ligula. In tincidunt. Aenean viverra suscipit tellus.</p>
			</section>



			<AuthorCredit></AuthorCredit>





			{/* next article */}

			<section className='mt-lg pt-md bt-1 bc-primary'>
				<p className="h fs-1 serif c-primary">Next Article</p>

				<img className='w-100pc mb-xs' src="https://picsum.photos/1920/1080" alt="" />

				<div className="flex jc-between">
					<ArticleCategories categories={[{title: 'Features'}, {title: 'Markets'}]} />
					<ArticleMeta author='Forename Surname' date='Nov 12, 2021'/>
				</div>

				<p className='h fs-0 serif lh-1 maxw-55 mt-xs'>Phasellus cursus Class aptent taciti sociosqu ad litora</p>
				<p className='fs-5 fw-500 maxw-55'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius adipisci quam reprehenderit. Nemo, vero eos!</p>
				
				<p className='mt-sm'><Button href='#' outline>Read</Button></p>
			</section>




			{/* related */}
			
			<section className="mt-lg">
				<p className="h fs-1 serif c-primary">Related Articles</p>

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

			</section>
		




			<section className="mt-lg bg-dark px-md py-sm c-white formatted flex gap-sm jc-between">
				<p className='h fs-2 serif'>Are you a journalist or an editor?</p>
				<p><Button href='#' inverse>Call to action!</Button></p>
			</section>

		</>
	)
}
