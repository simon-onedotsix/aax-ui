import { CryptoChart } from "../fuselage/components/crypto-chart/crypto-chart"

export default function Chart () {

    return (
        <div className="columns-3 gap-sm">

            <CryptoChart currency='Bitcoin'/>
            <CryptoChart currency='Ethereum'/>
            <CryptoChart currency='Binance Coin'/>
            <CryptoChart currency='Cardano'/>

        </div>
    )
}