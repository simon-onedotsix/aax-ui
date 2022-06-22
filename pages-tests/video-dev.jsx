import ReactPlayer from "react-player/youtube"

import { FeatureVideo } from "../fuselage/components/feature-video-card/feature-video-card"
import { ArticleCardVideo } from "../fuselage/components/article-card-video/article-card-video"

export default function Video ({ data }) {

    console.log('youttube data:', data)

    return (
        <>
            <FeatureVideo 
                href='https://www.youtube.com/watch?v=e6aogh5OFJ8'
                title='Video article hero card'
                date='2022-06-02T06:20:00-07:00'
            />

            <p className="h3 pb-sm mt-md">Video CTA</p>
            <div className="react-player-wrapper" style={{ position: `relative`, paddingTop: `56.25%` }}>
                <ReactPlayer
                    className='react-player'
                    url={`https://www.youtube.com/watch?v=e6aogh5OFJ8`}
                    width='100%'
                    height='100%'
                    controls={true}
                    muted={true}
                    playing={true}
                    style={{ position: `absolute`, top: 0, left: 0 }}
                />
            </div>

            <p className="h3 pb-sm mt-md">Videos</p>
            <section className="mt-md columns-3 gap-sm">
                {
                    data.items.map(({ id, snippet = {} }) => {
                        const { title, thumbnails = {}, resourceId = {} } = snippet;
                        const { medium } = thumbnails;
                        return (
                            <ArticleCardVideo
                                key={resourceId.videoId}
                                videoUrl={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                            />
                        )
                    })
                }
            </section>
        </>
    )
}


const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
const YOUTUBE_PLAYLIST_ID = 'PLQIsOByLi532mHCLf1MJU5S23KvGOnVoj'

export async function getServerSideProps() {

    const playlistRes = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&part=contentDetails&maxResults=50&playlistId=${YOUTUBE_PLAYLIST_ID}&key=${process.env.YOUTUBE_API_KEY}`)
    const data = await playlistRes.json()

    return {
        props: { data }
    }
}