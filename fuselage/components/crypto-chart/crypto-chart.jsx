import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

import CSS from './crypto-chart.module.css'



export const CryptoChart = ({ currency, code }) => {

    const [ currentValue, setCurrentValue ] = useState()
    const [ shift, setShift ] = useState()
    const [ coinData, setCoinData ] = useState()

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
                    start: Date.now() - 86400000,
                    end: Date.now(),
                    meta: true,
                }),
            })
            
            const chartLiveData = await chartLiveDataReq.json()

            console.log('chartLiveData:', chartLiveData)


            // current value

            if ( chartLiveData.history ) {

                setCurrentValue(chartLiveData.history[chartLiveData.history.length - 1].rate)
    
    
                // % change over 24hrs
    
                let nowValue = chartLiveData.history[history.length].rate
                let oldValue = chartLiveData.history[0].rate
                let difference = nowValue - oldValue
                let change = difference / nowValue * 100
                setShift(change.toFixed(2))
    
                // chartLiveData.history.map( (snapshot, index) => console.log(`${code}[${index}]: ${formatDate(snapshot.date)} - rate: ${formatPrice(snapshot.rate)}`))
                // chartLiveData.history.map( (snapshot, index) => console.log(`${code}[${index}]: ${formatDate(snapshot.date)} - rate: ${snapshot.rate}`))
                
    
                
                // search data for min+max values
                
                let maxRate = Math.max.apply(Math, chartLiveData.history.map( snapshot => snapshot.rate))
                let minRate = Math.min.apply(Math, chartLiveData.history.map( snapshot => snapshot.rate))
                
                // console.log('maxRate:', maxRate)
                // console.log('minRate:', minRate)
                
                // interpolate
    
                let interpolatedRates = []
    
                chartLiveData.history.map( snapshot => {
                    let val = (( snapshot.rate - minRate ) * 100 / ( maxRate - minRate ))
                    let obj = new Object()
                    obj.uv = val
                    interpolatedRates.push(obj)
                })
    
                // console.log('interpolatedRates:', interpolatedRates)
    
                setCoinData(interpolatedRates)
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

    if ( currentValue && shift ) return (

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

    return <></>
}