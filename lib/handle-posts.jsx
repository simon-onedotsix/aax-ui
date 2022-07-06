import { ArticleCardLandscape } from "../fuselage/components/article-card-landscape/article-card-landscape"
import { ArticleCardVideoLandscape } from "../fuselage/components/article-card-video-landscape/article-card-video-landscape"

export const handlePosts = ( entries ) => {

    if ( !entries.length ) return
    
    return (
        <>
            {
                entries.map( entry => {
                    
                    if ( entry.heroType && entry.hero[0].video ) {
                        return (
                            <ArticleCardVideoLandscape
                                key={entry.id}
                                href={`/${entry.slug}`}
                                videoUrl={'https://www.youtube.com/watch?v=e6aogh5OFJ8'}
                                title={entry.title}
                                excerpt={entry.body}
                                date={entry.postDate}
                                categories={entry.categories}
                            />
                        )

                    } else {
                        let heroImage
                        if ( entry.hero.length && entry.hero[0].image.length ) { 
                            heroImage = entry.hero[0].image[0].url
                        } else {
                            heroImage = '/assets/ui/fallback.png'
                        }
                        return (
                            <ArticleCardLandscape 
                                key={entry.id}
                                href={`/${entry.slug}`}
                                title={entry.title}
                                excerpt={entry.body}
                                image={heroImage}
                                date={entry.postDate}
                                categories={entry.categories}

                            />
                        )
                    }
                    
                })
            }
        </>
    )
}