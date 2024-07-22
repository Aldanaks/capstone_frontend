import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsByCreator } from "../api/auth";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import UserContext from "../context/UserContext";
import { FaTwitter, FaInstagram } from "react-icons/fa";

const CreatorsLink = () => {
  const { creatorUsername } = useParams();
  const { addToCart, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [expandedProductIds, setExpandedProductIds] = useState([]);

  useEffect(() => {
    setUser(creatorUsername);
  }, [creatorUsername, setUser]);

  const { data: creator } = useQuery({
    queryKey: ["getAllProductsByCreator", creatorUsername],
    queryFn: () => getAllProductsByCreator(creatorUsername),
  });
  console.log(creator);

  const handleCardClick = (product) => {
    console.log(product);
    navigate(`/productdetails/${product._id}`);
  };

  const toggleDescription = (productId) => {
    setExpandedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full">
        {creator && (
          <div className="flex flex-col items-center mb-4">
            <img
              src={BASE_URL + "/" + creator.image}
              alt=""
              className="w-32 h-32 rounded-full border border-yellow-300"
            />
            <h1 className="text-3xl font-bold">{creator.username}</h1>
            <p className="text-lg text-center">{creator.bio}</p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              {creator?.snapchat && (
                <a
                  href={creator.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaTwitter size={24} />
                </a>
              )}
              {creator?.twitter && (
                <a
                  href={creator.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <FaTwitter size={24} />
                </a>
              )}
              {creator?.instagram && (
                <a
                  href={creator.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700"
                >
                  <FaInstagram size={24} />
                </a>
              )}
            </div>
          </div>
        )}
        <div className="pb-96 w-full">
          {creator?.products?.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 w-full shadow-xl mb-3 cursor-pointer"
              onClick={() => handleCardClick(product)}
            >
              <img src={BASE_URL + "/" + product.image} alt={product.title} />

              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p
                  className={
                    expandedProductIds.includes(product.id)
                      ? ""
                      : "truncate-text"
                  }
                >
                  {product.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDescription(product.id);
                  }}
                >
                  {expandedProductIds.includes(product.id)
                    ? "Show Less"
                    : "Show More"}
                </button>
                <h2 className="card-title">{product.price} KD</h2>
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
                    onClick={() => navigate(`/checkout`)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-center mt-4 ">
            <button
              onClick={() => navigate(`/customersupport`)}
              className="btn text-white"
            >
              <h4 className="text-black">Contact Us</h4>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorsLink;
