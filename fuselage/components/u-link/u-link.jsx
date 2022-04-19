import Link from 'next/link'
import CSS from './u-link.module.css'

export const UnderlineLink = ({ href, children }) => {
    return (
        <Link href={href}><a className={CSS.uLink}>{ children }</a></Link>
    )
}