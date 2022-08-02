import PropTypes from 'prop-types'
import { UnderlineLink } from '../u-link/u-link'

import CSS from './article-categories.module.css'

import Chevron from './img/chevron-right.svg'

export const ArticleCategories = ({ categories }) => {
    if ( categories ) {
        return (
            <p className='fw-500 fs-sm'>
                {
                    categories[0] ?
                    <UnderlineLink href={`/category/${categories[0].slug}`}>{ categories[0].title }</UnderlineLink> 
                    : null
                }
                {
                    categories[1] ?
                    <>
                        <Chevron className={CSS.icon}/> <UnderlineLink href={`/category/${categories[1].slug}`}>{ categories[1].title }</UnderlineLink>
                    </>
                    : null
    
                }
                
            </p>
        )
    }
    return null
}

ArticleCategories.propTypes = {
    categories: PropTypes.array,
}