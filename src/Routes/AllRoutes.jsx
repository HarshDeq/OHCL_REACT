import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CandleStickChart from '../Components/CandleStickChart';
import Header from '../Components/Header';
import OrderBook from '../Components/OrderBook';
import { PATH_OHLC, PATH_ORDER_BOOK } from './Paths';

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='' element={<Header />}>
                    <Route path={PATH_OHLC} element={<CandleStickChart />} />

                    <Route path = {PATH_ORDER_BOOK} element={<OrderBook />} />
                    <Route path='' element={<Navigate to={`${PATH_OHLC}`}replace />} />
                </Route>
                <Route path='*' element={<Navigate to={`${PATH_OHLC}`} replace />} />
            </Routes>
        </div>
    );
};

export default AllRoutes;
