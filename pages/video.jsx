import ReactPlayer from "react-player/youtube"

import { FeatureVideo } from "../fuselage/components/feature-video-card/feature-video-card"
import { VideoArticleCard } from "../fuselage/components/video-article-card/video-article-card"

export default function Video ({ data }) {

    console.log('youttube data:', data)

    return (
        <>
            <FeatureVideo 
                href='#'
                title='Libero hic sint aliquam sunt fuga cum rerum'
                videoUrl='https://www.youtube.com/watch?v=e6aogh5OFJ8'
                autoplay={true}
                muted={true}
                controls={true}
            />


            <section className="mt-md columns-3 gap-sm">
                {
                    data.items.map(({ id, snippet = {} }) => {
                        const { title, thumbnails = {}, resourceId = {} } = snippet;
                        const { medium } = thumbnails;
                        return (
                            <VideoArticleCard
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