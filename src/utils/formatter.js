const YEAR_INDEX= 2, MONTH_INDEX = 1, DATE_INDEX=0
export const dateFormater = (dateTime)=>{
   
    const istDate = new Date(dateTime)
    
    const date =  istDate.toLocaleDateString('en-GB', {  year:'numeric', month:'short', day:'numeric'}).split(' ')

    const newFormatedDate = `${date[DATE_INDEX]} ${date[MONTH_INDEX]}'${date[YEAR_INDEX].slice(2)}`

    const time = istDate.toLocaleTimeString('en-GB').split(':')
    time.pop()
    return `${newFormatedDate} ${time.join(':')}` 
    
}