"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./header";

const MobileLayout = ({ children, amount = "Rs. 0.00", onClose, onPay }) => {
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex flex-col">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1 shadow-sm">

        <Header amount={amount} onClose={onClose} onPay={onPay} pathname={pathname} />

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-4">
          {children}
        </main>

      </div>
    </div>
  );
};

export default MobileLayout;
