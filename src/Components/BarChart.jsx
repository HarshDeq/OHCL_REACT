import React from 'react'
import Chart from 'react-apexcharts';

const BarChart = (props) => {
    const {data, mouseEvents={},barColor='#00FF00', reversed =false} = props


    const options = {
        chart: {
            toolbar:{
                show:false
            },
            height: 410,
            animations: {
                enabled: true
            },
            events:mouseEvents,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '100',
                columnWidth: '100%',
            },
        },

        tooltip:{
            enabled:false
        },
        dataLabels:{
            enabled:false,
        },

        stroke: {
            show:false,
            width:0
        },
       
        yaxis: {
            reversed: reversed,
          
            labels: {
                show: false
            },
        },
        xaxis:{
            labels: {
                show: false
            },
        },
        grid: {
            position: 'back',
           
        },
        fill: {
            colors: [barColor],
            opacity:.5
        }
     
    };
    return (
     
        <Chart
            options={options}
            series={[{data}]}
            type='bar'
            height='100%'
            width='100%'  
             
        />
     
    );
}

export default BarChart