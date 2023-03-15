
import './App.css';
import {useEffect} from "react"


function App() {

  useEffect(()=>{
    let socket = new WebSocket(
      "wss://api-pub.bitfinex.com/ws/2"
    );

    let msg = JSON.stringify({ 
      event: 'subscribe', 
      channel: 'candles', 
      key: 'trade:1m:tBTCUSD' 
    })

    socket.onopen = (e) => {
      console.log("Open");
      socket.send(msg)
    };

    socket.onmessage = (e) => {

      let data = JSON.parse(e.data)

      console.log(data)
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
     
    </div>
  );
}

export default App;
