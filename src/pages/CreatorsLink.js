import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsByCreator } from "../api/auth";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";
import UserContext from "../context/UserContext";
import { FaInstagram, FaSnapchat, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const CreatorsLink = () => {
  const { creatorUsername } = useParams();
  const { addToCart, setUser, isInCart } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const [isGridView, setIsGridView] = useState(false);

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

  const filteredProducts =
    creator?.products
      ?.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.title?.localeCompare(a.title)) || [];

  return (
    <div className="flex flex-col pt-6  items-center justify-center w-full lg:w-2/3 xl:w-1/2 mx-auto lg:mx-auto bg-custom-gray">
      <div className="w-full ">
        {creator && (
          <div className="flex flex-row rounded-full">
            <div className="p-2 w-[30%] flex justify-center items-center">
              <img
                src={BASE_URL + "/" + creator.image}
                alt=""
                className="w-20 h-20 object-cover rounded-full border border-custom-primary-button"
              />
            </div>
            <div className="w-[70%] rounded-full">
              <h1 className="text-xl font-bold px-2 ">{creator.name}</h1>
              <p className="text-lg px-2">{creator.bio}</p>
              <div className="flex space-x-4 px-2 py-2  ">
                {creator?.snapchat && (
                  <a
                    href={`https://${creator.snapchat}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-600"
                  >
                    <FaSnapchat size={24} />
                  </a>
                )}
                {creator?.twitter && (
                  <a
                    href={`https://${creator.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-black"
                  >
                    <FaSquareXTwitter size={24} />
                  </a>
                )}
                {creator?.instagram && (
                  <a
                    href={`https://${creator.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700"
                  >
                    <FaInstagram size={24} />
                  </a>
                )}

                {creator?.TikTok && (
                  <a
                    href={`https://${creator.TikTok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-back"
                  >
                    <FaTiktok size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Toggle View Buttons */}
        <div className="flex justify-center items-center pt-4  w-[85%] ml-auto mr-auto gap-1">
          <div className="flex items-center  w-full">
            <label className="input input-bordered flex items-center rounded-[12px] w-full ">
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
                className="h-4 w-4 opacity-100 text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`flex items-center justify-center w-10 h-10 transition-colors duration-300 ease-in focus:outline ${
                isGridView ? "active bg-gray-200" : "bg-transparent"
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

            <div className="bg-gray-300 w-px h-6"></div>

            <button
              className={`flex items-center justify-center w-10 h-10 transition-colors duration-300 ease-in focus:outline-none ${
                !isGridView ? "active bg-gray-200" : "bg-transparent"
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
          className={`pb-80 w-[85%] ${
            isGridView
              ? "flex flex-row gap-3  ml-auto mr-auto justify-between flex-wrap "
              : "flex flex-col items-center ml-auto mr-auto"
          }`}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className={`flex justify-center     ${
                isGridView ? "w-[48%]" : "w-full"
              }`}
            >
              <div
                className={`bg-base-100 shadow-2xl cursor-pointer mt-8 border rounded-[30px] ${
                  isGridView
                    ? "w-[100%] lg:w-[200px] flex flex-col "
                    : "w-[100%] flex flex-row justify-center items-center"
                }`}
                onClick={() => handleCardClick(product)}
              >
                {/* IMAGE */}
                <div
                  className={`  ${
                    isGridView
                      ? "aspect-square h-[200px]  p-5"
                      : "h-full w-[300px]  p-5"
                  }`}
                >
                  <img
                    className="h-full w-full rounded-[22px]  object-cover "
                    src={BASE_URL + "/" + product.image}
                    alt={product.title}
                  />
                </div>
                {/* CONTENT */}
                <div className="w-full p-5 flex flex-col justify-between text-overflow min-h-[20vh] ">
                  <h2 className="mb-8 font-bold  ">{product.title}</h2>

                  <div
                    className="flex flex-col justify-between gap-1 items-center "
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="flex  font-bold w-full  mr-auto gap-1">
                      <span>{product.price}</span> <span> KD</span>
                    </h2>
                    <div className="flex items-center mr-auto flex-row-reverse">
                      <button
                        className={`flex flex-row py-2 px-2 rounded-full ${
                          isInCart(product._id)
                            ? "border-green-500 "
                            : "bg-transparent"
                        }`}
                        onClick={() => addToCart(product)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={`${
                            isInCart(product._id) ? "#fb543c" : "#000000"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={isInCart(product._id) ? "3" : "2"}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </button>
                      <div>
                        <button
                          className="bg-custom-color-button whitespace-nowrap border rounded-3xl px-6 py-2 shadow-2xl text-gray-100 text-sm"
                          type="button"
                          onClick={() => handleBuyNow(product)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
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
