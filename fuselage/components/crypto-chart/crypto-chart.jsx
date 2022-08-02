import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

import CSS from './crypto-chart.module.css'

// API_KEY: 3b98fc55-b5ab-4aee-9f26-eeb4f46a41b5
// 864000000 ms = 10 days
// 86400000 ms = 1 days

export const CryptoChart = ({ currency, code }) => {

    const [ currentValue, setCurrentValue ] = useState(21086.911725760347)
    const [ shift, setShift ] = useState(0)
    const [ coinData, setCoinData ] = useState([ {uv: 0}, {uv: 0}, {uv: 0}, {uv: 0}, {uv: 0}, {uv: 0}, {uv: 0}, {uv: 0}, {uv: 0}, {uv: 0} ])

    useEffect( () => {

        const fetchData = async ( code ) => {
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

            // console.log('data:',chartLiveData)

            // current value

            setCurrentValue(chartLiveData.history[95].rate)

            // % change over 24hrs

            let nowValue = chartLiveData.history[history.length].rate
            let oldValue = chartLiveData.history[0].rate
            let difference = nowValue - oldValue
            let change = difference / nowValue * 100
            setShift(change.toFixed(2))

            // chartLiveData.history.map( (snapshot, index) => console.log(`${code}[${index}]: ${formatDate(snapshot.date)} - rate: ${formatPrice(snapshot.rate)}`))
            
            // chartLiveData.history.map( (snapshot, index) => console.log(`${code}[${index}]: ${formatDate(snapshot.date)} - rate: ${snapshot.rate}`))
            

            //rates

            const rates = [ 
                {uv: chartLiveData.history[0].rate}, 
                {uv: chartLiveData.history[parseInt(history.length * 0.1)].rate}, 
                {uv: chartLiveData.history[parseInt(history.length * 0.2)].rate}, 
                {uv: chartLiveData.history[parseInt(history.length * 0.3)].rate}, 
                {uv: chartLiveData.history[parseInt(history.length * 0.4)].rate}, 
                {uv: chartLiveData.history[parseInt(history.length * 0.5)].rate}, 
                {uv: chartLiveData.history[parseInt(history.length * 0.6)].rate}, 
                {uv: chartLiveData.history[parseInt(history.length * 0.7)].rate}, 
                {uv: chartLiveData.history[parseInt(history.length * 0.8)].rate}, 
                {uv: chartLiveData.history[parseInt(history.length * 0.9)].rate}, 
                {uv: chartLiveData.history[history.length].rate} 
            ]
            setCoinData(rates)
        }

        class CoinSnapshot {
            constructor( rate ) {
                this.uv = rate
            }
        }

        fetchData(code)

    }, [])


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



    return (

        <div className={CSS.layout}>
            <div className={CSS.currency}>
                <p className='fw-600 fs-sm'>{ currency }</p>
                <p className={`${CSS.handle} fw-400 fs-xs c-medium`}>{ code } (24hr)</p>
            </div>

            <div className={CSS.chart}>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={coinData}>
                        <Line type="linear" dot={false} strokeWidth={2} dataKey="uv" stroke="var(--primary)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className={CSS.values}>
                <p className='fw-600 fs-sm'>{ formatPrice(currentValue) }</p>
                <p className={`fw-600 fs-xs ${ shift >= 0 ? "c-positive" : "c-negative"}`}>{ shift >= 0 ? "+" : ""}{ shift }%</p>
            </div>
        </div>
    )
}