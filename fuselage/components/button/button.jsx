import Link from 'next/link'
import PropTypes from 'prop-types'

import CSS from './button.module.css'
import AppleIcon from './img/icon-app-store.svg'
import GoogleIcon from './img/icon-google-play.svg'

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


export const AppStoreIcon = ({ color }) => <i className={CSS.icon}><AppleIcon style={{ fill: color }} /></i>

export const PlayStoreIcon = ({ color }) => <i className={CSS.icon}><GoogleIcon style={{ fill: color }} /></i>