import React from "react";

const LabeledInput = ({ label, value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <label className=" text-gray-100 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 border-b border-gray-700 focus:outline-none focus:border-blue-500 py-1"
      />
    </div>
  );
};

export default LabeledInput;
