import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import UserContext from "../context/UserContext";
import { createPaymentIntent } from "../api/stripe";
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

  // const getTotalPrice = () => {
  //   console.log(cartItems); // Log the cart items for debugging
  //   return cartItems.reduce((total, item) => {
  //     const price = parseFloat(item.price);
  //     console.log(`Item price: ${price}`); // Log each item price for debugging
  //     return total + (isNaN(price) ? 0 : price);
  //   }, 0);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    if (email !== confirmEmail) {
      toast.error("Emails do not match");
      return;
    }
    setPaymentProcessing(true);

    try {
      const totalPrice = getTotalPrice();
      const clientSecret = await createPaymentIntent(
        Math.ceil(totalPrice * 1000)
      );

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email,
            name,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment succeeded!");
          handlePayment();
          // navigate("/receipt");
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed: " + error.message);
    } finally {
      setPaymentProcessing(false);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!stripe || !elements) return;

  //   if (email !== confirmEmail) {
  //     toast.error("Emails do not match");
  //     return;
  //   }

  //   setPaymentProcessing(true);

  //   try {
  //     const totalPrice = getTotalPrice();
  //     const clientSecret = await createPaymentIntent(
  //       Math.ceil(totalPrice * 100)
  //     );

  //     const result = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //         billing_details: {
  //           email,
  //           name,
  //         },
  //       },
  //     });

  //     if (result.error) {
  //       console.log(result.error.message);
  //       toast.error(result.error.message);
  //     } else {
  //       if (result.paymentIntent.status === "succeeded") {
  //         // Call handlePayment here to process the receipt after payment success
  //         handlePayment();
  //         toast.success("Payment succeeded!");
  //         // You may want to navigate inside handlePayment or after a successful toast
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Payment failed:", error);
  //     toast.error("Payment failed: " + error.message);
  //   } finally {
  //     setPaymentProcessing(false);
  //   }
  // };

  return (
    <div className="bg-custom-gray h-m-sc w-full">
      <div className="mt-4">
        <ToastContainer />
      </div>
      <h2 className="text-2xl font-bold flex justify-center p-2">
        Total :
        <h3 className="text-2xl font-bold px-1 text-green-500">
          {getTotalPrice()} KD
        </h3>
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
              className="btn btn-primary mb-4 text-white "
              type="submit"
              disabled={!stripe || paymentProcessing}
            >
              {paymentProcessing ? "Processing..." : "Pay"}
            </button>
          </div>
        </form>
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
