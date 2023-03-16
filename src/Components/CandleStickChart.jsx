import React, { useEffect, useState } from 'react';
import { IgrFinancialChart, IgrFinancialChartModule } from 'igniteui-react-charts';
import { useDispatch, useSelector } from 'react-redux';
import {  getCandleStickData } from '../Redux/OHCLDATA/action';


IgrFinancialChartModule.register();
const oneMinTimeFrame = '1m'
const timeFrames = ['1m', '30m','1h','6h','12h','1D','1W', '1M']

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

    return (
        <div >

            <div className='candlestick-timeframe-container'>

                <select  onChange={handleTimeFrameChange} value={timeFrame} >

                    {timeFrames?.map(time=><option key={time} value={time}>{time}</option>)}

                   
                </select>
            </div>
            <div className='container'>

                <IgrFinancialChart
                    width="100%"
                    height="100%"
                    isToolbarVisible={false}
                    chartType="Candle"
                    titleAlignment="Left"
                    titleLeftMargin="25"
                    titleTopMargin="10"
                    titleBottomMargin="10"
                    subtitleAlignment="Left"
                    subtitleLeftMargin="25"
                    subtitleTopMargin="5"
                    subtitleBottomMargin="10"
                    yAxisLabelLocation="OutsideLeft"
                    yAxisMode="Numeric"
                    yAxisTitleLeftMargin="10"
                    yAxisTitleRightMargin="5"
                    yAxisLabelLeftMargin="0"
                    zoomSliderType="None"
                    dataSource={OHLC}            
                />
            </div>
        </div>
    );
};

export default CandleStickChart;