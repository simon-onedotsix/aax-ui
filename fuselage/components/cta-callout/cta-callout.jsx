import Image from "next/image"

import CSS from "./cta-callout.module.css"

export const CtaCallout = ({ heroSrc, backgroundSrc, backgroundOpacity, children }) => {

    console.log('children', children)

    return (
        <section className={`${CSS.container} mt-lg bg-dark p-md c-white`}>

            {
                backgroundSrc ? 
                <div className={CSS.backgroundContainer} style={{ opacity: backgroundOpacity }}>
                    <Image className={CSS.backgroundImage} src={backgroundSrc} layout='fill' alt="" />
                </div> :
                null
            }

            <div className={ heroSrc ? CSS.layout : ''}>
                <section className={CSS.content}>
                    { children.length > 1 ? children[0] : children }
                </section>

                <section className={CSS.hero}>
                    <Image src={heroSrc} width={257} height={532} alt="" />
                    {
                        children.length > 1 ?
                        <div className={`${CSS.secondaryActions} center`}>
                            { children[1] }
                        </div> :
                        null
                    }
                </section>
            </div>

        </section>
    )
}