import { useState } from 'react'
import Link from 'next/link'

import { VideoPlayer } from '../video-player/video-player'
import { VideoMeta } from '../video-meta/video-meta'
import { ArticleCategories } from '../article-categories/article-categories'
import { ArticleMeta } from '../article-meta/article-meta'

import CSS from './feature-video-card.module.css'

export const FeatureVideo = ({ href, videoUrl, autoplay, muted, controls, eyebrow, title, excerpt, categories, author, date }) => {

    const [ videoDuration, setVideoDuration ] = useState('00:00')

    function handleChange(newValue) {
        setVideoDuration(newValue);
    }

    return (
        <section>

            { eyebrow ? <p className="h fs-1 serif c-primary">{ eyebrow }</p> : null }

            <h3>
                <Link href={ href }>
                    <a className={`${CSS.title} h fs-0 serif lh-2 maxw-55 pb-xs`}>{ title }</a>
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
                        <div className={CSS.meta}>
                            <ArticleCategories categories={ categories } />
                            { videoDuration != '00:00' && <VideoMeta duration={`${videoDuration} min`} /> }
                                
                        </div>
                        <p className='my-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem quod nihil ad, quisquam expedita commodi a enim? Libero hic sint aliquam sunt fuga cum rerum, voluptatem amet temporibus. Vitae, dolores?</p>
                    </div>
                    <ArticleMeta author={ author } date={ date }/>
                </div>

            </div>
 

        </section>
    )
}
