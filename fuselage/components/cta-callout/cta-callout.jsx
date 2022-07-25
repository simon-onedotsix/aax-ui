import Image from "next/image"

import CSS from "./cta-callout.module.css"

export const CtaCallout = ({ heroSrc, heroWidth, heroHeight, backgroundSrc, backgroundOpacity, backgroundColor, textColor, children }) => {

    return (
        <section 
            className={`${CSS.container} mt-lg bg-dark p-md`} 
            style={{ 
                color: textColor ? textColor : `white`,
                backgroundColor: backgroundColor ? backgroundColor : `#19171c`
            }}
        >

            {
                backgroundSrc ? 
                <div className={CSS.backgroundContainer} style={{ opacity: backgroundOpacity/100 }}>
                    <Image className={CSS.backgroundImage} src={backgroundSrc} layout='fill' alt="" />
                </div> :
                null
            }

            <div className={ heroSrc ? CSS.layout : ''}>
                <section className={CSS.content}>
                    { children.length > 1 ? children[0] : children }
                </section>

                <section className={CSS.hero}>
                    <Image src={heroSrc} width={heroWidth} height={heroHeight} alt="" />
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