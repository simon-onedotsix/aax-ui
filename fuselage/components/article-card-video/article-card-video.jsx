import { useState } from 'react'

import Link from 'next/link'
import PropTypes from 'prop-types'

import { VideoPlayer } from '../video-player/video-player'
import { ArticleCategories } from '../article-categories/article-categories'
import { VideoMeta } from '../video-meta/video-meta'
import { ArticleMeta } from '../article-meta/article-meta'

import CSS from './article-card-video.module.css'

export const ArticleCardVideo = ({ href, videoUrl, autoplay, muted, controls, title, excerpt, author, date, categories }) => {

    const [ videoDuration, setVideoDuration ] = useState('00:00')

    function handleChange(newValue) {
        setVideoDuration(newValue);
    }

    return (
        <article>
            <VideoPlayer 
                videoUrl={videoUrl}
                autoplay={autoplay}
                muted={muted}
                controls={controls}
                handleChange={handleChange}
            />

            <div className={CSS.meta}>
                <ArticleCategories categories={ categories } />
                { videoDuration != '00:00' && <VideoMeta duration={`${videoDuration} min`} /> }    
            </div>

            <h3 className='h fs-4 fw-600 lh-4'>
                <Link href={href}><a className={CSS.link}>{ title }</a></Link>
            </h3>
            
            <p className='formatted pb-xs'>{ excerpt }</p>
            
            <ArticleMeta author={author} date={date}/>
        </article>
    )
}

ArticleCardVideo.propTypes = {
    href: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    categories: PropTypes.array,
}

ArticleCardVideo.defaultProps = {
    href: "#",
    videoUrl: "https://picsum.photos/1920/1080",
    title: "AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA",
    excerpt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius.",
    author: "AAX",
    date: "Mar 23, 2022",
    categories: [{title: 'Features'}, {title: 'Markets'}]
}