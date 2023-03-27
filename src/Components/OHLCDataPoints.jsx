import React from 'react'

const OHLCDataPoints = (props) => {
    const {ohlcPoints} = props

    return (
        <div
            className={`display-flex ${ohlcPoints?.O > ohlcPoints?.C ? 'red' : 'green'} `}
        >
            <div className='OHLC-datapoints'>
                <span>O :&nbsp;</span>
                <span>{ohlcPoints?.O}</span>
            </div>
            <div className='OHLC-datapoints'>
                <span>H :&nbsp;</span>
                <span>{ohlcPoints?.H}</span>
            </div>
            <div className='OHLC-datapoints'>
                <span>L :&nbsp;</span>
                <span>{ohlcPoints?.L}</span>
            </div>
            <div className='OHLC-datapoints'>
                <span>C :&nbsp;</span>
                <span>{ohlcPoints?.C}</span>
            </div>
        </div>
    )
}

export default OHLCDataPoints