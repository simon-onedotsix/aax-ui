import { useState } from 'react'
import { format } from 'date-fns'

import { VideoPlayer } from "../video-player/video-player"

import CSS from './cta-video.module.css'

export const CtaVideo = ({ videoUrl, autoplay, muted, controls, date, heading, body }) => {

    const [ videoDuration, setVideoDuration ] = useState('00:00')

    function handleChange(newValue) {
        setVideoDuration(newValue);
    }

    return (
        <section className={`${CSS.container} bg-dark p-md c-white`}>
            <div className="mb-sm flex jc-between fw-600 c-medium">
                <p>{ format(new Date(date), 'MMM dd | h.mm aaa') }</p>
                { new Date(date).getTime() <= Date.now() ? <p className={CSS.live}>LIVE NOW</p> : null }
            </div>

            <p className='h fs-0 serif lh-1'>{ heading }</p>

            <div className="my-sm">
                <VideoPlayer 
                    videoUrl={videoUrl} 
                    autoplay={autoplay}
                    muted={muted}
                    controls={controls}
                    handleChange={handleChange}
                />
            </div>
           
            <p className="fw-600">{ body }</p>
        </section>
    )
}