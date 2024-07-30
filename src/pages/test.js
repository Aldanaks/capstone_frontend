// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import { useNavigate, useParams } from "react-router";
// import { getReceiptById } from "../api/receipt";

// const Receipt = () => {
//   const { receiptId } = useParams();

//   const { data: receipt, isLoading } = useQuery({
//     queryKey: ["receipt", receiptId],
//     queryFn: () => getReceiptById(receiptId),
//   });

//   const navigate = useNavigate();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!receipt) {
//     return <div>Receipt not found</div>;
//   }

//   return (
//     <div className="min-h-[94vh] flex flex-col justify-center items-center text-gray-800">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-4">Customer Receipt</h1>
//         <div className="mb-6">
//           <p className="text-lg">
//             Thank you for buying from {receipt.creator.continent} creator{" "}
//             {receipt.creator.username}
//           </p>
//         </div>
//         <div className="mb-6">
//           <p className="text-lg font-semibold">Order #</p>
//           <p className="text-lg">{receiptId}</p>
//         </div>
//         <div className="mb-6">
//           <p className="text-lg font-semibold">Name</p>
//           <p className="text-lg">{receipt.customerName}</p>
//         </div>
//         <div className="mb-6">
//           <p className="text-lg font-semibold">Email</p>
//           <p className="text-lg">{receipt.customerEmail}</p>
//         </div>

//         <div className="flex justify-between items-center border-t border-gray-200 pt-6">
//           <p className="text-lg font-semibold">Total</p>
//           <p className="text-2xl font-bold text-custom-primary-button">
//             ${receipt.totalAmount}
//           </p>
//         </div>
//         <button
//           className="w-full bg-custom-color-button text-white py-2 mt-8 rounded-lg"
//           onClick={() => navigate(`/${receipt.creatorId}`)}
//         >
//           Go Back to Shopping
//         </button>
//         <div className="w-full flex justify-center mt-4">
//           <button onClick={() => navigate(`/customersupport`)}>
//             <h4 className="text-m text-gray-500">Contact Us</h4>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Receipt;
