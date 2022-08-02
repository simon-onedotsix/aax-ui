import Link from 'next/link'
import Image from 'next/image'

import { Truncate } from '../../../lib/truncate'
import { ArticleCategories } from '../article-categories/article-categories'
import { ArticleMeta } from '../article-meta/article-meta'

import CSS from './article-card-landscape.module.css'

export const ArticleCardLandscape = ({ href, image, title, excerpt, author, date, categories }) => {

    return (
        <article className={CSS.layout}>
            <Link href={href}>
                <a><Image className='image w-100pc' src={image} width={1920} height={1080} alt="" /></a>
            </Link>

            <div className={CSS.content}>

                <div>
                    <ArticleCategories categories={ categories } />
                    <h3 className='h fs-3 lh-4 fw-600 my-xs'>
                        <Link href={href}><a className={CSS.link}>{ title }</a></Link>
                    </h3>
                    { excerpt ? <p className='formatted'>{Truncate(excerpt, 35)}</p> : null }
                </div>
                
                <div className="flex jc-between mt-xs">
                    <ArticleMeta author={author} date={date}/>
                </div>
            </div>
        </article>
    )
}