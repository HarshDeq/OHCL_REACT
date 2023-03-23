import React, { useEffect, useState } from 'react';
import CustomChart from '../Components/Chart';
import OHLCDataPoints from '../Components/OHLCDataPoints';
import Select from '../Components/Select';
import Spinner from '../Components/Spinner';
import { TIME_STAMPS, TIME_DURATION_LABELS } from '../utils/constants';
import { getCurrentTimeStamp } from '../utils/getCurrentTimeStamp';
import { ohlcChartDataPromise } from '../utils/getOHLCChartData';
import { getTimeFrame } from '../utils/getTimeFrame';

const options = (events)=>{

    return {
        chart: {
            type: 'candlestick',
            id: 'candles',
            events:{...events},
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: true,
            },
        },
        xaxis: {
            type: 'datetime',
           
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
                offsetY: 0,
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#78909C',
                height: 6,
                offsetX: 0,
                offsetY: 0,
            },
            labels: {
                datetimeUTC: false,
                style: {
                    colors: '#FFFFFF',
                    fontSize: '10px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
        },
        yaxis: {
            show: true,
            labels: {
                formatter: (value) => {
                    return Math.round(value);
                },
                style: {
                    colors: '#FFFFFF',
                },
            },
        },
    
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#00B746',
                    downward: '#EF403C',
                },
                wick: {
                    useFillColor: true,
                },
            },
        },
        tooltip: {
            enabled: true,
            fixed: {
                enabled: true,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0,
            },
        },
    };
    
}

const CONSTANTINDEX = {
    date: 0,
    O: 1,
    H: 3,
    L: 4,
    C: 2,
};

const CONSTANT_INDEX_OF_OHLC_IN_CHART = {
    O: 0,
    H: 1,
    L: 2,
    C: 3,
}

const OHLC = () => {
    const [timeDuration, setTimeDuration] = useState(TIME_STAMPS.oneHour);

    const [ohlcCharData, setOhlcChartData] = useState([]);
    const [ohlcDataPoints, setOHLCDataPoints] = useState({
        O: 0,
        H: 0,
        L: 0,
        C: 0,
    });

    const handleTimeStampChange = (e) => {
        setTimeDuration(Number(e.target.value));
    };

    const getOHLCData = () => {
        const currentTimeStamp = getCurrentTimeStamp();
        const diffInTimeStamp = currentTimeStamp - timeDuration;
        const timeFrame = getTimeFrame(timeDuration);
        const response = ohlcChartDataPromise(timeFrame, diffInTimeStamp);
        response.then((res) => {
            const formatedData = res?.data?.map((order) => {
                return {
                    x: new Date(order[CONSTANTINDEX?.date]),
                    y: [
                        order[CONSTANTINDEX?.O],
                        order[CONSTANTINDEX?.H],
                        order[CONSTANTINDEX?.L],
                        order[CONSTANTINDEX?.C],
                    ],
                };
            });

            const reveresFormatedData = formatedData.reverse();
            setOhlcChartData(reveresFormatedData);

            const INDEX_OF_LATEST_DATA_BY_DATE = 0;

            const LATEST_ORDER = formatedData[INDEX_OF_LATEST_DATA_BY_DATE].y;

            setOHLCDataPoints({
                O: LATEST_ORDER[CONSTANT_INDEX_OF_OHLC_IN_CHART.O],
                H: LATEST_ORDER[CONSTANT_INDEX_OF_OHLC_IN_CHART.H],
                L: LATEST_ORDER[CONSTANT_INDEX_OF_OHLC_IN_CHART.L],
                C: LATEST_ORDER[CONSTANT_INDEX_OF_OHLC_IN_CHART.C],
            });
        });
    };
    

    const mouseMove = (event, chartContext, config) => {   
        const NO_DATA_INDEX =-1                
        const ohlcChartDataPointIndex = config.dataPointIndex
        if(ohlcChartDataPointIndex !== NO_DATA_INDEX){

            const dataPoint = ohlcCharData[ohlcChartDataPointIndex]?.y
            setOHLCDataPoints({
                O: dataPoint[CONSTANT_INDEX_OF_OHLC_IN_CHART.O],
                H: dataPoint[CONSTANT_INDEX_OF_OHLC_IN_CHART.H],
                L: dataPoint[CONSTANT_INDEX_OF_OHLC_IN_CHART.L],
                C: dataPoint[CONSTANT_INDEX_OF_OHLC_IN_CHART.C],
            });
        }
    }

    useEffect(() => {
        getOHLCData();
    }, [timeDuration]);

    return (
        <div>
            {ohlcCharData?.length ? (
                <>
                    <div className="candlestick-timeframe-container">
                        <label className="color-white">Select Duration :&nbsp;</label>
                        <Select
                            value={timeDuration}
                            options={TIME_DURATION_LABELS}
                            onChange={handleTimeStampChange}
                        />
                    </div>
                   
                    <OHLCDataPoints ohlcPoints = {ohlcDataPoints} />

                    {ohlcCharData?.length > 0 && (
                        <div>
                            <div className="container">
                                <CustomChart
                                    data={ohlcCharData}
                                    options={options({mouseMove})}
                                    type="candlestick"
                                    height="400"
                                    width="1000"
                                />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default OHLC;
