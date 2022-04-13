import Link from 'next/link'
import PropTypes from 'prop-types'
import CSS from './button.module.css'

export const Button = ({ href, children, target, outline, decal }) => {
  return (
    <Link href={href} >
      <a 
        className={`${CSS.button} ${outline ? CSS.outline : '' } ${decal}`}
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


