import Link from 'next/link'
import PropTypes from 'prop-types'

import { ArticleCategories } from '../article-categories/article-categories'
import { ArticleMeta } from '../article-meta/article-meta'

import CSS from './article-card-landscape.module.css'

export const ArticleCardLandscape = ({ href, image, title, excerpt, author, date, categories }) => {
    return (
        <article className={CSS.layout}>
            <Link href={href}>
                <a><img className='image w-100pc' src={image} alt="" /></a>
            </Link>

            <div className={CSS.content}>

                <div className='formatted'>
                    <p className='h fs-3 fw-600'>{ title }</p>
                    <p>{ excerpt }</p>
                </div>
                
                <div className="flex jc-between mt-xs">
                    <ArticleCategories categories={ categories } />
                    <ArticleMeta author={author} date={date}/>
                </div>
            </div>
        </article>
    )
}

ArticleCardLandscape.PropTypes = {
    href: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    date: PropTypes.object,
}

ArticleCardLandscape.defaultProps = {
    href: "#",
    image: "https://picsum.photos/1920/1080",
    title: "AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA",
    excerpt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius.",
    author: "AAX",
    date: "Mar 23, 2022",
    categories: [{title: 'Features'}, {title: 'Markets'}]
}