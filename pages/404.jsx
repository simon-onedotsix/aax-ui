import {useTranslations} from 'next-intl'

export default function FourZeroFour () {

    const t = useTranslations('Global')

    return (
        <>
            <h1 className='fs-0 serif lh-2 c-medium maxw-55'>404</h1>
            <p className='fw-400'>{t("Generic 404")}</p>
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