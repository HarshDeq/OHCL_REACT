import React, { useEffect, useState } from 'react';
import CustomChart from '../Components/Chart';
import OHLCDataPoints from '../Components/OHLCDataPoints';
import Select from '../Components/Select';
import Spinner from '../Components/Spinner';
import { TIME_DURATION_LABELS, TIME_DURATON, TRADING_PAIR, TRADING_PAIR_LABLES } from '../utils/constants';
import { dateFormater } from '../utils/formatter';
import { getCurrentTimeStamp } from '../utils/getCurrentTimeStamp';
import { ohlcChartData } from '../utils/getOHLCChartData';
import { getTimeFrame } from '../utils/getTimeFrame';
import { fixedFloatNumber } from '../utils/utilsForNumber';

const options = (events) => {
    return {
        chart: {
            type: 'candlestick',
            id: 'candles',
            events: { ...events },
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
            tooltip: {
                enabled: true,
                formatter: (value) => {
                    return dateFormater(value);
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
            z: {
                formatter: undefined,
                title: 'Size: ',
            },
            fixed: {
                enabled: true,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0,
            },
        },
        grid: {
            show: true,
            borderColor: '#FFFFFF',
            strokeDashArray: 1,
            position: 'back',
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
    };
};

const CONSTANTINDEX = {
    date: 0,
    O: 1,
    C: 2,
    H: 3,
    L: 4,
};

const CONSTANT_INDEX_OF_OHLC_IN_CHART = {
    O: 0,
    H: 1,
    L: 2,
    C: 3,
};

const OHLC = () => {
    const [timeDuration, setTimeDuration] = useState(TIME_DURATON.oneHour);
    const [tradingPair,setTradingPair] = useState(TRADING_PAIR.bitCoinUSD);

    const [ohlcCharData, setOhlcChartData] = useState([]);
    const [ohlcDataPoints, setOHLCDataPoints] = useState({
        O: 0,
        H: 0,
        L: 0,
        C: 0,
    });

    const handleChangeTimeDuration = (e) => {
        setTimeDuration(Number(e.target.value));
    };

    const handleChangeTradingPair = (e) => {
        setTradingPair(e.target.value)
    };

    const getOHLCData = async () => {
        const currentTimeStamp = getCurrentTimeStamp();
        const diffInTimeStamp = currentTimeStamp - timeDuration;
        const timeFrame = getTimeFrame(timeDuration);
        const response = await ohlcChartData(timeFrame, diffInTimeStamp,tradingPair);

        if (!response.error) {
            const formatedData = response?.data?.map((order) => {
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
                O: fixedFloatNumber(LATEST_ORDER[CONSTANT_INDEX_OF_OHLC_IN_CHART.O], 0),
                H: fixedFloatNumber(LATEST_ORDER[CONSTANT_INDEX_OF_OHLC_IN_CHART.H], 0),
                L: fixedFloatNumber(LATEST_ORDER[CONSTANT_INDEX_OF_OHLC_IN_CHART.L], 0),
                C: fixedFloatNumber(LATEST_ORDER[CONSTANT_INDEX_OF_OHLC_IN_CHART.C], 0),
            });
        }
    };

    const mouseMove = (event, chartContext, config) => {
        const NO_DATA_INDEX = -1;
        const INDEX_OF_LIST_OF_DATA_POINTS = 0;
        const ohlcChartDataPointIndex = config.dataPointIndex;

        if (ohlcChartDataPointIndex > NO_DATA_INDEX) {
            const open = fixedFloatNumber(
                config.globals.seriesCandleO[INDEX_OF_LIST_OF_DATA_POINTS][
                    ohlcChartDataPointIndex
                ],
                0
            );
            const close = fixedFloatNumber(
                config.globals.seriesCandleC[INDEX_OF_LIST_OF_DATA_POINTS][
                    ohlcChartDataPointIndex
                ],
                0
            );
            const high = fixedFloatNumber(
                config.globals.seriesCandleH[INDEX_OF_LIST_OF_DATA_POINTS][
                    ohlcChartDataPointIndex
                ],
                0
            );
            const low = fixedFloatNumber(
                config.globals.seriesCandleL[INDEX_OF_LIST_OF_DATA_POINTS][
                    ohlcChartDataPointIndex
                ],
                0
            );

            setOHLCDataPoints({
                O: open,
                H: high,
                L: low,
                C: close,
            });
        }
    };

    useEffect(() => {
        getOHLCData();
    }, [timeDuration,tradingPair]);

    return (
        <div>
            {ohlcCharData?.length ? (
                <>
                    {ohlcCharData?.length > 0 && (
                        <div className="container">
                            <div>
                                <div className="display-flex">
                                    <div className='select-margin'>
                                        <label className="color-white">
                      Select Duration :&nbsp;
                                        </label>
                                        <Select
                                            value={timeDuration}
                                            options={TIME_DURATION_LABELS}
                                            onChange={handleChangeTimeDuration}
                                        />
                                    </div>
                                    <div className='select-margin'>
                                        <label className="color-white">
                      Select Trading Pair :&nbsp;
                                        </label>
                                        <Select
                                            value={tradingPair}
                                            options={TRADING_PAIR_LABLES}
                                            onChange={handleChangeTradingPair}
                                        />
                                    </div>
                                    <div>
                                        <OHLCDataPoints ohlcPoints={ohlcDataPoints} />
                                    </div>
                                </div>
                                <CustomChart
                                    data={ohlcCharData}
                                    options={options({ mouseMove })}
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
