import Link from 'next/link'

import { ReactComponent as LogoSVG } from './img/AAX-logo.svg'

import CSS from './brand.module.css'

export default function Brand () {
    return (
        <Link href='/'>
            <a><img src='/assets/ui/AAX-trends-logo.svg' className={CSS.brand} alt="AAX Trends" /></a>
        </Link>
    )
}