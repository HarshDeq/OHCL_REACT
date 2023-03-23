export const dateFormater = (dateTime)=>{
   
    const istDate = new Date(dateTime)
    const date =  istDate.toLocaleDateString('en-us', {  year:'numeric', month:'numeric', day:'numeric'}) 

    const time = istDate.toLocaleTimeString('en-GB').split(':')
    time.pop()
    const newDate = `${time.join(':')} ${date}` 
    return  newDate
}