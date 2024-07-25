import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { createReceipt } from "../api/receipt";
import { useMutation } from "@tanstack/react-query";

const CheckOut = () => {
  const { cartItems, user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { productTitle, productPrice, productImage } = location.state || {};

  // State variables for user input
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.cartCount,
      0
    );
  };

  const { mutate } = useMutation({
    mutationFn: (receiptData) => createReceipt(receiptData),
    mutationKey: ["createReceipt"],
    onSuccess: (data) => {
      console.log(data);
      navigate(`/receipt/${data._id}`);
    },
  });

  const handlePayment = async () => {
    try {
      const receiptData = {
        totalAmount: productPrice || getTotalPrice(),
        creator: user._id,
        products: cartItems.map((item) => item.id),
        customerEmail: email,
        customerName: name,
      };

      mutate(receiptData);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };
  console.log(user);
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold flex justify-start p-2">
        Total: {productPrice || getTotalPrice()} KD
      </h2>

      {productTitle && (
        <div className="product-details mb-4 p-4 border border-gray-300 rounded">
          <h3 className="text-xl font-semibold">{productTitle}</h3>
          <img
            src={productImage}
            alt={productTitle}
            className="w-32 h-32 object-cover mb-2"
          />
          <h4 className="text-lg font-bold">Price: {productPrice} KD</h4>
        </div>
      )}

      <div className="main-content flex justify-center items-center flex-col w-full h-full p-4">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md mb-4">
          <input
            type="email"
            className="grow p-2"
            placeholder="Please Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md mb-4">
          <input
            type="text"
            className="grow p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Payment Details (Optional) */}
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
        <div className="flex justify-end w-full max-w-md">
          <button
            className="btn btn-primary mb-50"
            type="button"
            onClick={handlePayment}
          >
            Pay
          </button>
        </div>
        <div className="w-full flex justify-center mt-9">
          <button
            onClick={() => navigate(`/customersupport`)}
            className="btn text-white"
          >
            <h4 className="text-black">Contact Us</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
