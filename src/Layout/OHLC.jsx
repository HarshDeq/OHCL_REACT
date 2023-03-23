import React, { useEffect, useState } from 'react';
import CustomChart from '../Components/Chart';
import Select from '../Components/Select';
import Spinner from '../Components/Spinner';
import { TIME_STAMPS, TIME_STAMPS_LABELS } from '../utils/constants';
import { dateFormater } from '../utils/formatter';
import { getCurrentTimeStamp } from '../utils/getCurrentTimeStamp';
import { ohlcChartDataPromise } from '../utils/getOHLCChartData';
import { getTimeFrame } from '../utils/getTimeFrame';

const OHLC = () => {
    const [timeStamp, setTimeStamp] = useState(TIME_STAMPS.oneHour);

    const [ohlcCharData, setOhlcChartData] = useState([]);
    // const [ohlc, setOHLC] = useState({
    //     O: 0,
    //     H: 0,
    //     L: 0,
    //     C: 0,
    // });

    const handleTimeStampChange = (e) => {
        setTimeStamp(Number(e.target.value));
    };

    const getOHLCData = () => {
        const currentTimeStamp = getCurrentTimeStamp();
        const diffInTimeStamp = currentTimeStamp - timeStamp;

        const timeFrame = getTimeFrame(timeStamp);

        const response = ohlcChartDataPromise(timeFrame, diffInTimeStamp);

        response.then((res) => {
            const CONSTANTINDEX = {
                date: 0,
                O: 1,
                H: 3,
                L: 4,
                C: 2,
            };

            const formatedData = res?.data?.map((data) => {
                return {
                    x: new Date(data[CONSTANTINDEX?.date]),
                    y: [
                        data[CONSTANTINDEX?.O],
                        data[CONSTANTINDEX?.H],
                        data[CONSTANTINDEX?.L],
                        data[CONSTANTINDEX?.C],
                    ],
                };
            });

            const reveresFormatedData = formatedData.reverse();

            setOhlcChartData(reveresFormatedData);

            // const INDEX_OF_LATEST_DATA_BY_DATE = 0;

            // const LAST_ARR = formatedData[INDEX_OF_LATEST_DATA_BY_DATE].y;

            // setOHLC({
            //     O: LAST_ARR[0],
            //     H: LAST_ARR[1],
            //     L: LAST_ARR[2],
            //     C: LAST_ARR[3],
            // });
        });
    };

    const options = {
        chart: {
            type: 'candlestick',
            id: 'candles',
            events: {
                click: (event, chartContext, config) => {
                    //         const PARENT_CLASS = 'apexcharts-tooltip-candlestick';

                    //         const allChildElements =
                    // document.getElementsByClassName(PARENT_CLASS)[0].childNodes;

                    //         const OHLCData = [];
                    //         allChildElements?.forEach((ele) => {
                    //             OHLCData.push(ele.childNodes[1].innerHTML);
                    //         });

                    //         setOHLC({
                    //             O: OHLCData[0],
                    //             H: OHLCData[1],
                    //             L: OHLCData[2],
                    //             C: OHLCData[3],
                    //         });

                    console.log(config);
                },
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: true,
            },
        },

        xaxis: {
            type: 'category',
            datetimeUTC: false,
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
                rotate: -45,
                formatter: function (value) {
                    return dateFormater(value);
                },
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
            enabled: false,
            fixed: {
                enabled: true,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0,
            },
        },
    };

    useEffect(() => {
        getOHLCData();
    }, [timeStamp]);

    return (
        <div>
            {ohlcCharData?.length ? (
                <>
                    <div className="candlestick-timeframe-container">
                        <label className="color-white">Select Time :&nbsp;</label>
                        <Select
                            value={timeStamp}
                            options={TIME_STAMPS_LABELS}
                            onChange={handleTimeStampChange}
                        />
                    </div>
                    {/* <div
                className={`display-flex red ${ohlc?.O >= ohlc?.C ? 'red' : 'green'} candlestick-timeframe-container`}
            >
                <div>
                    <span>O :</span>
                    <span>{ohlc?.O}</span>
                </div>
                <div>
                    <span>H :</span>
                    <span>{ohlc?.H}</span>
                </div>
                <div>
                    <span>L :</span>
                    <span>{ohlc?.L}</span>
                </div>
                <div>
                    <span>C :</span>
                    <span>{ohlc?.C}</span>
                </div>
            </div> */}

                    {ohlcCharData?.length > 0 && (
                        <div>
                            <div className="container">
                                <CustomChart
                                    data={ohlcCharData}
                                    options={options}
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
