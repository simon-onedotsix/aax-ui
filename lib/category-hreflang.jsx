export const handleHrefLangLinks = ( router ) => {
        
    if ( !router ) return

    // console.log('current locales: ', router.locales)
    // console.log('current locale: ', router.locale)

    return (
        <>
            <link href={`https://trends.aax.com${router.locale !== 'en' ? `/${router.locale}` : ''}${router.asPath}`} rel="canonical"/>
            <link href="https://trends.aax.com" rel="home"/>
            <link href={`https://trends.aax.com${router.asPath}`} rel="alternate" hrefLang="x-default"/>

            {
                router.locales.map( locale => {
                    return <link key={locale} href={`https://trends.aax.com${locale !== 'en' ? `/${locale}` : ''}${router.asPath}`} rel="alternate" hrefLang={locale}/>
                })
            }
        </>
    )
}