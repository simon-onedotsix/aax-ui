import { useState } from 'react'

import Link from 'next/link'

import { Truncate } from '../../../lib/truncate'
import { VideoPlayer } from '../video-player/video-player'
import { ArticleCategories } from '../article-categories/article-categories'
import { VideoMeta } from '../video-meta/video-meta'
import { ArticleMeta } from '../article-meta/article-meta'

import CSS from './article-card-video-landscape.module.css'

export const ArticleCardVideoLandscape = ({ href, videoUrl, autoplay, muted, controls, title, excerpt, author, date, categories }) => {

    const [ videoDuration, setVideoDuration ] = useState('00:00')

    function handleChange(newValue) {
        setVideoDuration(newValue);
    }

    return (
        <article className={CSS.layout}>
            <VideoPlayer 
                videoUrl={videoUrl}
                autoplay={autoplay}
                muted={muted}
                controls={controls}
                handleChange={handleChange}
            />

            <div className={CSS.content}>
                <div>
                    <ArticleCategories categories={ categories } />
                    <h3 className='h fs-4 fw-600 lh-4 my-xs'>
                        <Link href={href}><a className={CSS.link}>{ title }</a></Link>
                    </h3>
                    
                    { excerpt ? <p className='formatted pb-xs'>{Truncate(excerpt, 35)}</p> : null }
                </div>
                
                <div className='flex gap-xs'>
                    <ArticleMeta author={author} date={date}/>
                    { videoDuration != '00:00' && <VideoMeta duration={videoDuration} /> }    
                </div>
                
            </div>
        </article>
    )
}