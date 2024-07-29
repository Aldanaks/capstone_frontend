import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Navbar = () => {
  const { cartCount, getTotalPrice, user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-custom-gray shadow-lg">
      <div className="navbar ">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-custom-primary-button">
            <button
              className=""
              type="button"
              onClick={() => navigate(`/${user?.username}`)}
            >
              Fluid
            </button>
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item text-custom-color-button">
                  {cartCount}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{cartCount} Items</span>
                <span className="text-info">
                  Subtotal: {getTotalPrice()} KD{" "}
                </span>
                <div className="card-actions flex justify-between p-0">
                  <button className=" flex justify-start">
                    <Link to="/cart" className="btn btn-primary">
                      View Cart
                    </Link>
                  </button>
                  {/* <button className="flex justify-end">
                    <Link to="/checkout" className="btn btn-primary">
                      CheckOut
                    </Link>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
