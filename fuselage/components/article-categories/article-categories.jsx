import PropTypes from 'prop-types'

import CSS from './article-categories.module.css'

import Chevron from './img/chevron-right.svg'

export const ArticleCategories = ({ categories }) => {
    return (
        <p className='fw-500 fs-sm'>
            { categories[0].title } <Chevron className={CSS.icon}/> { categories[1].title }
        </p>
    )
}

ArticleCategories.propTypes = {
    categories: PropTypes.array,
}

ArticleCategories.defaultProps = {
    categories: [{title: 'Features'}, {title: 'Markets'}],
}