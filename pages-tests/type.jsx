import Head from 'next/head'

import { Button } from '../fuselage/components/button/button'

export default function Type() {

	return (
		<>
			<Head>
				<title>AAX</title>
				<meta name="description" content="AAX blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

		
			<img className='w-100pc mb-xs' src="https://picsum.photos/1920/1080" alt="" />
			<p>Author credit</p>

			<p className="h fs-0 serif c-primary">Main content</p>
			<p className='h2'>Heading</p>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae in doloremque harum ipsa non, distinctio repudiandae libero fuga quis explicabo porro nesciunt soluta eius adipisci quam reprehenderit. Nemo, vero eos!</p>

			<p className='mt-sm'><Button href='#'>Primary Call to Action</Button></p>
			<p className='mt-sm'><Button href='#' outline>Secondary Call to Action</Button></p>

			<div className="formatted mt-lg">
				
				<h1 className="fs-1 sans h">Heading fs-1</h1>
				<p>Arcu felis bibendum ut tristique et. Vitae congue mauris rhoncus aenean vel. Integer feugiat scelerisque varius.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum deserunt, magnam nam dignissimos aperiam dolores, nihil reprehenderit aliquid culpa nesciunt ducimus ea ratione omnis veniam eos laboriosam corrupti explicabo delectus.</p>
				
				<h2 className="fs-2 sans h">Heading fs-2</h2>
				<p>Duis at tellus at urna condimentum mattis pellentesque. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Sapien faucibus et molestie ac feugiat sed lectus. Mattis enim ut tellus elementum sagittis vitae et. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Consequat interdum varius sit amet mattis.</p>
				
				<h3 className="fs-3 sans h">Heading fs-3</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel facilisis volutpat est velit egestas dui id. Tempor orci eu lobortis elementum nibh tellus molestie nunc.</p> 
				
				<h4 className="fs-4 sans h">Heading fs-4</h4>
				<p>Arcu felis bibendum ut tristique et. Vitae congue mauris rhoncus aenean vel. Integer feugiat scelerisque varius.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum deserunt, magnam nam dignissimos aperiam dolores, nihil reprehenderit aliquid culpa nesciunt ducimus ea ratione omnis veniam eos laboriosam corrupti explicabo delectus.</p>
				
				<h5 className="fs-5 sans h">Heading fs-5</h5>
				<p>Duis at tellus at urna condimentum mattis pellentesque. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Sapien faucibus et molestie ac feugiat sed lectus. Mattis enim ut tellus elementum sagittis vitae et. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Consequat interdum varius sit amet mattis.</p>
				
				<h6 className="fs-6 sans h">Heading fs-6</h6>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel facilisis volutpat est velit egestas dui id. Tempor orci eu lobortis elementum nibh tellus molestie nunc.</p> 
				
				
			</div>



			<div className="formatted mt-lg">

				<p className="fs-xs c-accent">fs-xs:</p>
				<p className="fs-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>
				
				<p className="fs-xs c-accent">fs-sm:</p>
				<p className="fs-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>
				
				<p className="fs-xs c-accent">fs-default:</p>
				<p className="fs-base">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>
				
				<p className="fs-xs c-accent">fs-6:</p>
				<p className="fs-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>
				
				<p className="fs-xs c-accent">fs-5:</p>
				<p className="fs-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>
				
				<p className="fs-xs c-accent">fs-4:</p>
				<p className="fs-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>
				
				<p className="fs-xs c-accent">fs-3:</p>
				<p className="fs-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>
				
				<p className="fs-xs c-accent">fs-2:</p>
				<p className="fs-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>
				
				<p className="fs-xs c-accent">fs-1:</p>
				<p className="fs-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>
				
				<p className="fs-xs c-accent">fs-0:</p>
				<p className="fs-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptatem dolorem beatae ratione excepturi facere earum? Deserunt commodi, labore saepe praesentium consectetur eligendi sed, illum quae, maxime sapiente a delectus!</p>

			</div>

		</>
	)
}
