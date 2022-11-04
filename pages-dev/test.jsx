import { useEffect } from 'react'

import {useTranslations} from 'next-intl'

export default function TestPage () {

    const t = useTranslations('Global')


    return (
        <>
            <p>test page</p>
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