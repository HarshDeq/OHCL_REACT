import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getCandleStickData } from '../Redux/OHCLDATA/action';
import Chart from 'react-apexcharts';

const oneMinTimeFrame = '1m'
const timeFrames = ['1m', '30m','1h','6h','12h','1D','1W', '1M']
const options = {
    chart: {
        type: 'candlestick',
       
        width:1000,
        id: 'candles',
        toolbar: {
            autoSelected: 'pan',
            show: false
        },
        zoom: {
            enabled: true
        }
    },
    plotOptions: {
        candlestick: {
            wick: {
                useFillColor: true,
            }
        }
    }}



const CandleStickChart = () => {

    const [timeFrame,setTimeFrame] = useState('')

    const dispatch = useDispatch();

    const {OHLC} = useSelector(state=>state.ohlc);


    const handleTimeFrameChange = (e) => {
        setTimeFrame(e.target.value)
        dispatch(getCandleStickData(e.target.value))
        
    }

    useEffect(()=>{
        setTimeFrame(oneMinTimeFrame)
        dispatch(getCandleStickData(oneMinTimeFrame));
    },[])

    useEffect(()=>{
        console.log(OHLC)
    },[OHLC])

    return (
        <div >

            <div className='candlestick-timeframe-container'>

                <select  onChange={handleTimeFrameChange} value={timeFrame} >

                    {timeFrames?.map(time=><option key={time} value={time}>{time}</option>)}

                   
                </select>
            </div>
            <div className='container'>
                <Chart
                    options={options}
                    series={
                        [{
                            data:OHLC
                        }]
                    }
                    type='candlestick'
                    width='1000' 
                    height='500'
                />
            </div>
        </div>
    );
};

export default CandleStickChart;