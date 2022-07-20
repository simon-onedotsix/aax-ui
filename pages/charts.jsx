import { format } from 'date-fns'

import {useTranslations} from 'next-intl'

import { CryptoChart } from '../fuselage/components/crypto-chart/crypto-chart'

export default function ChartPage ({ chartData }) {

    // API_KEY: 3b98fc55-b5ab-4aee-9f26-eeb4f46a41b5

    const t = useTranslations('Global')



    const formatPrice = (num) => {
        let dollars = new Intl.NumberFormat(`en-US`, {
            currency: `USD`,
            style: 'currency',
        }).format(num)
        return dollars
    }

    const formatDate = (timestamp) => {
        let date = new Date(timestamp)
        console.log('coverted date:', date.getFullYear())
        return format(new Date(date), 'hh:mm – dd MMM yyyy')
    }

    console.log(formatDate(chartData.history[0].date))
    console.log(new Date(chartData.history[1].date))


    return (
        <>

            {
                chartData.history.map( (snapshot, index) => <p key={index}>{formatDate(snapshot.date)} = {formatPrice(snapshot.rate)}</p>)
            }

            <p className='mt-md mb-sm fw-600 fs-5'>Charts</p>

            <CryptoChart 
                currency='Bitcoin'
                handle='BTC (24hr)' 
                value={0.00004999}
                shift={-0.55}
                data={ [
                    {uv: 300}, 
                    {uv: 200},
                    {uv: 450},
                    {uv: 400}, 
                    {uv: 420},
                    {uv: 450},
                    {uv: 250},
                    {uv: 230},
                    {uv: 120}, 
                    {uv: 200},
                ]}
            />
            
        </>
    )
}

export async function getStaticProps({locale}) {

    // fix for not being able to query cms for language (convert indonesian)
    let siteHandle
    locale === 'id' ? siteHandle = 'in' : siteHandle = locale


    const chartDataReq = await fetch(new Request("https://api.livecoinwatch.com/coins/single/history"), {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
            "x-api-key": "3b98fc55-b5ab-4aee-9f26-eeb4f46a41b5",
        }),
        body: JSON.stringify({
            currency: "USD",
            code: "BTC",
            start: 1617035100000,
            end: 1617035800000,
            meta: true,
        }),
    })
    const chartData = await chartDataReq.json()
    console.log('hello!', chartDataReq)


    return {
        props: {
            messages: (await import(`../translations/${locale}.json`)).default,
            chartData
        }
    }
}