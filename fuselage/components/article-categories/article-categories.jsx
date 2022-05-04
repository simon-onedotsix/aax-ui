import PropTypes from 'prop-types'
import { UnderlineLink } from '../u-link/u-link'

import CSS from './article-categories.module.css'

import Chevron from './img/chevron-right.svg'

export const ArticleCategories = ({ categories }) => {
    return (
        <p className='fw-500 fs-sm'>
            <UnderlineLink href='#'>{ categories[0].title }</UnderlineLink> <Chevron className={CSS.icon}/> <UnderlineLink href='#'>{ categories[1].title }</UnderlineLink>
        </p>
    )
}

ArticleCategories.propTypes = {
    categories: PropTypes.array,
}

ArticleCategories.defaultProps = {
    categories: [{title: 'Features'}, {title: 'Markets'}],
}