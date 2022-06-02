import PropTypes from 'prop-types'
import ReactPlayer from "react-player/youtube"

import CSS from './video-player.module.css'

export const VideoPlayer = ({ videoUrl, controls, muted, autoplay }) => {

    const convertDuration = ( totalSeconds ) => {

        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
    
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0')
        }
    
        const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`

        console.log(result)
    }


    return (
        <div className={CSS.container}>
            <ReactPlayer
                url={videoUrl}
                width='100%'
                height='100%'
                controls={controls}
                muted={muted}
                playing={autoplay}
                onDuration={(duration) => convertDuration(duration)}
            />
        </div>
    )
}

VideoPlayer.propTypes = {
    videoUrl: PropTypes.string.isRequired,
    controls: PropTypes.bool,
    muted: PropTypes.bool,
    autoplay: PropTypes.bool
}

VideoPlayer.defaultProps = {
    videoUrl: 'https://www.youtube.com/watch?v=e6aogh5OFJ8',
    controls: true,
    muted: false,
    autoplay: false
}