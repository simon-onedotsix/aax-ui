import Link from "next/link"

import CSS from './tag-link.module.css'

export const TagLink = ({ children, href }) => {
    return (
        <Link href={ href }><a className={ CSS.tagLink }>{ children }</a></Link>
    )
}