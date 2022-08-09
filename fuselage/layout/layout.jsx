import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'

import {useTranslations} from 'next-intl'

import Brand from '../components/brand/brand'
import { Button } from '../components/button/button'
import { ArrowLink } from '../components/arrow-link/arrow-link'
import { UnderlineLink } from '../components/u-link/u-link'
import { SearchButton } from '../components/search-button/search-button'
import { LocalesButton } from '../components/locales-button/locales-button'
import { ButtonSocial } from '../components/button-social/button-social'
import { UnderlineBarLink } from '../components/u-bar-link/u-bar-link'
import { SubscribeForm } from '../components/subscribe-form/subscribe-form'
import { SearchForm } from '../components/search-form/search-form'
import { CryptoChart } from '../components/crypto-chart/crypto-chart'

import { ArticleCard } from '../components/article-card/article-card'
import { ArticleCardLandscape } from "../components/article-card-landscape/article-card-landscape"
import { ArticleCardVideoLandscape } from "../components/article-card-video-landscape/article-card-video-landscape"

import { QueryPostForCard } from '../../graphql/queries'
import { handlePosts } from '../../lib/handle-posts'

import CSS from './layout.module.css'

const locales = [
	{ code: 'en', label: 'English'},
	{ code: 'zh', label: '中文 (台灣)'},
	{ code: 'ru', label: 'Русский'},
	{ code: 'ko', label: '한국어'},
	{ code: 'fr', label: 'Français'},
	{ code: 'es', label: 'Espagñol'},
	{ code: 'pt', label: 'Português'},
	{ code: 'id', label: 'Bahasa Indonesia'},
	{ code: 'vi', label: 'Tiếng Việt'},
]

export default function Layout ({ children, globals, categories }) {

	const t = useTranslations('Global')
	
	const router = useRouter()

	const sidebar = globals[1]
	const footer = globals[2]
	const header = globals[0]

	// console.log('globals:', globals)
	// console.log('categories:', categories)
	// console.log('sidebar:', sidebar)
	// console.log('footer:', footer)
	// console.log('header:', header)

	const { locale, pathname, asPath, query } = router
	let initialLocale = locales.find( obj => locale === obj.code )

	const [ navActive, setNavActive ] = useState(false)
    const [ localesActive, setLocalesActive ] = useState(false)
	const [ activeLocale, setActiveLocale ] = useState(initialLocale.label)
    const [ searchActive, setSearchActive ] = useState(false)
	const [ searchResultsActive, setSearchResultsActive ] = useState(false)

	const { register, handleSubmit } = useForm()

	// category checkboxes state
	const [checkedState, setCheckedState] = useState(
		new Array(categories.length).fill(true)
	)
	

	const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [currentSearchQuery, setCurrentSearchQuery] = useState('')


	const handleMainMenu = () => {
		if ( !categories.length ) return

		return (
			<ul className='fw-500 mt-md lh-9'>				
				{
					categories.map( category => {
						return (
							<li key={category.id} onClick={ () => setNavActive( false ) }>
								<UnderlineLink href={`/category/${category.slug}`}>{category.title}</UnderlineLink>
							</li>
						)
					})
				}
			</ul>
		)
	}
		
	const handleCta = () => {

		if ( !sidebar || !sidebar.ctaBody || !sidebar.ctaButton ) return
		
		const text = sidebar.ctaBody[0]
		const button = sidebar.ctaButton[0]

		if ( text && button && text.heading && text.body ) {
			return (
				<div className='mt-sm'>
					<div className="formatted">
						<p className='h3 serif lh-2'>{text.heading}</p>
						<p className='pb-xs'>{text.body}</p>
					</div>
					<Button href={button.buttonLink}>{button.buttonLabel}</Button>
				</div>
			)
		}
 
	}

	const handleLocales = () => {

		// <p key={item.code}>
		// 	<a href={item.code === 'en' ? `/` : `/${item.code}`} onClick={() => { 
		// 		setActiveLocale( item.label )
		// 		setLocalesActive( false )
		// 	}}>
		// 		<span className={CSS.localesButton}>
		// 			{ item.label }
		// 		</span>
		// 	</a>
		// </p>


		return (
			locales.map( item => {
				return (
					<p key={item.code} onClick={() => { 
						router.push({ pathname, query }, asPath, { locale: item.code }) 
						setActiveLocale( item.label )
						setLocalesActive( false )
					}}>
						<span className={CSS.localesButton}>
							{ item.label }
						</span>
					</p>
				)
			})
		)
	}

	const handleFooterLinks = () => {

		if ( !footer.footerLinks ) return 

		return (
			<section className={`${CSS.footerColumns4} gap-md`}>
				{
					footer.footerLinks.map( section => {
						return (
							<div key={section.id} className='fw-400 lh-1'>
								{
									section.column.map( item => {
										if ( item.__typename === 'column_heading_BlockType') {
											return (
												<p key={item.id} className='fw-bold c-primary mb-xxs'>{item.heading}</p>
											)
										}
										if ( item.__typename === 'column_link_BlockType') {
											return (
												<p key={item.id} className='mb-xxs c-primary'>
													<UnderlineLink href={item.linkUrl} target={item.openInNewWindow}>
														{item.label}
													</UnderlineLink>
												</p>
											)
										}
									})
								}
							</div>
						)
					})
				}
			</section>
		)
	}


	// search handlers

	const searchEntries = ( searchQuery, catergoryIds ) => {

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
                    entries(section: "posts", search: "${searchQuery}", site: "${router.locale}", relatedTo: [${catergoryIds}] limit: 30) {
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
        })

    }

    const handleEntries = () => {
        if ( data ) {
            if ( data.length ) {
                return (
                    <>
                        <section className="flex ai-center gap-xs">
                            <p className="fs-5 fw-600">{t("Results for")} &ldquo;{ currentSearchQuery }&rdquo;</p>
                            <p>
                                <button 
                                    className="clearButton" 
                                    onClick={ () => {
                                        setData(null)
                                        setSearchQuery('')
										if( window.matchMedia('(max-width:599px)') ) {
											setSearchResultsActive(false) 
										}
                                    }}
                                >&#215;</button>
                            </p>
                        </section>

                        <section className="mt-sm bt-1 bc-grey-10 pt-sm columns-1 gap-sm">
							{
								data.map( entry => {
                    
									if ( entry.heroType && entry.hero[0].video ) {
										return (
											<span onClick={ () => {
												setSearchActive(false)
												setSearchResultsActive(false) 
											}}>
												<ArticleCardVideoLandscape
													key={entry.id}
													href={`/${entry.slug}`}
													videoUrl={`https://www.youtube.com/watch?v=${entry.hero[0].video}`}
													title={entry.title}
													excerpt={entry.body}
													date={entry.postDate}
													categories={entry.categories}
												/>
											</span>
										)
				
									} else {
										let heroImage
										if ( entry.hero.length && entry.hero[0].image.length ) { 
											heroImage = entry.hero[0].image[0].url
										} else {
											heroImage = '/assets/ui/fallback.png'
										}
										return (
											<span onClick={ () => {
												setSearchActive(false)
												setSearchResultsActive(false)
												setNavActive(false)
												
											}}>
												<ArticleCardLandscape 
													key={entry.id}
													href={`/${entry.slug}`}
													title={entry.title}
													excerpt={entry.body}
													image={heroImage}
													date={entry.postDate}
													categories={entry.categories}
					
												/>
											</span>
										)
									}
									
								})
							}
                        </section>
                    </>
                )
            } else {
                return (
                    <>
                        <section className="flex ai-center gap-xs">
                            <p className="fs-5 fw-600">{t("Results for")} &ldquo;{ currentSearchQuery }&rdquo; </p>
                            {/* <p><button className="clearButton" onClick={ () => setData(null) }>&#215;</button></p> */}
                        </section>

                        <section className="mt-sm bt-1 bc-grey-10 pt-sm">
                            <p className='fs-6 fw-400'>Nothing found, please try another search.</p>
                        </section>
                    </>
                )
            }
            
        } 
        return 
    }

	const handleCheckboxChange = (position) => {
		const updatedCheckedState = checkedState.map((item, index) =>
		  index === position ? !item : item
		)
		setCheckedState(updatedCheckedState)
	}


    return (
        <>

			{/* nav toggle */}

			<button className={`${CSS.toggle} ${ navActive ? CSS.active : '' }`} onClick={ () => setNavActive( !navActive ) }>
				<img src="/assets/ui/icon-nav-toggle.svg" alt="" />
			</button>
           
			
			{/* search drawer */}

			<div className={`${CSS.searchDrawer} ${ searchActive ? CSS.active : '' }`}>

				<button className={`${CSS.closeUtility} ${ searchActive ? CSS.active : '' }`} onClick={ () => {
					setSearchActive( !searchActive )
					setSearchResultsActive(false)
				}}>
					<img src="/assets/ui/icon-close.svg" alt="" />
				</button>
				<p className="fs-4 fw-400 c-white">Search</p>

				<div className="searchForm">

					<form onSubmit={handleSubmit( (data) => {
						// console.log('form data:', data)
						// console.log('categories', categories)
						// console.log('checkBoxStatus:', checkedState)
						
						let catergoryIds = []

						checkedState.map( (value, index) =>  value === true ? catergoryIds.push(categories[index].id) : null )

						// console.log('ids to search', catergoryIds)

						setCurrentSearchQuery(searchQuery)
						searchEntries(searchQuery, catergoryIds)
						setSearchResultsActive(true)
					})}>

						<div className='flex mt-sm'>
							<input 
								{...register("searchQuery")}
								type="text" 
								value={searchQuery}
								onChange={ e => setSearchQuery(e.target.value)}
								placeholder={t("Keyword/s")}
								style={{ color: `white`}}
								required
							/>
							<button className="button" type="submit">
								<Image src={'/assets/ui/icon-search.svg'} width={30} height={30} alt='Search' />
							</button>
						</div>
						
						<div className='mt-md c-white'>
							{
								categories.map( (category, index) => {
									return (
										<div key={category.id} className='searchFormRow'>
											<input 
												{...register(category.slug)}
												type="checkbox" 
												id={category.slug} 
												name={category.slug} 
												value={category.id}
												checked={checkedState[index]}
												onChange={() => {handleCheckboxChange(index)}}
											/>
											<span className='checkmark' onClick={() => {handleCheckboxChange(index)}}></span>
											<label htmlFor={category.slug}>{ category.title }</label><br/>
										</div>
									)
								})
							}
						</div>

					</form>

				</div>
			</div>

			
			{/* search results drawer */}

			<div className={`${CSS.searchResultsDrawer} ${searchResultsActive && CSS.active}`}>

					<div className={CSS.mobileCloseButton}>
						<button className={`${CSS.closeUtility} ${ searchActive ? CSS.active : '' }`} onClick={ () => {
							setSearchResultsActive(false) 
						}}>
							<img src="/assets/ui/icon-close.svg" alt="" />
						</button>
					</div>

					<div className={`${CSS.searchResultsContent} p-md`}>

						{ isLoading ? <p className="fs-5 fw-600">{t("Loading")}...</p> : handleEntries()}

					</div>
			</div>
			
			
			{/* locales drawer */}

			<div className={`${CSS.localesDrawer} ${ localesActive ? CSS.active : '' }`}>
				<button className={`${CSS.closeUtility} ${ localesActive ? CSS.active : '' }`} onClick={ () => setLocalesActive( !localesActive ) }>
					<img src="/assets/ui/icon-close.svg" alt="" />
				</button>

				<Image src={'/assets/ui/icon-locales.svg'} width={40} height={40} />

				<div className="mt-sm c-white formatted">
					{handleLocales()}
				</div>
			</div>


			{/* main */}

            <div className={`${CSS.layout} container`}>

				{/* main menu */}

                <aside className={`${CSS.sidebar} ${ navActive ? CSS.active : '' }`}>

					<button className={`${CSS.closeSidebar} ${ navActive ? CSS.active : '' }`} onClick={ () => setNavActive( !navActive ) }>
						<img src="/assets/ui/icon-close.svg" alt="" />
					</button>
					
					<p><ArrowLink href="https://www.aax.com" direction='left' decal='fs-sm fw-400'>{t("Go to")} aax.com</ArrowLink></p>
                    
					<div className="onlyDesktop mt-md">
						<Brand className/>
					</div>
					
					{handleMainMenu()}
										
					<p className='mt-sm' onClick={ () => setSearchActive( !searchActive ) }><SearchButton>Search</SearchButton></p>
					
					<p className='mt-xs' onClick={ () => setLocalesActive( !localesActive ) }><LocalesButton>{activeLocale}</LocalesButton></p>

					{handleCta()}
					
					<div className='mt-md'>
						<ButtonSocial href='https://www.facebook.com/AAXExchange' icon='facebook' />
						<ButtonSocial href='https://twitter.com/AAXExchange/' icon='twitter' />
						<ButtonSocial href='https://www.linkedin.com/company/aax-atom-asset-exchange/' icon='linkedin' />
						<ButtonSocial href='https://discord.gg/QbXev4qAec' icon='discord' />
					</div>
                </aside>

				{/* main content */}

                <main className={CSS.main}>

                    <div className={`${CSS.overlay} ${ navActive ? CSS.active : '' }`}></div>

                    <div className={`${CSS.mobileHeader} onlyMobile`}>
						<Brand/>
					</div>

                    <div className={CSS.cryptoTicker}>
						<div>
							<CryptoChart 
								currency='Bitcoin'
								code='BTC' 
							/>
							<CryptoChart 
								currency='Ethereum'
								code='ETH' 
							/>
							<CryptoChart 
								currency='Cardano'
								code='ADA' 
							/>
						</div>
						{
							header.ctaButton && header.ctaButton[0].buttonLabel && header.ctaButton[0].buttonLink ?
							<p><Button href={header.ctaButton[0].buttonLink} target='_blank' outline>{header.ctaButton[0].buttonLabel}</Button></p>
							:
							<p><Button href='https://www.aax.com/en-US/markets/' target='_blank' outline>{t("Trade")}</Button></p>
						}
					</div>

                    <div className={CSS.mainContent}>
                        { children }
                    </div>

                </main>

            </div>


            {/* footer */}

			<section className={`${CSS.footer} bg-light`}>
				<div className={`${CSS.layout} container`}>
					<aside className={CSS.sidebar}>
						<Brand/>
					</aside>

					<main className={CSS.main}>
						<div className={CSS.footerContent}>

							{handleFooterLinks()}

							<section className={`${CSS.footerColumns2} mt-md gap-md`}>
								{/* {
									footer.subscribeForm.length ?
									<div className='formatted'>
										<p className='fs-2 lh-2 serif c-primary'>{ footer.subscribeForm[0].heading }</p>
										<p>{ footer.subscribeForm[0].body }</p>
										
										<SubscribeForm />
									</div>
									: null
								} */}

								<div className='formatted'>
									{
										footer.disclaimer ?
										<>
											<p className="h6">{ footer.disclaimer[0].heading }</p>
											<p className='fs-sm'>{ footer.disclaimer[0].body }</p>
										</>
										: null
									}
									<p className='fw-500 mt-sm'><UnderlineBarLink href="https://www.aax.com">aax.com</UnderlineBarLink></p>
								</div>
							</section>

						</div>
					</main>
				</div>
			</section>

			{/* legals */}

			<div className={`${CSS.layout} container`}>

				<aside className={CSS.sidebar}></aside>
				<main className={`${CSS.main} px-md py-sm`}>
					<p className='fs-sm'>© {new Date().getFullYear()} AAX Trends. {t('All rights reserved')}</p>
				</main>
			</div>

        </>
    )
}
