import { dateFormater } from './formatter';

export const HTTPS_REQUEST_BASE_URL = 'https://api-pub.bitfinex.com/v2';

export const WEB_SOCKET_BASE_URL = 'wss://api-pub.bitfinex.com/ws/2';

export const TIME_DURATON = {
    oneHour: 3600000,
    sixHour: 21600000,
    oneDay: 86400000,
    threeDay: 259200000,
    sevenDay: 604800000,
    oneMonth: 2629800000,
    threeMonth: 7889400000,
    oneYear: 31557600000,
    threeYear: 94672800000,
};

export const TIME_FRAME = {
    oneMin: '1m',
    fiveMin: '5m',
    fifteenMin: '15m',
    thirtyMin: '30m',
    oneHour: '1h',
    sixHour: '6h',
    twelveHour: '12h',
    oneDay: '1D',
    oneWeek: '1W',
};

export const TRADING_PAIR = {
    bitCoinUSD:'tBTCUSD',
    liteCoinUSD:'tLTCUSD',
    ethereumUSD:'tETHUSD',
}

export const TRADING_PAIR_LABLES = [
    {
        label: 'BTC/USD',
        value: TRADING_PAIR.bitCoinUSD,
    },
    {
        label: 'LTC/USD',
        value: TRADING_PAIR.liteCoinUSD,
    },
    {
        label: 'ETH/USD',
        value: TRADING_PAIR.ethereumUSD,
    },
];

export const TIME_DURATION_LABELS = [
    { value: TIME_DURATON.oneHour, label: '1 Hour' },
    { value: TIME_DURATON.sixHour, label: '6 Hour' },
    { value: TIME_DURATON.oneDay, label: '1 Day' },
    { value: TIME_DURATON.sevenDay, label: '7 Days' },
    { value: TIME_DURATON.oneMonth, label: '1 Month' },
    { value: TIME_DURATON.threeMonth, label: '3 Month' },
    { value: TIME_DURATON.oneYear, label: '1 Year' },
    { value: TIME_DURATON.threeYear, label: '3 Year' },
];


export const ohlcChartOption = (events) => {
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
