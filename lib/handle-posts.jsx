import { ArticleCardLandscape } from "../fuselage/components/article-card-landscape/article-card-landscape"
import { ArticleCardVideoLandscape } from "../fuselage/components/article-card-video-landscape/article-card-video-landscape"

export const handlePosts = ( entries ) => {

    if ( !entries.length ) return
    
    return (
        <>
            {
                entries.map( entry => {

                    let excerpt
                    entry.excerpt ? excerpt = entry.excerpt : excerpt = entry.body
                    
                    if ( entry.heroType && entry.hero[0].video ) {
                        return (
                            <ArticleCardVideoLandscape
                                key={entry.id}
                                href={`/${entry.slug}`}
                                videoUrl={`https://www.youtube.com/watch?v=${entry.hero[0].video}`}
                                title={entry.title}
                                excerpt={excerpt}
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
                                excerpt={excerpt}
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