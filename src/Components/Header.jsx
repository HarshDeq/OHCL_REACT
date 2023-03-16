import React from "react";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="header-container">
        <div className="header-container-logo">Logo</div>
        <div className="header-container-links-container">
          <Link to="/ohcl" className="header-container-links-container-link">
            <div >OHCL</div>
          </Link>
          <Link to="/order-book" className="header-container-links-container-link">
            <div >
              Order Book
            </div>
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
