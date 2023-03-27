import React, { useContext, useEffect, useState } from 'react';
import { TradingPairContext } from '../App';
import CustomChart from '../Components/Chart';
import OHLCDataPoints from '../Components/OHLCDataPoints';
import Select from '../Components/Select';
import Spinner from '../Components/Spinner';
import { ohlcChartOption, TIME_DURATION_LABELS, TIME_DURATON} from '../utils/constants';
import { getCurrentTimeStamp } from '../utils/getCurrentTimeStamp';
import { ohlcChartData } from '../utils/getOHLCChartData';
import { getTimeFrame } from '../utils/getTimeFrame';
import { fixedFloatNumber } from '../utils/utilsForNumber';


const CONSTANT_INDEX = {
    date: 0,
    O: 1,
    C: 2,
    H: 3,
    L: 4,
};


const OHLC = () => {
 
    const {tradingPair} = useContext(TradingPairContext)


    const [timeDuration, setTimeDuration] = useState(TIME_DURATON.oneHour);
 

    const [ohlcCharData, setOhlcChartData] = useState([]);
    const [ohlcDataPoint, setohlcDataPoint] = useState({
        o: 0,
        h: 0,
        l: 0,
        c: 0,
    });

    const handleChangeTimeDuration = (e) => {
        setTimeDuration(Number(e.target.value));
    };


    const getOHLCData = async () => {
        const currentTimeStamp = getCurrentTimeStamp();
        const diffInTimeStamp = currentTimeStamp - timeDuration;
        const timeFrame = getTimeFrame(timeDuration);
        const response = await ohlcChartData(timeFrame, diffInTimeStamp,tradingPair);

        if (!response.error) {
            const formatedData = response?.data?.map((order) => {
                return {
                    x: new Date(order[CONSTANT_INDEX?.date]),
                    y: [
                        order[CONSTANT_INDEX.O],
                        order[CONSTANT_INDEX.H],
                        order[CONSTANT_INDEX.L],
                        order[CONSTANT_INDEX.C],
                    ],
                };
            });

            const reveresFormatedData = formatedData.reverse();
            setOhlcChartData(reveresFormatedData);
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

            setohlcDataPoint({
                o: open,
                h: high,
                l: low,
                c: close,
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
                                    {/* <div className='select-margin'>
                                        <label className="color-white">
                      Select Trading Pair :&nbsp;
                                        </label>
                                        <Select
                                            value={tradingPair}
                                            options={TRADING_PAIR_LABLES}
                                            onChange={handleChangeTradingPair}
                                        />
                                    </div> */}
                                    <div>
                                        <OHLCDataPoints ohlcPoint={ohlcDataPoint} />
                                    </div>
                                </div>
                                <CustomChart
                                    data={ohlcCharData}
                                    options={ohlcChartOption({ mouseMove })}
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
