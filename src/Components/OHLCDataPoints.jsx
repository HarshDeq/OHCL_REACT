import React from 'react'

const OHLCDataPoints = (props) => {
    const {ohlcPoint} = props

    return (
        <div
            className={`display-flex ${ohlcPoint.o > ohlcPoint.c ? 'red' : 'green'} `}
        >
            <div className='OHLC-datapoints'>
                <span>O :&nbsp;</span>
                <span>{ohlcPoint.o}</span>
            </div>
            <div className='OHLC-datapoints'>
                <span>H :&nbsp;</span>
                <span>{ohlcPoint.h}</span>
            </div>
            <div className='OHLC-datapoints'>
                <span>L :&nbsp;</span>
                <span>{ohlcPoint.l}</span>
            </div>
            <div className='OHLC-datapoints'>
                <span>C :&nbsp;</span>
                <span>{ohlcPoint.c}</span>
            </div>
        </div>
    )
}

export default OHLCDataPoints