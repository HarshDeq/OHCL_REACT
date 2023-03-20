import React from 'react';
import Chart from 'react-apexcharts';

const CandleStickChart = (props) => {


    const {data, mouseEvents={}} = props


    const options = {
        chart: {
            type: 'candlestick',
            id:'candles',
            events:mouseEvents,
            toolbar: {
                autoSelected: 'pan',
                show: false
            },
            zoom: {
                enabled: true
            }
        },
    
        xaxis:{
            type:'datetime',
            datetimeUTC: true,
            datetimeFormatter: {
                year: 'yyyy',
                month: 'MMM \'yy',
                day: 'dd MMM',
                hour: 'HH:mm',
            },
    
            axisBorder: {
                show: true,
                color: '#78909C',
                height: 1,
                width: '100%',
                offsetX: 0,
                offsetY: 0
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#78909C',
                height: 6,
                offsetX: 0,
                offsetY: 0
            },
        },
        yaxis:{
            show:true,
            labels:{
                formatter:(value)=>{    
                    return  Math.round(value)
                }
            }
            
        },
    
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#00B746',
                    downward: '#EF403C'
                },
                wick: {
                    useFillColor: true
                }
            }
        }}
   

    return (
        <div >

           
            <div className='container'>
                <Chart
                    options={options}
                    series={[{data}]}
                    type='candlestick'
                    width='1000' 
                    height='500'
                />
            </div>
        </div>
    );
};

export default CandleStickChart;