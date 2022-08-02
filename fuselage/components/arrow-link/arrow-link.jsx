import Link from 'next/link'

import CSS from './arrow-link.module.css'

export const ArrowLink = ({ href, children, direction, decal }) => {

    return (
        <Link href={href}><a className={`${CSS.arrowLink} ${direction === 'right' ? CSS.right : CSS.left} ${decal}`}>{ children }</a></Link>
    )
}