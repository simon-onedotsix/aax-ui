import { useState } from 'react'

import ReactPlayer from "react-player/youtube"

import CSS from './video-player.module.css'

export const VideoPlayer = ({ videoUrl, controls, muted, autoplay, handleChange }) => {

    const [ videoPlayerDuration, setVideoPlayerDuration ] = useState('00:00')

    const convertDuration = ( totalSeconds ) => {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0')
        }
        const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`

        // console.log(result)
        setVideoPlayerDuration(result)
        // console.log('updated')
        handleChange(result)
    }

    return (
        <>
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
        </>
    )
}