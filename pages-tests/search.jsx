import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import {useTranslations} from 'next-intl'

import { QueryPostForCard } from '../graphql/queries'
import { handlePosts } from '../lib/handle-posts'

export default function SearchPage () {   

    const t = useTranslations('Global')
    
    const router = useRouter()
    
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [currentSearchQuery, setCurrentSearchQuery] = useState('')

    
    const searchEntries = ( searchQuery ) => {

        if ( !searchQuery ) return

        setLoading(true)

        fetch(process.env.NEXT_PUBLIC_CMS_API_URL, {
          method: 'POST',
      
          headers: {
            "Content-Type": "application/json"
          },
      
          body: JSON.stringify({
            query: `
                query Search {
                    entries(section: "posts", search: "${searchQuery}" site: "${router.locale}" limit: 30) {
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
            // console.log(data.data.entries)
        })

    }

    const handleEntries = () => {
        if ( data ) {
            if ( data.length ) {
                return (
                    <>
                        <section className="mt-md flex ai-center gap-xs">
                            <p className="fs-5 fw-600">{t("Results for")} &ldquo;{ currentSearchQuery }&rdquo;</p>
                            <p>
                                <button 
                                    className="clearButton" 
                                    onClick={ () => {
                                        setData(null)
                                        setSearchQuery('')
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
                            <p className="fs-5 fw-600">{t("Results for")} &ldquo;{ currentSearchQuery }&rdquo; </p>
                            {/* <p><button className="clearButton" onClick={ () => setData(null) }>&#215;</button></p> */}
                        </section>

                        <section className="mt-sm bt-1 bc-grey-10 pt-sm">
                            {/* <p>Please try again.</p> */}
                        </section>
                    </>
                )
            }
            
        } 
        return 
    }


    return (
        <>
            <h1 className="fs-1 serif c-primary">{t('Search')}</h1>

            <div className="searchForm maxw-25 flex mt-sm">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={ e => setSearchQuery(e.target.value)}
                    placeholder={t("Keyword/s")}
                />
                <button className="button" onClick={ () => {
                    setCurrentSearchQuery(searchQuery)
                    searchEntries(searchQuery)
                } }>
                    <Image src={'/assets/ui/icon-search.svg'} width={30} height={30} alt='Search' />
                </button>
                
            </div>

            
            { isLoading ? <p className="fs-5 fw-600 mt-md">{t("Loading")}...</p> : handleEntries()}
        </>
    )

}


export async function getStaticProps({locale}) {


    return {
        props: {
            messages: (await import(`../translations/${locale}.json`)).default
        }
    }
}