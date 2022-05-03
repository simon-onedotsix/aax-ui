import PropTypes from 'prop-types'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

import CSS from './crypto-chart.module.css'

export const CryptoChart = ({ data, currency, handle, value, shift }) => {

    return (

        <div className={CSS.layout}>
            <div className={CSS.currency}>
                <p className='fw-600 fs-sm'>{ currency }</p>
                <p className='fw-400 fs-xs c-medium'>{ handle }</p>
            </div>

            <div className={CSS.chart}>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={data}>
                        <Line type="linear" dot={false} strokeWidth={2} dataKey="uv" stroke="var(--primary)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className={CSS.values}>
                <p className='fw-600 fs-sm'>{ value }</p>
                <p className='fw-600 fs-xs c-negative'>{ shift }</p>
            </div>
        </div>
    )
}

CryptoChart.propTypes = {
    data: PropTypes.array,
    currency: PropTypes.string, 
    handle: PropTypes.string, 
    value: PropTypes.string,  
    shift: PropTypes.string
}

CryptoChart.defaultProps = {
    data: [
        {name: 'Page A', uv: 400}, 
        {name: 'Page b', uv: 200},
        {name: 'Page b', uv: 450},
        {name: 'Page A', uv: 400}, 
        {name: 'Page b', uv: 420},
        {name: 'Page b', uv: 450},
        {name: 'Page b', uv: 250},
        {name: 'Page b', uv: 230},
        {name: 'Page A', uv: 120}, 
        {name: 'Page b', uv: 200},
        {name: 'Page b', uv: 440},
        {name: 'Page b', uv: 250},
    ],
    currency: 'Binance Coin', 
    handle: 'BTC (24hr)', 
    value: '$43,917.85', 
    shift: '-0.55%'
}