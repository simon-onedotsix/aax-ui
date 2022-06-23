import Link from 'next/link'
import Image from 'next/image'

import { ArticleCategories } from '../article-categories/article-categories'
import { ArticleMeta } from '../article-meta/article-meta'

import CSS from './article-card.module.css'

export const ArticleCard = ({ href, image, title, excerpt, author, date, categories }) => {
    return (
        <article>
            <div className={CSS.container}>
                <Link href={href}>
                    <a>
                        <Image 
                            src={image}
                            width={1920}
                            height={1080}
                            alt={title}
                        />
                    </a>
                </Link>

            </div>

            <ArticleCategories categories={ categories } />

            <h3 className='h fs-4 fw-600 lh-4'>
                <Link href={href}><a className={CSS.link}>{ title }</a></Link>
            </h3>
            
            <p className='formatted pb-xs'>{ excerpt }</p>
            
            <ArticleMeta author={author} date={date}/>
        </article>
    )
}