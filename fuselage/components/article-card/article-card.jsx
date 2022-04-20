import Link from 'next/link'
import PropTypes from 'prop-types'

import { ArticleCategories } from '../article-categories/article-categories'
import { ArticleMeta } from '../article-meta/article-meta'

import CSS from './article-card.module.css'

export const ArticleCard = ({ href, image, title, excerpt, author, date, categories }) => {
    return (
        <article className='formatted'>
            <Link href={href}>
                <a><img className='w-100pc mb-xs' src={image} alt="" /></a>
            </Link>

            <ArticleCategories categories={ categories } />

            <p className='h fs-4 fw-600'>
                <Link href={href}><a className={CSS.link}>{ title }</a></Link>
            </p>
            
            <p>{ excerpt }</p>
            
            <ArticleMeta author={author} date={date}/>
        </article>
    )
}

ArticleCard.PropTypes = {
    href: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    date: PropTypes.object,
}

ArticleCard.defaultProps = {
    href: "#",
    image: "https://picsum.photos/1920/1080",
    title: "AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA",
    excerpt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius.",
    author: "AAX",
    date: "Mar 23, 2022",
    categories: [{title: 'Features'}, {title: 'Markets'}]
}