
import './App.css';

import CandleStickChart from './Components/CandleStickChart';
import OrderBook from './Components/OrderBook';
import AllRoutes from './Routes/AllRoutes';


function App() {
  
  return (
    <div className="App">
      {/* <CandleStickChart  />
      <OrderBook />
       */}

       <AllRoutes />
    </div>
  );
}

export default App;
