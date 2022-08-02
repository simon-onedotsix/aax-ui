import Link from 'next/link'
import Image from 'next/image'

import { Truncate } from '../../../lib/truncate'
import { ArticleCategories } from '../article-categories/article-categories'
import { ArticleMeta } from '../article-meta/article-meta'
import { Button } from '../button/button'

import CSS from './feature-article-card.module.css'

export const FeatureArticle = ({ href, eyebrow, heroUrl, alt, title, excerpt, categories, author, date, ctaLabel }) => {
    return (
        <section>
            { eyebrow ? <p className="h fs-1 serif c-primary">{ eyebrow }</p> : null }

            <h3>
                <Link href={ href }>
                    <a className={`${CSS.title} h fs-0 serif lh-2 maxw-55 pb-sm`}>{ title }</a>
                </Link>
            </h3>

            <div className={CSS.layout}>
             
                <Link href={ href }>
                    <a className={CSS.imgLink}>
                        <FeatureArticleHero heroUrl={heroUrl} alt={alt} />
                    </a>
                </Link>

                <div className={CSS.content}>
                    <div>
                        <ArticleCategories categories={ categories } />
                        { excerpt ? <p className='my-sm'>{Truncate(excerpt, 45)}</p> : null }
                    </div>

                    <ArticleMeta author={ author } date={ date }/>
                    {/* <p className='mt-sm'><Button href={ href } outline>{ ctaLabel }</Button></p> */}
                </div>
            </div>
            
        </section>
    )
}



export const FeatureArticleHero = ({ heroUrl, alt }) => {
    return (
        <div className={CSS.hero}>
            <Image className='w-100pc' width={1920} height={1080} src={ heroUrl } alt={alt} />
        </div>
    )
}