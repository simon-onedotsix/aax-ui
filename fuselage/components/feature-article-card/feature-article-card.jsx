import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'

import { ArticleCategories } from '../article-categories/article-categories'
import { ArticleMeta } from '../article-meta/article-meta'
import { Button } from '../button/button'

import CSS from './feature-article-card.module.css'

export const FeatureArticle = ({ href, eyebrow, heroUrl, title, excerpt, categories, author, date, ctaLabel }) => {
    return (
        <section>
            { eyebrow ? <p className="h fs-1 serif c-primary">{ eyebrow }</p> : null }

            <h3>
                <Link href={ href }>
                    <a className={`${CSS.title} h fs-0 serif lh-2 maxw-55 pb-xs`}>{ title }</a>
                </Link>
            </h3>

            <div className={CSS.layout}>
             
                    <FeatureArticleHero heroUrl={heroUrl} />
               

                <div className={CSS.content}>
                    <div className="flex jc-between">
                        <ArticleCategories categories={ categories } />
                        
                    </div>

                    <p className='my-sm'>{ excerpt }</p>

                    <ArticleMeta author={ author } date={ date }/>
                    
                    {/* <p className='mt-sm'><Button href={ href } outline>{ ctaLabel }</Button></p> */}
                </div>
            </div>
            
        </section>
    )
}

FeatureArticle.propTypes = {
    href: PropTypes.string, 
    eyebrow: PropTypes.string, 
    heroUrl: PropTypes.string, 
    title: PropTypes.string, 
    excerpt: PropTypes.string, 
    ctaLabel: PropTypes.string,
    categories: PropTypes.array,
    author: PropTypes.string,
    date: PropTypes.string,
}

FeatureArticle.defaultProps = {
    href: '#', 
    eyebrow: 'Feature Article', 
    heroUrl: 'https://picsum.photos/1920/1080', 
    title: 'Title', 
    excerpt: 'Excerpt', 
    ctaLabel: 'Read more',
    categories: [{title: 'Features'}, {title: 'Markets'}],
    author: 'Forename Surname',
    date: 'Feb 12, 2022'
}


export const FeatureArticleHero = ({ heroUrl }) => {
    return (
        <div className={CSS.hero}>
            <Image className='w-100pc' width={1920} height={1080} src={ heroUrl } alt="" />
        </div>
    )
}