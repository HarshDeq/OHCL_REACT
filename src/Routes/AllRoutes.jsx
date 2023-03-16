import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CandleStickChart from "../Components/CandleStickChart";
import Header from "../Components/Header";
import OrderBook from "../Components/OrderBook";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="ohcl" element={<CandleStickChart />} />

          <Route path = "order-book" element={<OrderBook />} />
          <Route path="*" element={<Navigate to="/ohcl" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/ohcl" replace />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
