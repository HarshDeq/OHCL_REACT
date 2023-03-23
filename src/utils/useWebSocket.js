import  { useEffect, useRef, useState } from 'react'

const useWebSocket = (url) => {

    const [isOpen,setOpen] = useState(false)
    const [socket,setSocket] = useState(null)


    useEffect(()=>{
       setSocket(new WebSocket(url))
       
        socket.onopen = () => setOpen(true);
        socket.onclose = () => {
            console.log('close')
            setOpen(false)
        };
      
        
        return () => {
            if(socket){
                socket.close();
            }
        };


    },[])


    return [isOpen, socket];
}

export default useWebSocket