import React from "react";

const FileInput = ({ name, handleOnChange }) => {
  return (
    <div className="w-full h-full">
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        name={name}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default FileInput;
