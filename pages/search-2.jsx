import { useState, useEffect } from "react"

export default function SearchPage () {   

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)


    const searchEntries = ( query ) => {

        setLoading(true)

        fetch('https://aax.onedotsix.com/api', {
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
        .then((res) => res.json())
        .then((data) => {
            setData(data.data.entries)
            setLoading(false)
            console.log(data.data.entries)
        })

    }


    const handleEntries = () => {
        if ( data ) {
            if ( data.length ) {
                return (
                    <section className="mt-md">
                        <p className="fs-5 fw-600">Results</p>
                        {
                            data.map( entry => <p key={entry.id}>{entry.title}</p>)
                        }
                    </section>
                )
            } else {
                return (
                    <p>No results, please try again.</p>
                )
            }
            
        } 
        return 
    }


    return (
        <>
            <h1 className="fs-1 serif c-primary">Search</h1>

            <button onClick={ () => searchEntries('test') }>SEARCH</button>
            <button onClick={ () => setData(null) }>Clear</button>

            
            { isLoading ? <p className="mt-md">Loading...</p> : handleEntries()}
        </>
    )

}
