import { gql } from "@apollo/client"
import craftApolloClient from "../api/apollo"

import { handleTags } from "../../lib/handle-tags"

export default function TagsPage ({ tags }) {

    // console.log('tags:', tags)

    return (
        <>
            <h1 className="h fs-1 serif c-primary pb-sm">Tags</h1>

            {handleTags(tags)}
        </>
    )
}



export async function getStaticProps({ preview, previewData }) {

    const tagData = await craftApolloClient().query({
        query: gql`
            query Tags {
                tags {
                    id
                    slug
                    title
                }
            }
        `
    })

    const tags = await tagData

    return { 
		props: { tags: tags.data.tags }
	}
}