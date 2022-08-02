import PropTypes from 'prop-types'

import CSS from './video-meta.module.css'

import VideoIcon from './img/icon-video.svg'

export const VideoMeta = ({ duration }) => {
    return (
        <p className='fw-400 fs-sm'>
            <VideoIcon className={CSS.icon}/>{ duration }
        </p>
    )
}

VideoMeta.propTypes = {
    duration: PropTypes.string
}

VideoMeta.defaultProps = {
    duration: '3 mins',
}