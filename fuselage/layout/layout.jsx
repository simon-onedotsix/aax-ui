import { useState } from 'react'

import Brand from '../components/brand/brand'
import { Button } from '../components/button/button'
import { SearchButton } from '../components/search-button/search-button'
import { LocalesButton } from '../components/locales-button/locales-button'
import { ButtonSocial } from '../components/button-social/button-social'
import { UnderlineLink } from '../components/u-link/u-link'
import { SubscribeForm } from '../components/subscribe-form/subscribe-form'

import CSS from './layout.module.css'

export default function Layout ({ children }) {

    const [ navActive, setNavActive ] = useState(false)
    const [ searchActive, setSearchActive ] = useState(false)
    const [ localesActive, setLocalesActive ] = useState(false)

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
			</div>
			
			
			{/* locales drawer */}

			<div className={`${CSS.localesDrawer} ${ localesActive ? CSS.active : '' }`}>
				<button className={`${CSS.closeUtility} ${ localesActive ? CSS.active : '' }`} onClick={ () => setLocalesActive( !localesActive ) }>
					<img src="/assets/ui/icon-close.svg" alt="" />
				</button>
				<p className="fs-4 fw-400 c-white">Locales</p>
			</div>


			{/* main menu */}

            <div className={`${CSS.layout} container`}>

                <aside className={`${CSS.sidebar} ${ navActive ? CSS.active : '' }`}>

					<button className={`${CSS.closeSidebar} ${ navActive ? CSS.active : '' }`} onClick={ () => setNavActive( !navActive ) }>
						<img src="/assets/ui/icon-close.svg" alt="" />
					</button>
					
                    <p>Trade with AAX</p>
                    
					<div className="onlyDesktop mt-md">
						<Brand className/>
					</div>
					
					<ul className='fw-500 mt-md lh-9'>
						<li>News and Opinion</li>
						<li>Crypto Technical Analysis</li>
						<li>Explainers</li>
						<li>Videos &amp; Webinars</li>
						<li>Press Room</li>
					</ul>
					
					<div className='mt-md'>
						<p className='mt-sm' onClick={ () => setSearchActive( !searchActive ) }><SearchButton>Search</SearchButton></p>
					</div>
					
					<div className='mt-xs'>
						<p className='mt-sm' onClick={ () => setLocalesActive( !localesActive ) }><LocalesButton>English</LocalesButton></p>
					</div>

					<div className='formatted mt-md'>
						<p className='h3 serif lh-1'>High Yield Crypto Savings</p>
						<p className='pb-xs'>Earn a steady interest in your favourite crypto. Accrue per minute, no lockup!</p>
						<Button href='/'>Register now</Button>
					</div>
					
					<div className='mt-md'>
						<ButtonSocial href='#' icon='facebook' />&ensp;
						<ButtonSocial href='#' icon='twitter' />&ensp;
						<ButtonSocial href='#' icon='linkedin' />&ensp;
						<ButtonSocial href='#' icon='weibo' />
					</div>
                </aside>

                <main className={CSS.main}>

                    <div className={`${CSS.overlay} ${ navActive ? CSS.active : '' }`}></div>

                    <div className={`${CSS.mobileHeader} onlyMobile`}>
						<Brand/>
					</div>

                    <div className={CSS.cryptoTicker}>
						<p>[ crypto ticker ]</p>
						<p><Button href='#' outline>View all</Button></p>
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
									<p>Duis mattis nisi nec sapien</p>
									<p>Nullam eu ante</p>
									<p>Nonenim tincidunt fringilla</p>
									<p>Integer leo</p>
									<p>Duis eget enim</p>
								</div>
								<div className='fw-400 formatted'>
									<p className='fw-bold c-primary'>Class aptent</p>
									<p>Placerat et</p>
									<p>Pellentesque</p>
									<p>Sedessed diam</p>
									<p>Nam nunc</p>
								</div>
								<div className='fw-400 formatted'>
									<p className='fw-bold c-primary'>Maecenas rhoncus</p>
									<p>Duis mattis nisi</p>
									<p>Nullam eu ante</p>
									<p>Nonenim tincidunt </p>
									<p>Integer leo</p>
									<p>Duis eget enim</p>
									<p>Curabitur</p>
								</div>
								<div className='fw-400 formatted'>
									<p className='fw-bold c-primary'>Class aptent</p>
									<p>Placerat et</p>
									<p>Pellentesque</p>
									<p>Sedessed diam</p>
									<p>Nam nunc</p>
								</div>
							</section>

							<section className={`${CSS.footerColumns2} mt-md gap-md`}>
								<div className='formatted'>
									<p className='fs-2 lh-1 serif c-primary'>Be part of the conversation</p>
									<p>Stay up to date on the latest news, industry trends and developments.</p>
									
									<SubscribeForm />
								</div>

								<div>
									<p className="h6">Disclaimer</p>
									<p className='fs-sm'>This blog provides general information only. It is not a substitute for obtaining any legal, financial or any other form of professional advice from a suitably qualified and licensed advisor. The information may be changed without notice and is not guaranteed to be complete, accurate, correct or up-to-date.</p>
									<p className='fw-500 mt-sm'><UnderlineLink href="/">aax.com</UnderlineLink></p>
								</div>
							</section>

						</div>
					</main>
				</div>
			</section>

        </>
    )
}