'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, Delete } from 'lucide-react';

const NumpadPage = () => {
  const [amount, setAmount] = useState('0');
  const router = useRouter();

  const updateAmount = (digit) => {
    if (amount === '0') setAmount(digit);
    else if (amount.length < 9) setAmount(amount + digit);
  };

  const handleClear = () => setAmount('0');
  const handleBackspace = () =>
    setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');

  const handleGo = (type) => {
    const amt = Number(amount || '0');
    router.push(`/${type}?amount=${amt}`);
  };

  const formattedAmount = `$${Number(amount).toLocaleString()}`;

  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col justify-between items-center px-4 py-6">
      <div
        className="text-5xl sm:text-3xl font-bold text-center mt-20 cursor-pointer select-none"
        onClick={handleClear}
      >
        {formattedAmount}
      </div>

      <div className="w-full max-w-sm grid grid-cols-3 gap-4 my-10">
        {[...'123456789'].map((n) => (
          <button
            key={n}
            className="aspect-square flex items-center justify-center text-xl bg-white/5 rounded-lg hover:bg-white/10 transition"
            onClick={() => updateAmount(n)}
          >
            {n}
          </button>
        ))}
        <button
          className="aspect-square flex items-center justify-center text-2xl text-gray-400 bg-white/5 rounded-lg hover:bg-white/10 transition"
          onClick={handleClear}
        >
          ✕
        </button>
        <button
          className="aspect-square flex items-center justify-center text-2xl bg-white/5 rounded-lg hover:bg-white/10 transition"
          onClick={() => updateAmount('0')}
        >
          0
        </button>
        <button
          className="aspect-square flex items-center justify-center text-2xl text-gray-400 bg-white/5 rounded-lg hover:bg-white/10 transition"
          onClick={handleBackspace}
        >
          <Delete className="w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-4 justify-center w-full max-w-sm">
        <button
          className="flex-1 py-3 rounded-full text-white font-semibold text-base bg-gradient-to-br from-[#2b1035] to-[#30163d] hover:opacity-90 transition"
          onClick={() => handleGo('request')}
        >
          Request
        </button>
        <button
          className="flex-1 py-3 rounded-full text-white font-semibold text-base bg-gradient-to-br from-[#2b1035] to-[#30163d] hover:opacity-90 transition"
          onClick={() => handleGo('pay')}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default NumpadPage;
