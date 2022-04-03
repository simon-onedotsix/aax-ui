import { useState } from 'react'
import Head from 'next/head'

import Brand from '../fuselage/components/brand/brand'
import { Button } from '../fuselage/components/button/button'

import CSS from './index.module.css'

export default function Home() {

	const [ navActive, setNavActive ] = useState(false)

	return (
		<>
			<Head>
				<title>AAX</title>
				<meta name="description" content="AAX blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={CSS.toggle} style={{ position: `fixed`, top: 10, right: 10, zIndex: 30 }}>
				<button onClick={ () => setNavActive( !navActive ) }>X</button>
			</div>

			<div className={`${CSS.layout} container`}>

				<aside className={`${CSS.sidebar} ${ navActive ? CSS.active : '' }`}>
					<p>Trade with AAX</p>
					<Brand/>
					<ul className='fw-500'>
						<li>News and Opinion</li>
						<li>Crypto Technical Analysis</li>
						<li>Explainers</li>
						<li>Videos &amp; Webinars</li>
						<li>Press Room</li>
					</ul>
					<div>
						<p className='h3 serif'>High Yield Crypto Savings</p>
						<p>Earn a steady interest in your favourite crypto. Accrue per minute, no lockup!</p>
						<Button href='/' label='Register now' />
					</div>
				</aside>

				<main className={CSS.main}>
					<div className={`${CSS.overlay} ${ navActive ? CSS.active : '' }`}></div>

					<p className="h fs-0 serif c-primary">Main content</p>
					<p className='h2'>Heading</p>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius adipisci quam reprehenderit. Nemo, vero eos!</p>
					<div style={{ height: `200vh` }}></div>
				</main>
			</div>


			<section className={`${CSS.footer} bg-light`}>
				<div className={`${CSS.layout} container`}>
					<aside className={CSS.sidebar}>
						<Brand/>
					</aside>

					<main className={CSS.main}>
						<p className="h3 serif c-primary">Footer content</p>
						<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius adipisci quam reprehenderit. Nemo, vero eos!</p>
					</main>
				</div>
			</section>

		</>
	)
}
