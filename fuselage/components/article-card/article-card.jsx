import Link from 'next/link'
import Image from 'next/image'

import { truncate } from '../../../lib/truncate'
import { ArticleCategories } from '../article-categories/article-categories'
import { ArticleMeta } from '../article-meta/article-meta'

import CSS from './article-card.module.css'

export const ArticleCard = ({ href, image, title, excerpt, author, date, categories }) => {
    return (
        <article>
            <div className={CSS.hero}>
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

            <div className={CSS.content}>
                <ArticleCategories categories={ categories } />

                <h3 className='h fs-4 fw-600 lh-4'>
                    <Link href={href}><a className={CSS.link}>{ title }</a></Link>
                </h3>
                
                { excerpt ? <p className='formatted py-xs'>{truncate(excerpt, 25)}</p> : null }
                
                <ArticleMeta author={author} date={date}/>
            </div>
        </article>
    )
}