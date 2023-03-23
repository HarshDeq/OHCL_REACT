export const HTTPS_REQUEST_BASE_URL = 'https://api-pub.bitfinex.com/v2';

export const WEB_SOCKET_BASE_URL = 'wss://api-pub.bitfinex.com/ws/2';

export const TIME_STAMPS = {
    oneHour:3600000,
    sixHour:21600000,
    oneDay :86400000,
    threeDay :259200000,
    sevenDay:604800000,
    oneMonth:2629800000,
    threeMonth:7889400000,
    oneYear:31557600000,
    threeYear:94672800000
}

export const TIME_FRAME = {
    oneMin:'1m',
    fiveMin:'5m',
    fifteenMin:'15m',
    thirtyMin:'30m',
    oneHour:'1h',
    sixHour:'6h',
    twelveHour:'12h',
    oneDay :'1D',
    oneWeek:'1W'
}

export const TIME_DURATION_LABELS = [{value: TIME_STAMPS.oneHour , label:'1 Hour'},{value: TIME_STAMPS.sixHour , label:'6 Hour'},{value: TIME_STAMPS.oneDay , label:'1 Day'},{value: TIME_STAMPS.sevenDay , label:'7 Days'},{value: TIME_STAMPS.oneMonth , label:'1 Month'}, {value: TIME_STAMPS.threeMonth , label:'3 Month'},{value: TIME_STAMPS.oneYear , label:'1 Year'},{value: TIME_STAMPS.threeYear , label:'3 Year'}];