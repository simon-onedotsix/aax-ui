import Link from 'next/link'
import PropTypes from 'prop-types'

import CSS from './category-search-button.module.css'

export const CategorySearchButton = ({ href, children, decal }) => {
  return (
    <Link href={href} >
      <a className={`${CSS.button} ${decal}`}>
        {children}
      </a>
    </Link>
  )
}

CategorySearchButton.propTypes = {
  href: PropTypes.string,
}

CategorySearchButton.defaultProps = {
  decal: 'fw-600'
}


