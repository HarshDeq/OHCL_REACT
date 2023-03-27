import React from 'react';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className="App">
            <AllRoutes />
            <ToastContainer autoClose={2000}/>
        </div>
    );
}

export default App;
