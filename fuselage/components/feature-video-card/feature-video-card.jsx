import { useState } from 'react'
import Link from 'next/link'

import { Truncate } from '../../../lib/truncate'
import { VideoPlayer } from '../video-player/video-player'
import { VideoMeta } from '../video-meta/video-meta'
import { ArticleCategories } from '../article-categories/article-categories'
import { ArticleMeta } from '../article-meta/article-meta'

import CSS from './feature-video-card.module.css'

export const FeatureVideo = ({ href, videoUrl, autoplay, muted, controls, eyebrow, title, excerpt, categories, author, date }) => {

    const [ videoDuration, setVideoDuration ] = useState('00:00')

    function handleChange(newValue) {
        setVideoDuration(newValue)
    }

    return (
        <section>

            { eyebrow ? <p className="h fs-1 serif c-primary">{ eyebrow }</p> : null }

            <h3>
                <Link href={ href }>
                    <a className={`${CSS.title} h fs-0 serif lh-2 maxw-55 pb-sm`}>{ title }</a>
                </Link>
            </h3>

            <div className={CSS.layout}>
                
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
                        
                        { excerpt ? <p className='my-sm'>{Truncate(excerpt, 45)}</p> : null }
                    </div>

                    <div className='flex flex-wrap gap-xs'>
                        <ArticleMeta author={ author } date={ date }/> 
                        { videoDuration != '00:00' && <VideoMeta duration={videoDuration} /> }
                    </div>
                </div>

            </div>
 

        </section>
    )
}
