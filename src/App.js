
import './App.css';
import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { formatData } from './Redux/OHCLDATA/action';
import CandleStickChart from './Components/CandleStickChart';


function App() {
  const dispatch = useDispatch()

  const {OHCL} = useSelector(state=>state.ohcl)

  useEffect(()=>{
    let socket = new WebSocket(
      "wss://api-pub.bitfinex.com/ws/2"
    );

    let msg = JSON.stringify({ 
      event: 'subscribe', 
      channel: 'candles', 
      key: 'trade:1D:tBTCUSD' ,
      sort:1
      
    })

    socket.onopen = (e) => {
      console.log("Open");
      socket.send(msg)
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
    <div className="App">
      <CandleStickChart data={OHCL} />
    </div>
  );
}

export default App;
