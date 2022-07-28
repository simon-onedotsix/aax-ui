import { useState } from 'react'
import { useRouter } from 'next/router'
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

	const sidebar = globals[0]
	const footer = globals[1]

	// console.log('categories:', categories)
	// console.log('sidebar:', sidebar)
	// console.log('footer:', footer)

	const router = useRouter()
	const { locale, pathname, asPath, query } = router
	let initialLocale = locales.find( obj => locale === obj.code )

	const [ navActive, setNavActive ] = useState(false)
    const [ searchActive, setSearchActive ] = useState(false)
    const [ localesActive, setLocalesActive ] = useState(false)
	const [ activeLocale, setActiveLocale ] = useState(initialLocale.label)


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

		const text = sidebar.ctaBody[0]
		const button = sidebar.ctaButton[0]

		if ( !sidebar || !text || !button.buttonLink || !button.buttonLabel ) return

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

		if ( !footer.footerLinks.length ) return 

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


    return (
        <>

			{/* nav toggle */}

			<button className={`${CSS.toggle} ${ navActive ? CSS.active : '' }`} onClick={ () => setNavActive( !navActive ) }>
				<img src="/assets/ui/icon-nav-toggle.svg" alt="" />
			</button>
           
			
			{/* search drawer */}

			<div className={`${CSS.searchDrawer} ${ searchActive ? CSS.active : '' }`}>
				<button className={`${CSS.closeUtility} ${ searchActive ? CSS.active : '' }`} onClick={ () => setSearchActive( !searchActive ) }>
					<img src="/assets/ui/icon-close.svg" alt="" />
				</button>
				<p className="fs-4 fw-400 c-white">Search</p>

				<SearchForm />
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
					
					{/* TEMP UI FOR SEARCH */}

					{/* <div>
						<p className='mt-sm' onClick={ () => setSearchActive( !searchActive ) }><SearchButton>Search</SearchButton></p>
					</div> */}

					<div>
						<p className='mt-sm'><Link href='/search'><span style={{ textDecoration: `none`}}><SearchButton>{t("Search")}</SearchButton></span></Link></p>
					</div>
					
					{/* END TEMP UI FOR SEARCH */}


					<div>
						<p className='mt-xs' onClick={ () => setLocalesActive( !localesActive ) }><LocalesButton>{activeLocale}</LocalesButton></p>
					</div>

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
						<p><Button href='https://www.aax.com' target='_blank' outline>{t("Trade")}</Button></p>
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
								{
									footer.subscribeForm.length ?
									<div className='formatted'>
										<p className='fs-2 lh-2 serif c-primary'>{ footer.subscribeForm[0].heading }</p>
										<p>{ footer.subscribeForm[0].body }</p>
										
										<SubscribeForm />
									</div>
									: null
								}

								<div className='formatted'>
									{
										footer.disclaimer.length ?
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
