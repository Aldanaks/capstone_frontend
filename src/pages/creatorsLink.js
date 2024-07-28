// without dasiyUI
// import React, { useContext, useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllProductsByCreator } from "../api/auth";
// import { useParams, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api";
// import UserContext from "../context/UserContext";
// import { FaTwitter, FaInstagram } from "react-icons/fa";
// import "tailwindcss/tailwind.css";
// const CreatorsLink = () => {
//   const { creatorUsername } = useParams();
//   const { addToCart, setUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [expandedProductIds, setExpandedProductIds] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const { data: creator } = useQuery({
//     queryKey: ["getAllProductsByCreator", creatorUsername],
//     queryFn: () => getAllProductsByCreator(creatorUsername),
//   });

//   useEffect(() => {
//     setUser(creator);
//   }, [creator, setUser]);

//   const handleCardClick = (product) => {
//     navigate(`/productdetails/${product._id}`);
//   };

//   const handleBuyNow = (product) => {
//     navigate(`/checkout`, {
//       state: {
//         productTitle: product.title,
//         productPrice: product.price,
//         productImage: BASE_URL + "/" + product.image,
//       },
//     });
//   };

//   const toggleDescription = (productId) => {
//     setExpandedProductIds((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   // Filter and sort the products based on search term
//   const filteredProducts =
//     creator?.products
//       ?.filter((product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       .sort((a, b) => b.title.localeCompare(a.title)) || [];

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url(https://example.com/your-image.jpg)" }}
//     >
//       <div className="container mx-auto p-4">
//         <div className="w-full">
//           {creator && (
//             <div className="flex flex-col items-center mb-4">
//               <img
//                 src={BASE_URL + "/" + creator.image}
//                 alt=""
//                 className="w-32 h-32 rounded-full border border-yellow-300"
//               />
//               <h1 className="text-3xl font-bold">{creator.username}</h1>
//               <p className="text-lg text-center">{creator.bio}</p>
//               {/* Social Media Icons */}
//               <div className="flex space-x-4 mt-4">
//                 {creator?.snapchat && (
//                   <a
//                     href={creator.snapchat}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     <FaTwitter size={24} />
//                   </a>
//                 )}
//                 {creator?.twitter && (
//                   <a
//                     href={creator.twitter}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-400 hover:text-blue-600"
//                   >
//                     <FaTwitter size={24} />
//                   </a>
//                 )}
//                 {creator?.instagram && (
//                   <a
//                     href={creator.instagram}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-pink-500 hover:text-pink-700"
//                   >
//                     <FaInstagram size={24} />
//                   </a>
//                 )}
//               </div>
//               {/* Search Bar */}
//               <div className="mb-4 w-full mt-4">
//                 <input
//                   type="text"
//                   placeholder="Search by title"
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}
//           <div className=" gap-4 pb-96 w-full">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-gray-50 w-50 shadow-md rounded-lg overflow-hidden m-2 relative cursor-pointer"
//                 onClick={() => handleCardClick(product)}
//               >
//                 <img
//                   src={BASE_URL + "/" + product.image}
//                   alt={product.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="font-bold text-lg mb-2">{product.title}</h2>
//                   <p
//                     className={
//                       expandedProductIds.includes(product.id)
//                         ? ""
//                         : "truncate-text"
//                     }
//                   >
//                     {product.description}
//                   </p>
//                   <button
//                     className="text-gray-400 text-sm mt-2"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleDescription(product.id);
//                     }}
//                   >
//                     {expandedProductIds.includes(product.id)
//                       ? "Show Less"
//                       : "Show More"}
//                   </button>
//                 </div>
//                 <div className="flex justify-end gap-2 text-sm p-3">
//                   <button
//                     className="bg-blue-700 text-white px-2 py-2 rounded"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart(product);
//                     }}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                       />
//                     </svg>
//                   </button>
//                   <button
//                     className="bg-blue-700 text-white px-2 py-2 rounded"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleBuyNow(product);
//                     }}
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="w-full flex justify-center mt-4 ">
//             <button
//               onClick={() => navigate(`/customersupport`)}
//               className="btn text-white"
//             >
//               <h4 className="text-black">Contact Us</h4>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CreatorsLink;

// with dasiyUI
// import React, { useContext, useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllProductsByCreator } from "../api/auth";
// import { useParams, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api";
// import UserContext from "../context/UserContext";
// import { FaTwitter, FaInstagram } from "react-icons/fa";
// const CreatorsLink = () => {
//   const { creatorUsername } = useParams();
//   const { addToCart, setUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [expandedProductIds, setExpandedProductIds] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const { data: creator } = useQuery({
//     queryKey: ["getAllProductsByCreator", creatorUsername],
//     queryFn: () => getAllProductsByCreator(creatorUsername),
//   });

//   useEffect(() => {
//     setUser(creator);
//   }, [creator, setUser]);

//   const handleCardClick = (product) => {
//     console.log(product);
//     navigate(`/productdetails/${product._id}`);
//   };
//   const handleBuyNow = (product) => {
//     // addToCart(product);
//     navigate(`/checkout`, {
//       state: {
//         productTitle: product.title,
//         productPrice: product.price,
//         productImage: BASE_URL + "/" + product.image,
//       },
//     });
//   };
//   const toggleDescription = (productId) => {
//     setExpandedProductIds((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };
//   const filteredProducts =
//     creator?.products
//       ?.filter((product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       .sort((a, b) => b.title.localeCompare(a.title)) || [];

//   return (
//     <div className="flex flex-col items-center justify-center w-full ">
//       <div className="w-full">
//         {creator && (
//           <div className="flex flex-col items-center mb-4">
//             <img
//               src={BASE_URL + "/" + creator.image}
//               alt=""
//               className="w-32 h-32 rounded-full border border-yellow-300"
//             />
//             <h1 className="text-3xl font-bold">{creator.username}</h1>
//             <p className="text-lg text-center">{creator.bio}</p>
//             {/* Social Media Icons */}
//             <div className="flex space-x-4 mt-4">
//               {creator?.snapchat && (
//                 <a
//                   href={creator.snapchat}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:text-blue-800"
//                 >
//                   <FaTwitter size={24} />
//                 </a>
//               )}
//               {creator?.twitter && (
//                 <a
//                   href={creator.twitter}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-400 hover:text-blue-600"
//                 >
//                   <FaTwitter size={24} />
//                 </a>
//               )}
//               {creator?.instagram && (
//                 <a
//                   href={creator.instagram}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-pink-500 hover:text-pink-700"
//                 >
//                   <FaInstagram size={24} />
//                 </a>
//               )}
//             </div>

//             <div className="mb-4 w-full mt-4">
//               <input
//                 type="text"
//                 placeholder="Search by title"
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         )}
//         <div className="pb-96 w-full">
//           {creator?.products?.map((product) => (
//             <div className="">
//               <div
//                 key={product.id}
//                 className="card bg-base-100 w-full shadow-xl mb-3 cursor-pointer"
//                 onClick={() => handleCardClick(product)}
//               >
//                 {console.log(product.image)}
//                 <img src={BASE_URL + "/" + product.image} alt={product.title} />

//                 <div className="card-body">
//                   <h2 className="card-title">{product.title}</h2>
//                   <p
//                     className={
//                       expandedProductIds.includes(product.id)
//                         ? ""
//                         : "truncate-text"
//                     }
//                   >
//                     {product.description}
//                   </p>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleDescription(product.id);
//                     }}
//                   >
//                     {expandedProductIds.includes(product.id)
//                       ? "Show Less"
//                       : "Show More"}
//                   </button>
//                   <h2 className="card-title">{product.price} KD</h2>
//                   <div
//                     className="card-actions justify-end"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => addToCart(product)}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                         />
//                       </svg>
//                     </button>
//                     <button
//                       className="btn btn-primary"
//                       type="button"
//                       onClick={() => handleBuyNow(product)}
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className="w-full flex justify-center mt-4 ">
//             <button
//               onClick={() => navigate(`/CustomerSupport`)}
//               className="btn text-white"
//             >
//               <h4 className="text-black">Contact Us</h4>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatorsLink;

// with searchbar and dasiyUI

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
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

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
    // addToCart(product);
    navigate(`/checkout`, {
      state: {
        productTitle: product.title,
        productPrice: product.price,
        productImage: BASE_URL + "/" + product.image,
      },
    });
  };

  const toggleDescription = (productId) => {
    setExpandedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts =
    creator?.products
      ?.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        // )
        // .filter(
        //   (product) =>
        //     (!priceRange.min || product.price >= priceRange.min) &&
        //     (!priceRange.max || product.price <= priceRange.max)
      )
      .sort((a, b) => b.title.localeCompare(a.title)) || [];

  return (
    <div className="flex flex-col items-center justify-center w-full ">
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

            <div className="mb-4 w-full mt-4  flex justify-center">
              <input
                type="text"
                placeholder="Search by title"
                className="w-80 p-1 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Filter Bar */}
        {/* <div className="mb-4 w-full mt-4 flex justify-between items-center">
          <input
            type="number"
            placeholder="Min Price"
            className="w-1/2 p-2 border border-gray-300 rounded-lg mr-2"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="w-1/2 p-2 border border-gray-300 rounded-lg"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: e.target.value }))
            }
          />
        </div> */}

        <div className="pb-96 w-full">
          {filteredProducts.map((product) => (
            <div className="" key={product.id}>
              <div
                className="card bg-base-100 w-full shadow-xl mb-3 cursor-pointer"
                onClick={() => handleCardClick(product)}
              >
                {console.log(product.image)}
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
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-center mt-4 ">
            <button
              onClick={() => navigate(`/CustomerSupport`)}
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
