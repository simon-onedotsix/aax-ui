import Link from 'next/link'

import CSS from './u-link.module.css'

export const UnderlineLink = ({ href, children, target }) => {
    return (
        <Link href={href} >
            <a className={CSS.uLink} target={ target ? '_blank"' : null }>{ children }</a>
        </Link>
    )
}