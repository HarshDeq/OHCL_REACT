import  { useEffect, useRef, useState } from 'react'

const useWebSocket = (url) => {

    const [isOpen,setOpen] = useState(false)
    const [response,setResponse] = useState(null)
    const ws = useRef(null);

    useEffect(()=>{
        const socket = new WebSocket(url);
       
        socket.onopen = () => setOpen(true);
        socket.onclose = () => {
            console.log('close')
            setOpen(false)
        };
        socket.onmessage = (event) => setResponse(JSON.parse(event.data));
        ws.current = socket;
        
        return () => {
            if(socket){
                socket.close();
            }
        };


    },[])


    return [isOpen, response,ws.current?.send.bind(ws.current)];
}

export default useWebSocket