
import './App.css';

import CandleStickChart from './Components/CandleStickChart';
import OrderBook from './Components/OrderBook';


function App() {
  
  return (
    <div className="App">
      <CandleStickChart  />
      <OrderBook />
    </div>
  );
}

export default App;
