import ReactPlayer from "react-player/youtube"

import { FeatureVideo } from "../fuselage/components/feature-video-card/feature-video-card"
import { ArticleCardVideo } from "../fuselage/components/article-card-video/article-card-video"
import { UnderlineBarLink } from "../fuselage/components/u-bar-link/u-bar-link"
import { CtaVideo } from "../fuselage/components/cta-video/cta-video"

export default function Video ({ data }) {

    console.log('youttube data:', data)

    return (
        <>
            <FeatureVideo 
                href='#'
                title='Libero hic sint aliquam sunt fuga cum rerum'
                videoUrl='https://www.youtube.com/watch?v=0NrnwW8Vz2I'
                autoplay={false}
                muted={true}
                controls={true}
                date='2022-06-02T06:20:00-07:00'
            />


            <section className="mt-md">
                <div className="columns-3 gap-sm mt-sm">
                    <ArticleCardVideo
                        videoUrl='https://www.youtube.com/watch?v=0NrnwW8Vz2I'
                    />
                    <ArticleCardVideo
                        videoUrl='https://www.youtube.com/watch?v=Zz72RG9hUYA'
                    />
                    <ArticleCardVideo
                        videoUrl='https://www.youtube.com/watch?v=Njyo-ovCB-g'
                    />
                </div>

                <p className='fs-6 fw-500 mt-sm'>
                    <UnderlineBarLink href="/category">See all in Videos &amp; Webinars</UnderlineBarLink>
                </p>
            </section>


            <CtaVideo
                videoUrl={'https://www.youtube.com/watch?v=XPShVfS1RWw'} 
                autoplay={true}
                muted={false}
                controls={true}
            />           
            
            
            <section className="mt-lg">
                <h2 className="h fs-3 c-primary">Recommended for you</h2>

                <div className="columns-3 gap-sm mt-sm">
                    <ArticleCardVideo
                        videoUrl='https://www.youtube.com/watch?v=0NrnwW8Vz2I'
                    />
                    <ArticleCardVideo
                        videoUrl='https://www.youtube.com/watch?v=Zz72RG9hUYA'
                    />
                    <ArticleCardVideo
                        videoUrl='https://www.youtube.com/watch?v=Njyo-ovCB-g'
                    />
                </div>
            </section>
            
            
            <section className="mt-lg">
                <h2 className="h fs-3 c-primary">What Others are Watching</h2>

                <div className="columns-3 gap-sm mt-sm">
                    <ArticleCardVideo
                        videoUrl='https://www.youtube.com/watch?v=0NrnwW8Vz2I'
                    />
                    <ArticleCardVideo
                        videoUrl='https://www.youtube.com/watch?v=Zz72RG9hUYA'
                    />
                    <ArticleCardVideo
                        videoUrl='https://www.youtube.com/watch?v=Njyo-ovCB-g'
                    />
                </div>
            </section>
        </>
    )
}