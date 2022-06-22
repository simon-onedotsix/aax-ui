import { format } from 'date-fns'

import CSS from './article-meta.module.css'

import AuthorIcon from './img/icon-author.svg'
import CalendarIcon from './img/icon-calendar.svg'

export const ArticleMeta = ({ author, date }) => {

    const handleDate = () => {
        if ( date )
        return (
            <><CalendarIcon className={CSS.icon}/>{ format(new Date(date), 'dd MMM yyyy') }</>
        )
    }

    return (
        <p className='fw-400 fs-sm'>
            {
                author && author.title ?
                <span className={CSS.desktopOnly}><AuthorIcon className={CSS.icon}/>{ author.title } &ensp;</span>
                : null
            }
            

            { handleDate() }
        </p>
    )
}