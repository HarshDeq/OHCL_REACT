import React, { useEffect, useState } from 'react'
import CandleStickChart from '../Components/CandleStickChart'
import Select from '../Components/Select'
import { getRequest } from '../utils/axios'


const TIME_FRAMES = ['1m', '30m','1h','6h','12h','1D','1W', '1M']


const BASE_URL  = 'https://api-pub.bitfinex.com/v2/'


const OHLC = () => {

    const [timeFrame, setTimeFrame] = useState('1m')
    const [ohlcCharData, setOhlcChartData] = useState([])
    const [ohlc,setOHLC] = useState({
        O:0,H:0,L:0,C:0
    })

    const handleTimeFrameChange =e=>{
        setTimeFrame(e.target.value)
    }

    const getOHLCData = ()=>{
       
        const response = getRequest(`${BASE_URL}/candles/trade%3A${timeFrame}%3AtBTCUSD/hist?limit=75`)

        response.then(res=>{
          
            const CONSTANTINDEX = {
                date:0,
                O:1,
                H:3,
                L:4,
                C:2
            }

            const formatedData = res?.data?.map(data=>{
                return {
                    x:new Date(data[CONSTANTINDEX?.date]),
                    y:[data[CONSTANTINDEX?.O],
                        data[CONSTANTINDEX?.H],
                        data[CONSTANTINDEX?.L],
                        data[CONSTANTINDEX?.C],]
                    
                };
            });

            setOhlcChartData(formatedData)


            const LAST_INDEX_OF_FORMATED_DATA = formatedData?.length-1

            const LAST_ARR = formatedData[LAST_INDEX_OF_FORMATED_DATA].y

            setOHLC({O:LAST_ARR[0],H:LAST_ARR[1],L:LAST_ARR[2],C:LAST_ARR[3]})

        })
    }

    const mouseMove = ()=>{
        const PARENT_CLASS = 'apexcharts-tooltip-candlestick'

        const allChildElements = document.getElementsByClassName(PARENT_CLASS)[0].childNodes
        
        const OHLCData = []
        allChildElements?.forEach(ele=>{
            OHLCData.push(

                ele.childNodes[1].innerHTML
            )
        })
        
       
        setOHLC({O:OHLCData[0],H:OHLCData[1],L:OHLCData[2],C:OHLCData[3]})
    }

    useEffect(()=>{

        getOHLCData()

    },[timeFrame])

    return (
        <div >
            <div className='candlestick-timeframe-container'>
                <Select value = {timeFrame} options = {TIME_FRAMES} onChange = {handleTimeFrameChange} />
            </div>
            <div className={`display-flex red ${ohlc?.O >= ohlc?.C ? 'red':'green'}`}>
                <div><span>O :</span><span>{ohlc?.O}</span></div>
                <div><span>H :</span><span>{ohlc?.H}</span></div>
                <div><span>L :</span><span>{ohlc?.L}</span></div>
                <div><span>C :</span><span>{ohlc?.C}</span></div>
            </div>

            {ohlcCharData?.length> 0&&  <CandleStickChart data = {ohlcCharData}  mouseEvents ={{mouseMove}} />}


        </div>
    )
}

export default OHLC