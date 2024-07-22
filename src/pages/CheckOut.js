import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router";

const CheckOut = () => {
  const { cartItems } = useContext(UserContext);
  const navigate = useNavigate();
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold flex justify-start p-2 ">
        Total: {getTotalPrice()} KD
      </h2>
      <div className="main-content flex justify-center items-center flex-col w-full h-full p-4">
        <br />
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md mb-4">
          <input
            type="text"
            className="grow p-2"
            placeholder="Please Enter your Email"
          />
        </label>
        <br />
        <br />
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md mb-4">
          <input type="text" className="grow p-2" placeholder="Name on card" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md mb-4">
          <input type="text" className="grow p-2" placeholder="Card Number" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md mb-4">
          <input type="text" className="grow p-2" placeholder="Expiry Date" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md mb-4">
          <input type="text" className="grow p-2" placeholder="CCV" />
        </label>
        <div className="flex justify-end w-full max-w-md ">
          <button
            className="btn btn-primary mb-50"
            type="button"
            onClick={() => navigate(`/receipt`)}
          >
            Pay
          </button>
        </div>
        <div className="w-full flex justify-center mt-9 ">
          <button
            onClick={() => navigate(`/customersupport`)}
            className="btn  text-white"
          >
            <h4 className="text-black">Contact Us</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
