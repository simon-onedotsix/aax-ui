import { TagLink } from "../fuselage/components/tag-link/tag-link"

export const handleTags = (tags) => {
    if ( tags.length ) {
        return (
            <section>
                <p className='fw-600 mt-md'>Tags</p>

                <p className='mt-xs maxw-100pc' style={{ width: `100%`, overflow: `hidden`}}>
                    {
                        tags.map( tag => <TagLink key={tag.id} href={`/tags/${tag.slug}`}>{ tag.title }</TagLink> )
                    }
                </p>
            </section>
        )
    }
}