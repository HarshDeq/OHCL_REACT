import React, { useEffect } from 'react'

const OrderBook = () => {

    const socket = new WebSocket(
        "wss://api-pub.bitfinex.com/ws/2"
      );
      useEffect(()=>{
    
        let book = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'book', 
            symbol: 'tBTCUSD'
        })
        socket.onopen = (e) => {
          console.log("Open");
          socket.send(book)
        };
        
        socket.onmessage = (e) => {
    
          let data = JSON.parse(e.data)
        //   console.log(data)
        };
    
       
        socket.onclose=(e)=>{
          
          console.log(e)
        }
    
      },[])
    

  return (
    <div className='oder-book-conatiner'>
      <div>
        T1
      </div>
      <div>
        T1
      </div>
    </div>
  )
}

export default OrderBook