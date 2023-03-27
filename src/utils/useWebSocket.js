import  { useEffect, useState } from 'react'

const useWebSocket = (url) => {

    const [isOpen,setOpen] = useState(false)
    const [socket,setSocket] = useState(null)


    useEffect(()=>{
        if(!socket){
            setSocket(new WebSocket(url))
        }else{
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
        }
    },[socket])


    return [isOpen, socket];
}

export default useWebSocket