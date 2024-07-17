import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-full rounded-lg bg-blue-700 flex justify-center items-center cursor-pointer hover:bg-blue-500 text-white"
    >
      {label}
    </div>
  );
};

export default Button;
