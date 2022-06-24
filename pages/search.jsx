import { useState, useEffect } from "react"
import Image from "next/image"

import { QueryPostForCard } from '../graphql/queries'
import { handlePosts } from '../lib/handle-posts'

export default function SearchPage () {   

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [query, setQuery] = useState('keyword/s')
    const [currentQuery, setCurrentQuery] = useState('')


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
                        ${QueryPostForCard}
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
                    <>
                        <section className="mt-md flex ai-center gap-xs">
                            <p className="fs-5 fw-600">Results for &ldquo;{ currentQuery }&rdquo;</p>
                            <p>
                                <button 
                                    className="clearButton" 
                                    onClick={ () => {
                                        setData(null)
                                    }}
                                >&#215;</button>
                            </p>
                        </section>

                        <section className="mt-sm bt-1 bc-grey-10 pt-sm">
                            {handlePosts(data)}
                        </section>
                    </>
                )
            } else {
                return (
                    <>
                        <section className="mt-md flex ai-center gap-xs">
                            <p className="fs-5 fw-600">Results for &ldquo;{ currentQuery }&rdquo;</p>
                            <p><button className="clearButton" onClick={ () => setData(null) }>&#215;</button></p>
                        </section>

                        <section className="mt-sm bt-1 bc-grey-10 pt-sm">
                            <p>No results, please try again.</p>
                        </section>
                    </>
                )
            }
            
        } 
        return 
    }


    return (
        <>
            <h1 className="fs-1 serif c-primary">Search</h1>

            <div className="searchForm maxw-25 flex mt-sm">
                <input 
                    type="text" 
                    value={query}
                    onChange={ e => setQuery(e.target.value)}
                />
                <button className="button" onClick={ () => {
                    setCurrentQuery(query)
                    searchEntries(query)
                } }>
                    <Image src={'/assets/ui/icon-search.svg'} width={30} height={30} alt='Search' />
                </button>
                
            </div>

            
            { isLoading ? <p className="mt-md">Loading...</p> : handleEntries()}
        </>
    )

}
