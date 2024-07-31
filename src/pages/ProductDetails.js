import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { BASE_URL } from "../api";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/product";

const ProductDetails = () => {
  const { addToCart, isInCart } = useContext(UserContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data: product } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(productId),
  });

  // const handleBuyNow = (product) => {
  //   navigate(`/checkout`, {
  //     state: {
  //       productTitle: product.title,
  //       productPrice: product.price,
  //       productImage: BASE_URL + "/" + product.image,
  //     },
  //   });
  // };

  if (!product) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button
            className="btn btn-primary text-white"
            onClick={() => navigate("/")}
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col w-full lg:w-2/3 xl:w-1/2 mx-auto lg:mx-auto bg-custom-gray min-h-[94vh]
    "
    >
      <div className="w-full p-5">
        <div className="flex flex-col items-center">
          <img
            src={BASE_URL + "/" + product.image}
            alt={product.title}
            className="w-40 h-40 border border-white mb-4"
          />
          <h1 className="text-3xl font-bold py-1">{product.title}</h1>
          <p className="text-lg">{product.description}</p>
          <div className="flex gap-5 mt-4">
            <h2 className="text-2xl font-bold">{product.price} KD</h2>
            <button
              className=" px-5 py-2 shadow-2xl text-sm  border rounded-3xl"
              onClick={() => addToCart(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke={`${isInCart(product._id) ? "#fb543c" : "#000000"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
            {/* <button
              className="bg-custom-color-button border rounded-3xl px-6 py-2 shadow-2xl text-white text-sm"
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button> */}
          </div>
          <button
            onClick={() => navigate(`/customersupport`)}
            className="btn bg-gray-200 text-black mt-4 absolute bottom-0 rounded-full"
          >
            Customer Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
