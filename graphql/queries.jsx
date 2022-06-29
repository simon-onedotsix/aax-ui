export const QueryPostForCard = `
    ... on posts_Post_Entry {
        id
        slug
        title
        postDate
        excerpt
        body
        heroType
        hero {
            ... on hero_BlockType {
            id
            image {
                url
                width
                height
            }
            video
            }
        }
        categories {
            ... on categories_Category {
            id
            title
            slug
            level
            }
        }
    }
`