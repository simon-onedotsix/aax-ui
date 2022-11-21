export const handleHrefLangLinks = ( router ) => {
        
    if ( !router ) return

    // console.log('current locales: ', router.locales)
    // console.log('current locale: ', router.locale)
    // console.log('router:', router)
    // console.log('path:', `/category${router.query.category ? `/${router.query.category}` : ''}`)

    let path

    if (router.query.page) {
        path = `/category/${router.query.category}?page=${router.query.page}`
    } else {
        path = `/category${router.query.category ? `/${router.query.category}` : ''}`
    }
    
    return (
        <>
            <link href={`https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${path}`} rel="canonical"/>
            <link href="https://trends.aax.com" rel="home"/>
            <link href={`https://trends.aax.com${path}`} rel="alternate" hrefLang="x-default"/>

            {
                router.locales.map( locale => {
                    return (
                        <link 
                            key={locale} 
                            href={`https://trends.aax.com${locale !== 'en' ? `/${locale}` : ''}${path}`} 
                            rel="alternate" 
                            hrefLang={locale}
                        />
                    )
                })
            }
        </>
    )
}