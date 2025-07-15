"use client";
import React from "react";

const Header = ({ amount, onClose, onPay, pathname }) => {
  return (
    <header className=" text-white text-lg font-semibold px-4 py-3 flex items-center justify-between border-b border-gray-300">
      <button
        className="text-white text-xl"
        aria-label="Close"
        onClick={onClose}
      >
        &#10005;
      </button>

      <div className="text-white text-base sm:text-lg font-medium">
        {amount}
      </div>

      <button
        className="bg-white text-blue-600 font-semibold px-4 py-1 text-sm hover:bg-blue-100 transition rounded-lg"
        onClick={onPay}
      >
        Pay
      </button>
    </header>
  );
};

export default Header;
