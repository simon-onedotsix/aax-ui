import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="apple-touch-icon-precomposed" sizes="57x57" href="/assets/favicons/apple-touch-icon-57x57.png" />
					<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/assets/favicons/apple-touch-icon-114x114.png" />
					<link rel="apple-touch-icon-precomposed" sizes="72x72" href="/assets/favicons/apple-touch-icon-72x72.png" />
					<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/assets/favicons/apple-touch-icon-144x144.png" />
					<link rel="apple-touch-icon-precomposed" sizes="60x60" href="/assets/favicons/apple-touch-icon-60x60.png" />
					<link rel="apple-touch-icon-precomposed" sizes="120x120" href="/assets/favicons/apple-touch-icon-120x120.png" />
					<link rel="apple-touch-icon-precomposed" sizes="76x76" href="/assets/favicons/apple-touch-icon-76x76.png" />
					<link rel="apple-touch-icon-precomposed" sizes="152x152" href="/assets/favicons/apple-touch-icon-152x152.png" />
					<link rel="icon" type="image/png" href="/assets/favicons/favicon-196x196.png" sizes="196x196" />
					<link rel="icon" type="image/png" href="/assets/favicons/favicon-96x96.png" sizes="96x96" />
					<link rel="icon" type="image/png" href="/assets/favicons/favicon-32x32.png" sizes="32x32" />
					<link rel="icon" type="image/png" href="/assets/favicons/favicon-16x16.png" sizes="16x16" />
					<link rel="icon" type="image/png" href="/assets/favicons/favicon-128.png" sizes="128x128" />
					<meta name="application-name" content="&nbsp;"/>
					<meta name="msapplication-TileColor" content="#FFFFFF" />
					<meta name="msapplication-TileImage" content="/assets/favicons/mstile-144x144.png" />
					<meta name="msapplication-square70x70logo" content="/assets/favicons/mstile-70x70.png" />
					<meta name="msapplication-square150x150logo" content="/assets/favicons/mstile-150x150.png" />
					<meta name="msapplication-wide310x150logo" content="/assets/favicons/mstile-310x150.png" />
					<meta name="msapplication-square310x310logo" content="/assets/favicons/mstile-310x310.png" />

					<link rel="preconnect" href="https://fonts.googleapis.com"/>
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
					<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Noto+Serif+TC:wght@900&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
				</Head>
				<body>
					<Main />
					<NextScript />
					<noscript
						dangerouslySetInnerHTML={{
						__html: `<iframe src=https://www.googletagmanager.com/ns.html?id=GTM-PV785MR height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
						}}
					/>
				</body>
			</Html>
		)
	}
}

export default MyDocument