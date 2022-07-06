import {useTranslations} from 'next-intl'

export default function FourZeroFour () {

    const t = useTranslations('Global')

    return (
        <>
            <p>{t("Article 404")}</p>
        </>
    )
}

export async function getStaticProps({locale}) {

    // fix for not being able to query cms for language (convert indonesian)
    let siteHandle
    locale === 'id' ? siteHandle = 'in' : siteHandle = locale

    return {
        props: {
            messages: (await import(`../translations/${locale}.json`)).default
        }
    }
}