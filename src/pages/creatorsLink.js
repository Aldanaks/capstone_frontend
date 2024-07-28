import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsByCreator } from "../api/auth";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import UserContext from "../context/UserContext";
import { FaInstagram, FaSnapchat, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const CreatorsLink = () => {
  const { creatorUsername } = useParams();
  const { addToCart, setUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  // const [expandedProductIds, setExpandedProductIds] = useState([]);
  const [isGridView, setIsGridView] = useState(true); // State for grid/list view

  const { data: creator } = useQuery({
    queryKey: ["getAllProductsByCreator", creatorUsername],
    queryFn: () => getAllProductsByCreator(creatorUsername),
  });

  useEffect(() => {
    setUser(creator);
  }, [creator, setUser]);

  const handleCardClick = (product) => {
    console.log(product);
    navigate(`/productdetails/${product._id}`);
  };
  const handleBuyNow = (product) => {
    addToCart(product);
    navigate(`/checkout`, {
      state: {
        productTitle: product.title,
        productPrice: product.price,
        productImage: BASE_URL + "/" + product.image,
      },
    });
  };
  //  Filter and sort the products based on search term
  // const filteredProducts =
  //   creator?.products
  //     ?.filter((product) =>
  //       product.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //     .sort((a, b) => b.title.localeCompare(a.title)) || [];
  const filteredProducts =
    creator?.products
      ?.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.title?.localeCompare(a.title)) || [];

  return (
    <div className="flex flex-col items-center justify-center w-full lg:max-w-3xl lg:mx-auto lg:p-8 xl:max-w-2xl xl:p-4">
      <div className="w-full">
        {creator && (
          <div className="flex flex-col items-center m-4">
            <img
              src={BASE_URL + "/" + creator.image}
              alt=""
              className="w-32 h-32 rounded-full border border-purple-500"
            />
            <h1 className="text-3xl font-bold m-2">{creator.username}</h1>
            <p className="text-lg text-center m-2">{creator.bio}</p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 m-4">
              {creator?.snapchat && (
                <a
                  href={creator.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 hover:text-yellow-300"
                >
                  <FaSnapchat size={24} />
                </a>
              )}
              {creator?.twitter && (
                <a
                  href={creator.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-white"
                >
                  <FaSquareXTwitter size={24} />
                </a>
              )}
              {creator?.instagram && (
                <a
                  href={creator.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-800 hover:text-pink-800"
                >
                  <FaInstagram size={24} />
                </a>
              )}
              {creator?.instagram && (
                <a
                  href={creator.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-pink-700"
                >
                  <FaTiktok size={24} />
                </a>
              )}
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        )}

        {/* Toggle View Buttons */}
        <div className="flex justify-end mb-4">
          <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
            <button
              className={`inline-flex items-center justify-center w-10 h-10 transition-colors duration-300 ease-in focus:outline-none ${
                isGridView ? "active" : ""
              }`}
              onClick={() => setIsGridView(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fill-current w-4 h-4"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              className={`inline-flex items-center justify-center w-10 h-10 transition-colors duration-300 ease-in focus:outline-none ${
                !isGridView ? "active" : ""
              }`}
              onClick={() => setIsGridView(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fill-current w-4 h-4"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Display Products */}
        <div
          className={`pb-96 w-full ${
            isGridView ? "grid grid-cols-2 gap-2" : "flex flex-col"
          }`}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`card bg-base-100 shadow-xl mb-3 cursor-pointer ${
                isGridView ? "" : "w-full"
              }`}
              onClick={() => handleCardClick(product)}
            >
              <img src={BASE_URL + "/" + product.image} alt={product.title} />
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                {/* <p
                  className={
                    expandedProductIds.includes(product.id)
                      ? ""
                      : "truncate-text"
                  }
                >
                  {product.description}
                </p> */}
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDescription(product.id);
                  }}
                >
                  {expandedProductIds.includes(product.id)
                    ? "Show Less"
                    : "Show More"}
                </button> */}
                <h2 className="card-title">{product.price} KD</h2>
                <div
                  className="card-actions flex justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="btn btn-primary btn-sm"
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
                    className="btn btn-primary btn-sm"
                    type="button"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-4">
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

export default CreatorsLink;
