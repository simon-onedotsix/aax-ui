import Link from 'next/link'
import CSS from './u-bar-link.module.css'

export const UnderlineBarLink = ({ href, children }) => {
    return (
        <Link href={href}><a className={CSS.uLink}>{ children }</a></Link>
    )
}