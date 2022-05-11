import PropTypes from 'prop-types'
import Link from 'next/link'

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
                    <a className={`${CSS.title} h fs-0 serif lh-1 maxw-55 pb-xs`}>{ title }</a>
                </Link>
            </h3>
            
            <FeatureArticleHero heroUrl={heroUrl} />

            <div className="flex jc-between">
                <ArticleCategories categories={ categories } />
                <ArticleMeta author={ author } date={ date }/>
            </div>

            <p className='fs-5 fw-500 maxw-55 mt-sm'>{ excerpt }</p>
            
            <p className='mt-sm'><Button href={ href } outline>{ ctaLabel }</Button></p>
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
            <img className='w-100pc' src={ heroUrl } alt="" />
        </div>
    )
}