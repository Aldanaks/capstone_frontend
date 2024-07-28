// src/api/stripe.js
import instance from "axios";

export const createPaymentIntent = async (amount) => {
  const response = await instance.post(
    "http://localhost:8000/stripe/create-payment-intent",
    {
      amount,
    }
  );

  console.log(response);
  return response.data.clientSecret;
};
