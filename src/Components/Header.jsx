import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { TradingPairContext } from '../App';
import { PATH_OHLC, PATH_ORDER_BOOK } from '../Routes/Paths';
import { TRADING_PAIR_LABLES } from '../utils/constants';
import Select from './Select';

const Header = () => {

    const {tradingPair,setTradingPair} = useContext(TradingPairContext)

    const handleChangeTradingPair = (e) => {
        setTradingPair(e.target.value)
    };

    return (
        <div>
            <div className="header-container">
                <div className="header-container-logo">Logo</div>
                <div className="header-container-links-container">
                    <Link
                        to={`${PATH_OHLC}`}
                        className="header-container-links-container-link"
                    >
                        <div>OHLC</div>
                    </Link>
                    <Link
                        to={`${PATH_ORDER_BOOK}`}
                        className="header-container-links-container-link"
                    >
                        <div>Order Book</div>
                    </Link>
                </div>
            </div>

            <div className='container_input_traing_pair'>
                <div className='select-margin'>
                    <label className="color-white">
                      Trading Pair :&nbsp;
                    </label>
                    <Select
                        value={tradingPair}
                        options={TRADING_PAIR_LABLES}
                        onChange={handleChangeTradingPair}
                    />
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Header;
