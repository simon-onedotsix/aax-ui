import { LineChart, Line, ResponsiveContainer } from 'recharts'

import CSS from './crypto-chart.module.css'

export const CryptoChart = ({ data, currency, handle, value, shift }) => {

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return (

        <div className={CSS.layout}>
            <div className={CSS.currency}>
                <p className='fw-600 fs-sm'>{ currency }</p>
                <p className={`${CSS.handle} fw-400 fs-xs c-medium`}>{ handle }</p>
            </div>

            <div className={CSS.chart}>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={data}>
                        <Line type="linear" dot={false} strokeWidth={2} dataKey="uv" stroke="var(--primary)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className={CSS.values}>
                <p className='fw-600 fs-sm'>${ formatter.format(1 / value) }</p>
                <p className={`fw-600 fs-xs ${ shift >= 0 ? "c-positive" : "c-negative"}`}>{ shift >= 0 ? "+" : ""}{ shift }%</p>
            </div>
        </div>
    )
}