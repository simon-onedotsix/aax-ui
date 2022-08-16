import {useTranslations} from 'next-intl'

export default function FiveHundred () {

    const t = useTranslations('Global')

    return (
        <>
            <h1 className='h fs-0 serif lh-2 maxw-55 pb-sm'>404</h1>
            <p className='fw-400'>{t("Generic 404")}</p>
            {/* <p>{t("Article 404")}</p> */}
        </>
    )
}

export async function getStaticProps({locale}) {

    return {
        props: {
            messages: (await import(`../translations/${locale}.json`)).default
        }
    }
}