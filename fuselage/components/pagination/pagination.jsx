import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from "next/link"

import { ArticleCardLandscape } from "../../components/article-card-landscape/article-card-landscape"
import { ArticleCardVideoLandscape } from "../../components/article-card-video-landscape/article-card-video-landscape"

import FIRST from './img/pagination-first.svg'
import LAST from './img/pagination-last.svg'
import PREV from './img/pagination-prev.svg'
import NEXT from './img/pagination-next.svg'

import CSS from './pagination.module.css'



export function Pagination({ data, pageLimit, dataLimit, heading }) {
    
    const [ pages, setPages ] = useState(1)
    const [ currentPage, setCurrentPage ] = useState(1)

    const router = useRouter()

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    const scrollBehaviour = { top: 0, behavior: 'smooth' }

    useEffect( () => {
        setCurrentPage(1)
        setPages(Math.ceil(data.length / dataLimit))
        if ( router.query.page && router.query.page <= pages ) {
            console.log('page query:', router)
            setCurrentPage(parseInt(router.query.page))
        }
    }, [ router ])



    // console.log('pagination data:', data)
    // console.log('posts:', data.length)
    // console.log('pages:', pages)
    // console.log('currentPage:', currentPage)

    

    function goToNextPage() {
        window.scrollTo(scrollBehaviour)
        setCurrentPage((page) => page + 1)
        updateRouter(currentPage + 1)
    }
  
    function goToPreviousPage() {
        window.scrollTo(scrollBehaviour)
        setCurrentPage((page) => page - 1)
        updateRouter(currentPage - 1)
    }
  
    function changePage( event ) {
        window.scrollTo(scrollBehaviour)
        const pageNumber = Number(event.target.textContent)
        setCurrentPage(pageNumber)
        updateRouter(pageNumber)
    }
  
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return data.slice(startIndex, endIndex)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, index) => start + index + 1)
    }

    // function updateRouter ( page ) {
    //     router.replace(`${router.pathname}?page=${page}`, undefined, { shallow: true })
    // }
   
    function updateRouter ( page ) {
        router.replace({
            pathname: `/category/[category]`,
            query: { category:router.query.category, page: page}
        })
    }

    
    
    return (
        <>

            <h1 className="h fs-1 serif c-primary">{ heading }</h1>

            {/* {
                pages > 1 &&
                <p className="fs-sm fw-600">Page: {currentPage} / {pages}</p>
            } */}

            {/* render posts */}
            
            <div className={CSS.dataContainer}>
                {
                    getPaginatedData().map( entry => {

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
            </div>
        


            {/* pagiantion ui */}

            {
                pages > 1 &&

                <div className={CSS.pagination}>

                    <a
                        href={ currentPage > 1 ? `${siteUrl}${router.asPath}?page=1` : `#`}
                        onClick={ e => {
                            e.preventDefault()
                            window.scrollTo(scrollBehaviour)
                            setCurrentPage(1)
                            updateRouter(1)
                        }}
                        className={`${CSS.prev} ${currentPage === 1 ? CSS.disabled : ''}`}
                    ><FIRST className={CSS.icon} /></a>


                    <a
                        href={ currentPage > 1 ? `${siteUrl}${router.asPath}?page=${currentPage - 1}` : `#`}
                        onClick={ e => {
                            e.preventDefault()
                            goToPreviousPage()
                        }}
                        className={`${CSS.prev} ${currentPage === 1 ? CSS.disabled : ''}`}
                    ><PREV className={CSS.icon} /></a>
                

                    {
                        getPaginationGroup().map((item, index) => {
                            if ( data.length/dataLimit + 1 > item ) {
                                return (
                                    <a
                                        key={index}
                                        href={ currentPage != item ? `${siteUrl}${router.asPath}?page=${item}` : `#` }
                                        onClick={ e => {
                                            e.preventDefault()
                                            changePage( e )
                                        }}
                                        className={`${CSS.paginationItem} ${currentPage === item ? CSS.active : ''}`}
                                    ><span>{item}</span></a>
                                )
                            }
                        })
                    }
                

                    <a
                        href={ currentPage < pages ? `${siteUrl}${router.asPath}?page=${currentPage + 1}` : `#`}
                        onClick={goToNextPage}
                        className={`${CSS.next} ${currentPage == pages ? CSS.disabled : ''}`}
                    ><NEXT className={CSS.icon} /></a>
                    

                    <a
                        href={ currentPage < pages ? `${siteUrl}${router.asPath}?page=${pages}` : `#`}
                        onClick={ e => {
                            e.preventDefault()
                            window.scrollTo(scrollBehaviour)
                            setCurrentPage(Math.ceil(pages))
                            updateRouter(Math.ceil(pages))
                        }}
                        className={`${CSS.next} ${currentPage == Math.ceil(pages) ? CSS.disabled : ''}`}
                    ><LAST className={CSS.icon} /></a>
                </div>
            }


      </>
    )
}