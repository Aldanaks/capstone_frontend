import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { BASE_URL } from "../api";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/product";

const ProductDetails = () => {
  const { addToCart } = useContext(UserContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data: product } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(productId),
  });

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
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
    <div className="h-screen flex items-center justify-center relative overflow-hidden mb-40">
      <div className="flex-col overflow-y-auto h-full w-full max-w-4xl m-5">
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
        <div className="bg-base-100 w-full shadow-xl mb-3">
          <figure>
            <img src={BASE_URL + "/" + product.image} alt={product.title} />
          </figure>
          <div className=" mt-3">
            <h2 className="card-title mb-3">{product.title}</h2>
            <h2 className="card-title mb-3">Description:</h2>
            <p>{product.description}</p>
            <h2 className="card-title mb-3"> Price: {product.price} KD</h2>
            <div className="flex flex-row items-center justify-center gap-1"></div>
            <div
              className="card-actions justify-end"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
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
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => navigate(`/checkout/${product._id}`)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
