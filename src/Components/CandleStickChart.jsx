import React, { useEffect } from 'react'
import { IgrFinancialChart, IgrFinancialChartModule } from "igniteui-react-charts";
import { useDispatch, useSelector } from 'react-redux';
import { formatData } from '../Redux/OHCLDATA/action';


IgrFinancialChartModule.register();

const CandleStickChart = () => {


  const dispatch = useDispatch()

  const {OHCL} = useSelector(state=>state.ohcl)

  const socket = new WebSocket(
    "wss://api-pub.bitfinex.com/ws/2"
  );
  useEffect(()=>{

    let ohcl = JSON.stringify({ 
      event: 'subscribe', 
      channel: 'candles', 
      key: 'trade:1m:tBTCUSD',
      sort:1
    })

    let book = JSON.stringify({ 
      event: 'subscribe', 
      channel: 'book', 
      symbol: 'tBTCUSD' 
    })

    socket.onopen = (e) => {
      console.log("Open");
      socket.send(ohcl)
    };
    
    socket.onmessage = (e) => {

      let data = JSON.parse(e.data)
  

      if(data[1]?.length === 240){
        dispatch(formatData(
          data[1]?.reverse()
        ))

      }else if(data[1]?.length === 6){
        dispatch(formatData(
        [data[1]]
        ))
      }

    };


    socket.onerror= err=>{
      console.log("err",err)
    }

    socket.onclose=(e)=>{
      console.log(e)
    }

    


  },[])


  return (
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
            dataSource={OHCL}
            
          />
    </div>
  )
}

export default CandleStickChart