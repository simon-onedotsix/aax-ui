import React from 'react'
import PropTypes from 'prop-types'

import CSS from './button-social.module.css'


export const ButtonSocial = ({ icon, href, alt, decal }) => {

    const handleIcon = () => {
        switch ( icon ) {
            case 'twitter' : return '/assets/ui/social-twitter.svg'
            break

            case 'linkedin' : return '/assets/ui/social-linkedin.svg'
            break
            
            case 'facebook' : return '/assets/ui/social-facebook.svg'
            break

            case 'instagram' : return '/assets/ui/social-instagram.svg'
            break
            
            case 'weibo' : return '/assets/ui/social-weibo.svg'
            break
            
            case 'discord' : return '/assets/ui/social-discord.svg'
            break
            
            case 'email' : return '/assets/ui/social-email.svg'
            break

            default: return '/assets/ui/social-email.svg'
        }
    }

    return (
        <a href={href} className={CSS.button} target="_blank">
            <img src={handleIcon()} className={CSS.icon} alt={alt} rel={"noopener noreferrer"}/>
        </a>
    )
    
}

ButtonSocial.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    alt: PropTypes.string
}
  
ButtonSocial.defaultProps = {
    href: '#',
    icon: 'email',
    alt: 'social button'
}