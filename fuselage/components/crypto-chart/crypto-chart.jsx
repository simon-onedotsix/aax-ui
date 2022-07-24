import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

import CSS from './crypto-chart.module.css'

export const CryptoChart = ({ currency, code }) => {

    const [ currentValue, setCurrentValue ] = useState(21086.911725760347)
    const [ shift, setShift ] = useState(0)
    const [ coinData, setCoinData ] = useState([ {uv: 300}, {uv: 200}, {uv: 450}, {uv: 400}, {uv: 420}, {uv: 450}, {uv: 250}, {uv: 230}, {uv: 120}, {uv: 200} ])

    useEffect( () => {

        const fetchData = async ( code ) => {
            // const chartLiveDataReq = await fetch(new Request("https://api.livecoinwatch.com/coins/single/history"), {
            //     method: "POST",
            //     headers: new Headers({
            //         "content-type": "application/json",
            //         "x-api-key": "3b98fc55-b5ab-4aee-9f26-eeb4f46a41b5",
            //     }),
            //     body: JSON.stringify({
            //         currency: "USD",
            //         code: code,
            //         start: Date.now() - 864000000,
            //         end: Date.now(),
            //         meta: true,
            //     }),
            // })
            
            // const chartLiveData = await chartLiveDataReq.json()



            // current value

            // setCurrentValue(chartLiveData.history[99].rate)

            // % change over 24hrs

            // let nowValue = chartLiveData.history[99].rate
            // let oldValue = chartLiveData.history[89].rate
            // let difference = nowValue - oldValue
            // let change = difference / nowValue * 100
            // setShift(change.toFixed(2))

            // chartLiveData.history.map( (snapshot, index) => console.log(`${code}[${index}]: ${formatDate(snapshot.date)} - rate: ${formatPrice(snapshot.rate)}`))
            

            //rates

            // const rates = []

            // for ( let i = 0; i <= 99; i+=10 ) {
            //     console.log(`value[${ code }]:`, chartLiveData.history[i].rate)

            //     const coinSnapshot = new CoinSnapshot( 
            //         chartLiveData.history[i].rate
            //     )
            //     rates.push( coinSnapshot )
            // }

            // console.log('RATES:', rates)
            // setCoinData(rates)
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