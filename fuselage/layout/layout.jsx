import { useState } from 'react'

import Brand from '../components/brand/brand'
import { Button } from '../components/button/button'

import CSS from './layout.module.css'

export default function Layout ({ children }) {

    const [ navActive, setNavActive ] = useState(false)
    const [ utilityActive, setUtilityActive ] = useState(false)

    return (
        <>

			<button className={`${CSS.toggle} ${ navActive ? CSS.active : '' }`} onClick={ () => setNavActive( !navActive ) }>
				<img src="/assets/ui/icon-nav-toggle.svg" alt="" />
			</button>
           

			<div className={`${CSS.utilityDrawer} ${ utilityActive ? CSS.active : '' }`}>
				<button className={`${CSS.closeUtility} ${ utilityActive ? CSS.active : '' }`} onClick={ () => setUtilityActive( !utilityActive ) }>
					<img src="/assets/ui/icon-close.svg" alt="" />
				</button>

				<p className="fs-4 fw-400 c-white">Search</p>
			</div>


            <div className={`${CSS.layout} container`}>

                <aside className={`${CSS.sidebar} ${ navActive ? CSS.active : '' }`}>

					<button className={`${CSS.closeSidebar} ${ navActive ? CSS.active : '' }`} onClick={ () => setNavActive( !navActive ) }>
						<img src="/assets/ui/icon-close.svg" alt="" />
					</button>
					
                    
                    <p>Trade with AAX</p>
					<div className="onlyDesktop mt-md">
						<Brand className/>
					</div>
					<ul className='fw-500 mt-md'>
						<li>News and Opinion</li>
						<li>Crypto Technical Analysis</li>
						<li>Explainers</li>
						<li>Videos &amp; Webinars</li>
						<li>Press Room</li>
					</ul>
					<div className='formatted mt-md'>
						<p className='h3 serif lh-1'>High Yield Crypto Savings</p>
						<p className='pb-xs'>Earn a steady interest in your favourite crypto. Accrue per minute, no lockup!</p>
						<Button href='/'>Register now</Button>
						<p className='mt-sm' onClick={ () => setUtilityActive( !utilityActive ) }>Search</p>
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
							<p className="h3 serif c-primary">Footer content</p>
							<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius adipisci quam reprehenderit. Nemo, vero eos!</p>
						</div>
					</main>
				</div>
			</section>

        </>
    )
}