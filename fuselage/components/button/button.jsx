import Link from 'next/link'
import PropTypes from 'prop-types'
import CSS from './button.module.css'

export const Button = ({ href, children, target, inverse, outline, decal }) => {
  return (
    <Link href={href} >
      <a 
        className={`
          ${CSS.button} 
          ${outline ? CSS.outline : '' } 
          ${inverse ? CSS.inverse : '' } 
          ${decal}
        `}
        target={target}
      >
        {children}
      </a>
    </Link>
  )
}

Button.propTypes = {
  href: PropTypes.string,
  outline: PropTypes.bool,
  target: PropTypes.string,
  decal: PropTypes.string
}

Button.defaultProps = {
  decal: 'fw-600'
}


