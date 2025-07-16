'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MobileLayout from '@/app/assets/mobile-layout';
import LabeledInput from '@/app/assets/input';
import PaymentOption from '@/app/assets/payment-option';
import UserSelectField from '@/app/assets/user-select';
import { generateUsers } from '@/app/assets/fakerUse';

const STORAGE_KEY = 'cashBalance';

const HomePage = () => {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get('amount');
  const amountNumber = Number(amountParam) || 0;

  const [to, setTo] = useState('');
  const [forValue, setForValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isPaying, setIsPaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cashBalance, setCashBalance] = useState(64272);

  useEffect(() => {
    const storedBalance = localStorage.getItem(STORAGE_KEY);
    if (storedBalance !== null) {
      setCashBalance(Number(storedBalance));
    }
  }, []);

  useEffect(() => {
    const fakeUsers = generateUsers(25);
    setUsers(fakeUsers);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(to.toLowerCase()) ||
    user.username.toLowerCase().includes(to.toLowerCase()) ||
    user.email.toLowerCase().includes(to.toLowerCase())
  );

  const handlePay = () => {
    if (amountNumber <= 0) {
      alert('Invalid amount to pay.');
      return;
    }

    if (amountNumber > cashBalance) {
      alert('Insufficient balance.');
      return;
    }

    setIsPaying(true);

    setTimeout(() => {
      const newBalance = cashBalance - amountNumber;
      setCashBalance(newBalance);
      localStorage.setItem(STORAGE_KEY, newBalance.toString());
      setIsPaying(false);
      setShowModal(true);
    }, 2000);
  };

  const handleClose = () => alert('Close clicked!');

  return (
    <>
      {isPaying && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <svg
            className="w-12 h-12 text-white animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 11-6.22-8.66" />
          </svg>
        </div>
      )}

      {showModal && (
<div className="fixed inset-0 z-50 bg-black text-white animate-slideUpFull flex flex-col">
<div className="fixed inset-0 z-50 bg-black text-white animate-slideUpFull flex flex-col">
  {/* Top-left section with amount and message */}
  <div className="p-6 text-left">
<p className="text-gray-300 text-lg mt-2 w-60">
      <h2 className="text-3xl font-bold mb-3 text-green-500">✅
    </h2>
  Your payment of <strong>${amountNumber.toLocaleString()}</strong> has been processed.
</p>
  </div>

  <div className="flex-1" />

  <div className="p-4">
    <button
      onClick={() => setShowModal(false)}
      className="w-full py-3 bg-gray-300 text-black rounded-lg text-lg font-semibold hover:bg-green-700 transition"
    >
      Done
    </button>
  </div>
</div>

  {/* Centered success message */}
  <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">


  </div>

  <div className="p-4">
    <button
      onClick={() => setShowModal(false)}
      className="w-full py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
    >
      Done
    </button>
  </div>
</div>
      )}

      {!isPaying && !showModal && (
        <MobileLayout
          amount={`$${amountNumber.toLocaleString()}`}
          onClose={handleClose}
          onPay={handlePay}
        >
          <div className="flex flex-col gap-4 relative">
            <LabeledInput label="To" value={to} onChange={(e) => setTo(e.target.value)} />
            <LabeledInput label="For" value={forValue} onChange={(e) => setForValue(e.target.value)} />

            <PaymentOption
              logoSrc="/ca.png"
              balanceText={`Cash balance: $${cashBalance.toLocaleString()}`}
              onClick={() => alert('Payment option clicked')}
            />

            <UserSelectField
              users={filteredUsers}
              selectedUser={selectedUser}
              onSelect={(user) => {
                setSelectedUser(user);
                setTo(user.name);
              }}
              searchTerm={to}
            />
          </div>
        </MobileLayout>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes slideUpFull {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0%);
          }
        }
        .animate-slideUpFull {
          animation: slideUpFull 0.4s ease-out forwards;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
};

export default HomePage;
