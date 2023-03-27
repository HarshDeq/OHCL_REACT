import  { useEffect, useState } from 'react'

const INITIAL_LENGTH_OF_ORDER_BOOK = 50
const LENGTH_OF_ONE_ORDER = 3
const INDEX_OF_ORDER_IN_RESPONSE = 1


const useWebSocket = () => {

    const [isOpen,setOpen] = useState(false)
    const [socket,setSocket] = useState(null)

    const send =(book)=>{
        if(socket){
            socket.send(book)
        }
    }

    const close = ()=>{
        socket.close()
        setOpen(false)
    }

    const updateOrderBook =(updateFuc)=>{
        if(socket && isOpen){
            socket.onmessage = (e) => {
                const orderBookData = JSON.parse(e.data)[INDEX_OF_ORDER_IN_RESPONSE];

                if (orderBookData?.length === INITIAL_LENGTH_OF_ORDER_BOOK) {
                    orderBookData?.forEach((order) => {
                        updateFuc( order)
                    });
                } else if (orderBookData?.length === LENGTH_OF_ONE_ORDER) {
                    updateFuc(orderBookData)
                }
            }
        }
    }

    const openNewConnection =(url)=>{
        setSocket(new WebSocket(url))
    }

    const open = ()=>{
        socket.onopen = () => {
            console.log('open')
            setOpen(true)
        }
    }


    useEffect(()=>{
        if(socket && !isOpen){
            open()
        }
        if(socket && isOpen){
            socket.onclose = () => {
                console.log('close')
                setOpen(false)
            };
            return () => {
                if(isOpen)
                    return close()
            };
        }
    },[isOpen,socket])


    return [isOpen,send,close,updateOrderBook,socket,openNewConnection];
}

export default useWebSocket