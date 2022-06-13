import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../fuselage/components/button/button'
import { FeatureArticle, FeatureArticleHero } from '../fuselage/components/feature-article-card/feature-article-card'
import { ArticleCard } from '../fuselage/components/article-card/article-card'
import { ArticleCategories } from '../fuselage/components/article-categories/article-categories'
import { ArticleMeta } from '../fuselage/components/article-meta/article-meta'
import { ButtonSocial } from '../fuselage/components/button-social/button-social'
import { AuthorCredit } from '../fuselage/components/author-credit/author-credit'

export default function Home() {

	return (
		<>
			<Head>
				<title>AAX</title>
				<meta name="description" content="AAX blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

		
			{/* main article */}

			{/* <FeatureArticle 
				title='Top 5 GameFi Projects to Know in 2022'
				heroUrl='/assets/img/Explainers-Top-5-GameFi-tokens-to-know-in-2022.jpg'
				excerpt='It&apos;s too soon to tell whether we are entering another crypto winter of prolonged depressive prices and waning interest, or if the sell-off that began in November 2021 is over. It seems most people expect the cold to set in, and everyone is preparing accordingly - both mentally and financially.'
				categories={[{title: 'Features'}, {title: 'Markets'}]}
				author='Forename Surname' 
				date='Nov 12, 2021'
			/> */}


			<section>
				<p className='h fs-0 serif lh-2 maxw-55 pb-xs'>Top 5 GameFi Projects to Know in 2022</p>

				<FeatureArticleHero heroUrl='/assets/img/Explainers-Top-5-GameFi-tokens-to-know-in-2022.jpg' />

				<div className="flex jc-between mt-xs">
					<ArticleCategories categories={[{title: 'Explainers'}, {title: 'Markets'}]} />
					<ArticleMeta author='Forename Surname' date='Nov 12, 2021'/>
				</div>
				
				<p className='fs-5 fw-500 maxw-55 mt-sm'>It&apos;s too soon to tell whether we are entering another crypto winter of prolonged depressive prices and waning interest, or if the sell-off that began in November 2021 is over. It seems most people expect the cold to set in, and everyone is preparing accordingly - both mentally and financially.</p>
			</section>



			<section className="mt-lg">
				<p className="fw-500 caps ls-2 c-primary pb-xs">Table of contents</p>
				<ul className='tableOfContents'>
					<li><Link href='#decentraland'><a>Decentraland (MANA)</a></Link></li>
					<li><Link href='#sandbox'><a>The Sandbox (SAND)</a></Link></li>
					<li><Link href='#axie'><a>Axie Infinity (AXS)</a></Link></li>
					<li><Link href='#enjin'><a>Enjin Coin</a></Link></li>
					<li><Link href='#gala'><a>Gala</a></Link></li>
					<li><Link href='#investing'><a>Investing in GameFi tokens and projects</a></Link></li>
				</ul>
			</section>



			<section className="mt-lg maxw-55 formatted">
				<p>The last crypto winter lasted about 2 years, from around 2018 to early 2020. One of the key catalysts that reignited the fire and kicked off the following bull market was the DeFi boom and the top projects that came with it. Most of the top-tier decentralized applications and best projects that represent the majority of DeFi&apos;s total value locked (TVL) today were in fact being built by truly dedicated teams during that winter. Bear markets are indeed the best time for putting your head down and building relentlessly.</p>
				<p>If the cycle we are in now turns out to be another crypto winter, will DeFi again be the catalyst that sets off the next bull market? While we do expect more innovation and development in the DeFi space over the coming years, broader interest and hype seem to focus on Web3 and the metaverse. Most of the top projects still under development today are focusing on Web3 and the metaverse, and despite market downturns, many organizations and mainstream cultural icons remain dedicated to contributing to this space.</p>
				<p>One of the most promising subsectors is GameFi, which refers to play-to-earn blockchain games that offer economic incentives to players. Typically, players can earn cryptocurrency and NFT rewards by completing tasks, battling other players, and progressing through different game levels. Most of the top GameFi projects have their own utility tokens, which can be used for a variety of features within the game such as buying in-game NFT assets. The tokens within these top GameFi projects can also be traded freely on open crypto markets.</p>
				<p>The top 5 Gamefi projects by market cap are Decentraland (MANA), The Sandbox Game (SAND), Axie Infinity (AXS), Enjin Coin (ENJ), and Gala (GALA).</p>
				
				<h2 id='decentraland'>Decentraland (MANA)</h2>
				<p><a href='https://academy.aax.com/en/decentraland-and-mana-explained/'>Decentraland</a>, one of the top GameFi projects, was launched following a $24 million initial coin offering (ICO) that was conducted in 2017. The virtual world launched its closed beta in 2019 and opened to the public in February 2020. Since then, users have created a wide range of experiences on their parcels of LAND, including interactive games, sprawling 3D scenes and a variety of other interactive experiences.</p>
				<p>Decentraland uses two tokens: MANA and LAND. MANA is an ERC-20 token that must be burned to acquire non-fungible ERC-721 LAND tokens. MANA tokens can also be used to pay for a range of avatars, skins, names, and more on the Decentraland marketplace.</p>
				<p>The map is organized in a neat 300x300 grid of about 90,000 units of land, or “parcels.” Some points of interest users have built include Crypto Valley for conferences -used during Consensus: Distributed-, a human-sized chess board, a venue for live streaming recently used for a Space-X launch, Dragon City, a night club with live-streaming music, a casino for gambling with crypto, and more.</p>

				<h2 id='sandbox'>The Sandbox (SAND)</h2>
				<p>Launched in 2011 by Pixowl, <a href='https://academy.aax.com/en/sandbox-sand-explained-create-nfts-build-blocks-cultivate-your-land/'>The Sandbox</a>, another one of the top GameFi projects, is a blockchain-based virtual world allowing users to create, build, buy, and sell digital assets in the form of a game. By combining the powers of decentralized autonomous organizations (DAO) and non-fungible tokens (NFTs), the Sandbox creates a decentralized platform for a thriving gaming community.</p>
				<p>This is one of several top GameFi projects that has secured a number of prominent partnerships with huge brands and celebrity names like Atari, SCMP, Snoop Dogg, The Walking Dead, GameFi Ventures, and many more. During the Alpha Release in late 2021, a selection of 200K players were granted early access to roam the Sandbox metaverse. The overall experience was reported to be highly positive, with invitees playing a total of 150K hours cumulatively.</p>
				<p>The Sanbox has its own utility token SAND. SAND can be used throughout the whole Sandbox ecosystem for transactions and interactions. There is a limited supply of 3 billion SAND. A way to invest in the GameFi project Sandbox, which is at the forefront of innovation relating to the metaverse, is through its native token.</p>
				<p>SAND is currently trading at $1.38 at the time of writing, up 8% in the last 24 hours. You can invest in it through <a href='https://www.aax.com/en-US/'>AAX</a>.</p>

				<h2 id='axie'>Axie Infinity (AXS)</h2>
				<p>Next on the list of top GameFi projects is <a href='https://academy.aax.com/en/axies-and-axs-explained/'>Axie Infinity</a>. It is a blockchain-based trading and battling game. Inspired by popular games like Pokémon and Tamagotchi, Axie Infinity allows players to collect, breed, raise, battle and trade token-based creatures known as Axies.</p>
				<p>These Axies can take various forms, and there are more than 500 different body parts available, including aquatic, beast, bird, bug, plant and reptile parts. Parts from each type class come in four different rarity scales: common, rare, ultra rare, and legendary — and Axies can have any combination of body parts, making them highly variable and often rare and unique. </p>
				<p>Axie Infinity Shards(AXS) are an ERC-20 governance token for the Axie Universe. The project&apos;s goal with AXS tokens is to align the incentives between the players of the game and the developers in exciting ways, such as rewarding players for interacting with Axie Infinity. Simultaneously, they need to be incentivized to hold on to their tokens so they can claim additional rewards.</p>

				<h2 id='enjin'>Enjin Coin</h2>
				<p><a href='https://academy.aax.com/en/enjin-enj-explained-supercharging-video-games-with-nfts'>Enjin</a> is not a specific GameFi application, but rather an ecosystem-wide solution. This top GameFi project aims to provide a solution to some of the video gaming industry&apos;s issues. One of them is related to the fact that the ecosystems of individual games are separate from the others. </p>
				<p>Since most publishers allow players to buy in-game assets exclusively from official stores with set prices, users can&apos;t sell what they bought or rightfully earned while playing a video game. For that reason, unauthorized secondary gray markets have been created for trading in-game assets - often for a fraction of the publishers&apos; costs -, which could take away as much as 40% of the developers&apos; revenue.</p>
				<p>This GameFi project, Enjin, seeks to solve the above issues by tokenizing in-game assets and infusing them with the project&apos;s native ENJ token. After injecting them with ENJ, the items are automatically converted into ERC-1155 tokens, an Ethereum-based token standard allowing creators to issue both fungible and NFT tokens via a single smart contract. With an extensive ecosystem, Enjin has introduced innovative blockchain solutions to gamers by tokenizing in-game assets and bringing NFTs to the fast-growing video gaming industry.</p>
				<p>Interestingly, Enjin is one of the select top GameFi projects that features partnerships with multiple prominent tech companies, such as Samsung, Microsoft, and Ubisoft. To being trading Enjin today, head over to <a href='https://www.aax.com/en-US/'>AAX</a>.</p>

				<h2 id='gala'>Gala</h2>
				<p><a href='https://academy.aax.com/en/gala-games-gala-explained/'>Gala Games</a> is one of few top GameFi projects that aims to take the gaming industry in a different direction by giving players control over their games. This company identifies itself with a “fun first” goal and creates its games with easy mechanics. You don&apos;t even need to have blockchain knowledge to play. It also continuously engages with its community of users who are part of the game development.</p>
				<p>Players can own non-fungible tokens (NFTs) and influence the governance of games within the Gala Games ecosystem. The Founder&apos;s Nodes voting mechanism allows players to influence what games Gala should develop and what games should get funding. Besides buying NFTs for specific games, Gala Games also utilizes GALA - its own utility token. So far, the Gala Games project has released one playable game Town Star and an NFT collectible series VOX. It plans to release more games in the future, such as a fantasy RPG game, a sci-fi strategy game and a tower defense game.</p>

				<h2 id='investing'>Investing in GameFi tokens and projects</h2>
				<p>Decentraland, The Sandbox, Axie Infinity, Enjin, and Gala are top projects that have been at the forefront of GameFi innovation. Their native tokens are the backbones of their ecosystems and serve in facilitating interactions on those gaming platforms. With the budding potential of Web 3 and the metaverse, these tokens have a very promising future as they have utility attached to them. Additionally, many GameFi projects have begun entering the metaverse as a strategic business move, leveraging platforms like The Sandbox.</p>

				<p>To begin trading MANA, SAND, AXIE, Enjoin Coin, and GALA, head over to <a href='https://www.aax.com/en-US/'>AAX</a> today. Alternatively, you can also opt for a competitive APY through AAX&apos;s Savings feature.</p>
			</section>


			<section className='mt-md'>
				<p className='fw-500 mb-xs'>Share this article</p>
			
				<ButtonSocial icon='facebook'/>
				<ButtonSocial icon='twitter'/>
				<ButtonSocial icon='linkedin'/>
			</section>

			
			{/* <AuthorCredit></AuthorCredit> */}



			{/* related */}
			
			<section className="mt-lg mb-md">
				<p className="h fs-1 serif c-primary">Related Articles</p>

				<div className="columns-3 gap-sm mt-sm">
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='AAX Announces Listing of MOLA Token with Prize Pool of 13 Million MOLA'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
						author='James Herbert'
						date='Oct 18, 2021'
					/>
					<ArticleCard
						href='/'
						image='https://picsum.photos/1920/1080'
						title='Damn! Doze shares just got expensive, doh'
						excerpt='Repellendus eius molestias modi consectetur soluta eveniet doloremque commodi quas mollitia pariatur?'
					/>
				</div>

			</section>
		

		</>
	)
}
