import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getCandleStickData } from '../Redux/OHCLDATA/action';
import Chart from 'react-apexcharts';

const oneMinTimeFrame = '1m'
const timeFrames = ['1m', '30m','1h','6h','12h','1D','1W', '1M']




const CandleStickChart = () => {

    const mouseMoveEvent = (event, chartContext,config)=>{
        console.log('move')
        console.log(event, chartContext)
        console.log(config,'config')


    }

    const options = {
        chart: {
            type: 'candlestick',
            id:'candles',
            events:{
                dataPointMouseEnter:mouseMoveEvent
            },
            toolbar: {
                autoSelected: 'pan',
                show: false
            },
            zoom: {
                enabled: true
            }
        },
    
        xaxis:{
            type:'datetime',
            datetimeUTC: true,
            datetimeFormatter: {
                year: 'yyyy',
                month: 'MMM \'yy',
                day: 'dd MMM',
                hour: 'HH:mm',
            },
    
            axisBorder: {
                show: true,
                color: '#78909C',
                height: 1,
                width: '100%',
                offsetX: 0,
                offsetY: 0
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#78909C',
                height: 6,
                offsetX: 0,
                offsetY: 0
            },
        },
        yaxis:{
            show:true,
            
        },
    
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#00B746',
                    downward: '#EF403C'
                },
                wick: {
                    useFillColor: true
                }
            }
        }}

    const [timeFrame,setTimeFrame] = useState('')
    const {OHLC} = useSelector(state=>state.ohlc);

    const dispatch = useDispatch();

    const handleTimeFrameChange = (e) => {
        setTimeFrame(e.target.value)
        dispatch(getCandleStickData(e.target.value)) 
        
    }

    useEffect(()=>{
        setTimeFrame(oneMinTimeFrame)
        dispatch(getCandleStickData(oneMinTimeFrame));
    },[])

    // useEffect(()=>{
    //     console.log(OHLC)
    // },[OHLC])

   

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
                    series={[{data:OHLC}]}
                    type='candlestick'
                    width='1000' 
                    height='500'
                />
            </div>
        </div>
    );
};

export default CandleStickChart;