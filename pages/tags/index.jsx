import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import {useTranslations} from 'next-intl'

import { handleTags } from "../../lib/handle-tags"

export default function TagsPage ({ tags }) {

    const t = useTranslations('Global')

    // console.log('tags:', tags)

    return (
        <>
            <h1 className="h fs-1 serif c-primary pb-sm">{t('Tags')}</h1>

            {handleTags(tags)}
        </>
    )
}



export async function getStaticProps({ locale, preview, previewData }) {

    // fix for not being able to query cms for language (convert indonesian)
    let siteHandle
    locale === 'id' ? siteHandle = 'in' : siteHandle = locale

    const tagData = await craftApolloClient().query({
        query: gql`
            query Tags {
                tags (site: "${siteHandle}") {
                    id
                    slug
                    title
                }
            }
        `
    })

    const tags = await tagData

    return { 
		props: { 
            tags: tags.data.tags,
            messages: (await import(`../../translations/${locale}.json`)).default
        }
	}
}