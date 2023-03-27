import React, { createContext, useState } from 'react';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { TRADING_PAIR } from './utils/constants';

export const TradingPairContext = createContext();

function App() {

    const [tradingPair,setTradingPair] = useState(TRADING_PAIR.bitCoinUSD);

    return (
        <TradingPairContext.Provider value={{tradingPair,setTradingPair}}>
            <div className="App">
                <AllRoutes />
                <ToastContainer autoClose={2000}/>
            </div>
        </TradingPairContext.Provider>
    );
}

export default App;
