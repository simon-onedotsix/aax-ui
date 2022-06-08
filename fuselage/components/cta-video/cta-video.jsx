import { VideoPlayer } from "../video-player/video-player"

import CSS from './cta-video.module.css'

export const CtaVideo = ({ videoUrl, autoplay, muted, controls }) => {
    return (
        <section className={`${CSS.container} mt-lg bg-dark p-md c-white`}>
            <div className="mb-sm flex jc-between fw-600 c-medium">
                <p>Apr 27 | 9am HKT</p>
                <p>LIVE NOW</p>
            </div>

            <p className='h fs-0 serif lh-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>

            <div className="my-sm">
                <VideoPlayer 
                    videoUrl={videoUrl} 
                    autoplay={autoplay}
                    muted={muted}
                    controls={controls}
                />
            </div>
           
            <p className="fw-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste distinctio quis vero qui veniam corrupti autem tenetur, esse repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?</p>
        </section>
    )
}