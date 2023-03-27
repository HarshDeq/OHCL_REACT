export const getCurrentTimeStamp = ()=>{
    const currentDateTime  = new Date()
    const currentTimeStamp = currentDateTime.getTime()
    return currentTimeStamp    
}   