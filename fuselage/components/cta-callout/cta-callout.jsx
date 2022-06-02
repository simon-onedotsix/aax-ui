import { Button } from "../button/button"

import CSS from "./cta-callout.module.css"

export const CtaCallout = () => {
    return (
        <section className={`${CSS.container} mt-lg bg-dark p-md c-white formatted`}>

            <div className={CSS.backgroundContainer}>
                <img className={CSS.backgroundImage} src="https://picsum.photos/1000/600" alt="" />
            </div>

            <div className={CSS.layout}>
                <div className={CSS.content}>
                    <p className='h fs-1 serif c-primary'>Callout</p>
                    <p className='h fs-0 serif lh-1'>Praesent congue lorem non dolor?</p>
                    <p className="fw-600 mt-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste distinctio quis vero qui veniam corrupti autem tenetur, esse repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?</p>
                    <p className='mt-md'><Button href='#' inverse>Call to action!</Button></p>
                </div>

                <div className={CSS.hero}>
                    <img src="https://picsum.photos/800/1200" alt="" />
                </div>
            </div>

        </section>
    )
}