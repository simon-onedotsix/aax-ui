import PropTypes from 'prop-types'

import CSS from './article-meta.module.css'

import AuthorIcon from './img/icon-author.svg'
import CalendarIcon from './img/icon-calendar.svg'

export const ArticleMeta = ({ author, date }) => {
    return (
        <p className='fw-400 fs-sm'>
            <span className={CSS.desktopOnly}><AuthorIcon className={CSS.icon}/>{ author } &ensp;</span>
            <CalendarIcon className={CSS.icon}/>{ date }
        </p>
    )
}

ArticleMeta.propTypes = {
    author: PropTypes.string,
    date: PropTypes.string
}

ArticleMeta.defaultProps = {
    author: 'Forename Surname',
    date: 'Feb 12, 2022'
}