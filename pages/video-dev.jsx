import ReactPlayer from "react-player/youtube"
import { FeatureVideo } from "../fuselage/components/feature-video-card/feature-video-card"

export default function Video ({ data }) {

    console.log('youttube data:', data)

    return (
        <>
            <FeatureVideo 
                href='https://www.youtube.com/watch?v=e6aogh5OFJ8'
                title='Video article hero card'
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
            <section className="columns-2 gap-md">
                {
                    data.items.map(({ id, snippet = {} }) => {
                        const { title, thumbnails = {}, resourceId = {} } = snippet;
                        const { medium } = thumbnails;
                        return (
                            <div className="react-player-wrapper" key={id} style={{ position: `relative`, paddingTop: `56.25%` }}>
                                <ReactPlayer
                                    className='react-player'
                                    url={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                                    width='100%'
                                    height='100%'
                                    controls={true}
                                    style={{ position: `absolute`, top: 0, left: 0 }}
                                    onDuration={(duration) => console.log(duration)}
                                />
                                <h3>{ title }</h3>
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}


const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function getServerSideProps() {

    const playlistRes = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&part=contentDetails&maxResults=50&playlistId=PLIqMw1vG1TWYUO1j3wcby17eKoyPFl3gs&key=${process.env.YOUTUBE_API_KEY}`)
    const data = await playlistRes.json()

    return {
        props: { data }
    }
}