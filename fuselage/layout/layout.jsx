import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

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
	{ code: 'fr', label: 'Française'},
	{ code: 'es', label: 'Espagñol'},
	{ code: 'pt', label: 'Português'},
	{ code: 'id', label: 'Bahasa Indonesia'},
]

export default function Layout ({ children, globals }) {

	const router = useRouter()
	const { locale, pathname, asPath, query } = router
	let initialLocale = locales.find( obj => locale === obj.code )

	const [ navActive, setNavActive ] = useState(false)
    const [ searchActive, setSearchActive ] = useState(false)
    const [ localesActive, setLocalesActive ] = useState(false)
	const [ activeLocale, setActiveLocale ] = useState(initialLocale.label)
		
	const handleCta = () => {

		const text = globals.ctaBody[0]
		const button = globals.ctaButton[0]

		if ( !globals || !text.heading || !text.body || !button.buttonLink || !button.buttonLabel ) return

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

	// **** set initial activeLocale via useEffect on page load ****

	const handleLocales = () => {

		
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
					
					<p><ArrowLink href="https://www.aax.com" direction='left' decal='fs-sm fw-400'>Go to aax.com</ArrowLink></p>
                    
					<div className="onlyDesktop mt-md">
						<Brand className/>
					</div>
					
					<ul className='fw-500 mt-md lh-9'>
						<li onClick={ () => setNavActive( false ) }>
							<UnderlineLink href='/category/videos-and-webinars'>Videos &amp; Webinars</UnderlineLink>
						</li>
						<li onClick={ () => setNavActive( false ) }>
							<UnderlineLink href='/category/news-and-insights'>News and Insights</UnderlineLink>
						</li>
						<li onClick={ () => setNavActive( false ) }>
							<UnderlineLink href='/category/explainers'>Explainers</UnderlineLink>
						</li>
						<li onClick={ () => setNavActive( false ) }>
							<UnderlineLink href='/category/crypto-technical-analysis'>Crypto Technical Analysis</UnderlineLink>
						</li>
						<li onClick={ () => setNavActive( false ) }>
							<UnderlineLink href='/category/press-room'>Press Room</UnderlineLink>
						</li>
					</ul>
					
					{/* TEMP UI FOR SEARCH */}

					{/* <div>
						<p className='mt-sm' onClick={ () => setSearchActive( !searchActive ) }><SearchButton>Search</SearchButton></p>
					</div> */}

					<div>
						<p className='mt-sm'><Link href='/search'><span style={{ textDecoration: `none`}}><SearchButton>Search</SearchButton></span></Link></p>
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
						<ButtonSocial href='#' icon='discord' />
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
							<CryptoChart currency='Bitcoin'/>
							<CryptoChart currency='Ethereum'/>
							<CryptoChart currency='AAB'/>
						</div>
						<p><Button href='https://www.aax.com' target='_blank' outline>Trade</Button></p>
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

							<section className={`${CSS.footerColumns4} gap-md`}>
								<div className='fw-400 formatted'>
									<p className='fw-bold c-primary'>Maecenas rhoncus</p>
									<p><UnderlineLink href='#'>Duis mattis nisi nec sapien</UnderlineLink></p>
									<p><UnderlineLink href='#'>Nullam eu ante</UnderlineLink></p>
									<p><UnderlineLink href='#'>Nonenim tincidunt fringilla</UnderlineLink></p>
									<p><UnderlineLink href='#'>Integer leo</UnderlineLink></p>
									<p><UnderlineLink href='#'>Duis eget enim</UnderlineLink></p>
								</div>
								<div className='fw-400 formatted'>
									<p className='fw-bold c-primary'>Class aptent</p>
									<p><UnderlineLink href='#'>Placerat et</UnderlineLink></p>
									<p><UnderlineLink href='#'>Pellentesque</UnderlineLink></p>
									<p><UnderlineLink href='#'>Sedessed diam</UnderlineLink></p>
									<p><UnderlineLink href='#'>Nam nunc</UnderlineLink></p>
								</div>
								<div className='fw-400 formatted'>
									<p className='fw-bold c-primary'>Maecenas rhoncus</p>
									<p><UnderlineLink href='#'>Duis mattis nisi</UnderlineLink></p>
									<p><UnderlineLink href='#'>Nullam eu ante</UnderlineLink></p>
									<p><UnderlineLink href='#'>Nonenim tincidunt </UnderlineLink></p>
									<p><UnderlineLink href='#'>Integer leo</UnderlineLink></p>
									<p><UnderlineLink href='#'>Duis eget enim</UnderlineLink></p>
									<p><UnderlineLink href='#'>Curabitur</UnderlineLink></p>
								</div>
								<div className='fw-400 formatted'>
									<p className='fw-bold c-primary'>Class aptent</p>
									<p><UnderlineLink href='#'>Placerat et</UnderlineLink></p>
									<p><UnderlineLink href='#'>Pellentesque</UnderlineLink></p>
									<p><UnderlineLink href='#'>Sedessed diam</UnderlineLink></p>
									<p><UnderlineLink href='#'>Nam nunc</UnderlineLink></p>
								</div>
							</section>

							<section className={`${CSS.footerColumns2} mt-md gap-md`}>
								<div className='formatted'>
									<p className='fs-2 lh-2 serif c-primary'>Be part of the conversation</p>
									<p>Stay up to date on the latest news, industry trends and developments.</p>
									
									<SubscribeForm />
								</div>

								<div className='formatted'>
									<p className="h6">Disclaimer</p>
									<p className='fs-sm'>This blog provides general information only. It is not a substitute for obtaining any legal, financial or any other form of professional advice from a suitably qualified and licensed advisor. The information may be changed without notice and is not guaranteed to be complete, accurate, correct or up-to-date.</p>
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
					<p className='fs-sm'>© {new Date().getFullYear()} AAX Trends. All rights reserved.</p>
				</main>
			</div>

        </>
    )
}