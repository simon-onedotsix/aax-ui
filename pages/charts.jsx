import { useEffect, useState } from 'react'

import { format } from 'date-fns'

import {useTranslations} from 'next-intl'

import { CryptoChart } from '../fuselage/components/crypto-chart/crypto-chart'

export default function ChartPage () {

    const t = useTranslations('Global')
    
    // API_KEY: 3b98fc55-b5ab-4aee-9f26-eeb4f46a41b5
    // 864000000 ms = 10 days
    

    const coins = [{title: "Bitcoin", code: "BTC"}, {title: "Ethereum", code: "ETH"}, {title: "ExtremeZ", code: "XTZ"}]

    const [ cryptoData, setCryptoData ] = useState([])

    useEffect( () => {

        const fetchData = async ( code, title ) => {
            const chartLiveDataReq = await fetch(new Request("https://api.livecoinwatch.com/coins/single/history"), {
                method: "POST",
                headers: new Headers({
                    "content-type": "application/json",
                    "x-api-key": "3b98fc55-b5ab-4aee-9f26-eeb4f46a41b5",
                }),
                body: JSON.stringify({
                    currency: "USD",
                    code: code,
                    start: Date.now() - 864000000,
                    end: Date.now(),
                    meta: true,
                }),
            })
            
            const chartLiveData = await chartLiveDataReq.json()

            // console.log(`history [${code}]:`, chartLiveData.history)

            // console.log('--------------------------------')
            // console.log('COIN:', title)
            // console.log('code:', code)
            // console.log('currrent value:', formatPrice(chartLiveData.history[99].rate))

            let nowValue = chartLiveData.history[99].rate
            let oldValue = chartLiveData.history[89].rate
            let difference = nowValue - oldValue
            let change = difference / nowValue * 100
            // console.log('change (24hrs):', change.toFixed(2) + '%')

            // chartLiveData.history.map( (snapshot, index) => console.log(`${code}[${index}]: ${formatDate(snapshot.date)} - rate: ${formatPrice(snapshot.rate)}`))
        }

        coins.forEach( currency => fetchData(currency.code, currency.title) )
        
        
    })


    const formatPrice = (num) => {
        let dollars = new Intl.NumberFormat(`en-US`, {
            currency: `USD`,
            style: 'currency',
        }).format(num)
        return dollars
    }

    const formatDate = (timestamp) => {
        let date = new Date(timestamp)
        // console.log('coverted date:', date.getFullYear())
        return format(new Date(date), 'hh:mm - dd MMM yyyy')
    }

    // console.log(formatDate(chartData.history[0].date))
    // console.log(new Date(chartData.history[1].date))


    return (
        <>

            {/* {
                chartData.history.map( (snapshot, index) => <p key={index}>{formatDate(snapshot.date)} = {formatPrice(snapshot.rate)}</p>)
            } */}

            <p className='mt-md mb-sm fw-600 fs-5'>Charts</p>

            <CryptoChart 
                currency='Bitcoin'
                code='BTC' 
            />
            
        </>
    )
}

export async function getStaticProps({locale}) {

    return {
        props: {
            messages: (await import(`../translations/${locale}.json`)).default
        }
    }

}