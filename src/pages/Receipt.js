import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { getReceiptById } from "../api/receipt";

const Receipt = () => {
  const { receiptId } = useParams();

  const { data: receipt, isLoading } = useQuery({
    queryKey: ["receipt", receiptId],
    queryFn: () => getReceiptById(receiptId),
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!receipt) {
    return <div>Receipt not found</div>;
  }
  return (
    <div className="artboard flex justify-center p-10">
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-10 rounded-lg shadow-lg h-full">
          <h1 className="text-xl font-bold mb-10">
            Thank You for Your Purchase! from
            <h1 className="text-3xl font-bold p-4 text-blue-800">
              {receipt.creator.username}
            </h1>
          </h1>
          <h2 className="text-2xl font-bold flex justify-center mb-10">
            Total: {receipt.totalAmount} KD
          </h2>
          <h1 className="text-3xl font-bold p-4 text-blue-800">
            {receipt.customerName}
          </h1>

          <h1 className="text-3xl font-bold p-4 text-blue-800">
            {receipt.customerEmail}
          </h1>

          <p className="text-lg mb-10">
            We appreciate your business and hope you enjoy your purchase.
          </p>
          {/* <button
            className="btn btn-primary text-white"
            onClick={() => navigate(`/${receipt.creatorId}`)}
          >
            Go Back to Shopping
          </button> */}
          <div className="w-full flex justify-center mt-9">
            <button onClick={() => navigate(`/customersupport`)}>
              <h4 className="text-m text-gray-500 flex justify-start">
                Contact Us
              </h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
