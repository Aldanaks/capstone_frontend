import React, { useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";

const Receipt = () => {
  const { cartItems, user } = useContext(UserContext);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="artboard flex justify-center p-10">
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-10 rounded-lg shadow-lg h-full  ">
          <h1 className="text-xl font-bold mb-10">
            Thank You for Your Purchase! from{" "}
            <h1 className="text-3xl font-bold p-4 text-blue-800">{user}</h1>
          </h1>
          <h2 className="text-2xl font-bold flex justify-center mb-10 ">
            Total: {getTotalPrice()} KD
          </h2>

          <p className="text-lg mb-10">
            We appreciate your business and hope you enjoy your purchase.
          </p>
          <button
            className="btn btn-primary text-white"
            onClick={() => navigate("/")}
          >
            Go Back to Shopping
          </button>
          <div className="w-full flex justify-center mt-9 ">
            <button onClick={() => navigate(`/customersupport`)}>
              <h4 className="text-m text-gray-500 flex justify-start">
                {" "}
                Contact Us
              </h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
