import { ArticleCardLandscape } from "../fuselage/components/article-card-landscape/article-card-landscape"
import { ArticleCardVideoLandscape } from "../fuselage/components/article-card-video-landscape/article-card-video-landscape"

export const handlePosts = ( entries ) => {
    if ( entries.length ) {
        return (
            <>
                {
                    entries.map( entry => {
                        
                        if ( entry.heroType ) {
                            return (
                                <ArticleCardVideoLandscape
                                    key={entry.id}
                                    href={`/${entry.slug}`}
                                    videoUrl={'https://www.youtube.com/watch?v=e6aogh5OFJ8'}
                                    title={entry.title}
                                    excerpt={entry.excerpt}
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
                            if ( entry.hero.length ) {
                                console.log('HERO FOUND')
                            }


                            heroImage = '/assets/ui/fallback.png'
                            return (
                                <ArticleCardLandscape 
                                    key={entry.id}
                                    href={`/${entry.slug}`}
                                    title={entry.title}
                                    excerpt={entry.excerpt}
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

    } else {
        return (
            <p className="fs-6"><span className="fw-600">Sorry!</span> Currently, there are no posts in this category.</p>
        )
    }
}