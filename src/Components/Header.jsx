import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { PATH_OHLC, PATH_ORDER_BOOK } from '../Routes/Paths';

const Header = () => {
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

            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Header;
