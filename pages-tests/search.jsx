export default function SearchPage () {   

    async function doSearch( query ) {

        let results = await fetch('https://aax.onedotsix.com/api', {
          method: 'POST',
      
          headers: {
            "Content-Type": "application/json"
          },
      
          body: JSON.stringify({
            query: `
                query Search {
                    entries(section: "posts", search: "${query}") {
                        id
                        slug
                        title
                    }
                }
            `
          })
        })

        let stuff = await results.json()
        let entries = stuff.data.entries
        
        console.log('searchedfor:', entries)
    }


    return (

        <>
            <h1 className="h fs-1 serif c-primary pb-sm">Search page</h1>
            <button onClick={ () => doSearch('luna') }>SEARCH</button>
        </>

    )
}
