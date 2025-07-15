import React from "react";
import { ChevronDown } from "lucide-react";

const PaymentOption = ({ label = "Use", logoSrc, balanceText, onClick }) => {
  return (
    <div
      className="flex items-center justify-between w-full text-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <span>{label}</span>
        <span className="flex items-center gap-1 text-gray-100">
          <img src={logoSrc} alt="Logo" className="h-6" />
          {balanceText}
        </span>
      </div>

     <span className="text-gray-400">
        <ChevronDown size={16} />
      </span>
    </div>
  );
};

export default PaymentOption;
