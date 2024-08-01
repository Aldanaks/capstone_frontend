import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import UserContext from "../context/UserContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { createReceipt } from "../api/receipt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckOut = () => {
  const { cartItems, user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { productTitle, productPrice, productImage } = location.state || {};

  const [email, setEmail] = useState("");
  const [confirmEmail, setconfirmEmail] = useState("");
  const [name, setName] = useState("");

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.cartCount,
      0
    );
  };
  console.log(cartItems.map((item) => item._id));
  const { mutate } = useMutation({
    mutationFn: (receiptData) =>
      createReceipt({
        ...receiptData,
        products: cartItems.map((item) => item._id),
      }),
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
        confirmEmail,
        customerName: name,
      };

      mutate(receiptData);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const stripe = useStripe();
  const elements = useElements();

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email !== confirmEmail) {
      toast.error("Emails do not match");
      return;
    }
    setPaymentProcessing(true);

    try {
      toast.success("Payment succeeded!");
      handlePayment();
      // navigate("/receipt");
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed: " + error.message);
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="bg-custom-gray min-h-[94vh]">
      <div className="mt-4">
        <ToastContainer />
      </div>
      <h2 className="text-2xl font-bold flex justify-end p-2">
        Total :
        <h3 className="text-2xl font-bold px-1 text-green-500">
          {getTotalPrice()} KD
        </h3>
      </h2>

      {productTitle && (
        <div className="flex flex-row">
          <div className="p-2 w-[30%] flex justify-center items-center">
            <img
              src={productImage}
              alt=""
              className="w-20 h-20 border-custom-primary-button"
            />
          </div>
          <div className="w-[70%] rounded-full">
            <h1 className="text-xl text-bold px-2 ">{productTitle}</h1>
            <p className="text-lg px-2">Price: {productPrice} KD</p>
          </div>
        </div>
      )}

      <div className="main-content flex justify-center items-center flex-col w-full p-4 ">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <label className="input input-bordered flex items-center gap-2 w-full mb-4">
            <input
              type="email"
              className="grow p-2"
              placeholder="Please Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full mb-4">
            <input
              type="email"
              className="grow p-2"
              placeholder="Please confirm your Email"
              value={confirmEmail}
              onChange={(e) => setconfirmEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full mb-4">
            <input
              type="text"
              className="grow p-2"
              placeholder="Name on card"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <CardElement className="grow p-2 w-full mb-4 border border-gray-300 rounded-lg  " />
          <div className="flex flex-col justify-end w-full">
            <h1 className="text-sm text-gray-400 mb-2">
              This payment is processed through Stripe
            </h1>

            <button
              className="btn bg-custom-primary-button mb-4 text-white "
              type="submit"
              disabled={!stripe || paymentProcessing}
            >
              {paymentProcessing ? "Processing..." : "Pay"}
            </button>
          </div>
        </form>
        <div className="w-full flex justify-center mt-3">
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
