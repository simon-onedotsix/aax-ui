import { Button } from '../button/button'


import CSS from './cta-banner.module.css'

export const CtaBanner = () => {
    return (
        <section className={CSS.layout}>
            <p className=' fs-2 serif'>Are you a journalist or an editor?</p>
            <p><Button href='#' inverse>Call to action!</Button></p>
        </section>
    )
}
