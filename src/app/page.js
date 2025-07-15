"use client";
import React, { useState, useEffect } from "react";
import MobileLayout from "./assets/mobile-layout";
import LabeledInput from "./assets/input";
import PaymentOption from "./assets/payment-option";
import UserSelectField from "./assets/user-select";



const generateUsername = (firstName, lastName) => {
  const randomNum = Math.floor(Math.random() * 10000);
  const cleanFirst = firstName.toLowerCase().replace(/\s+/g, "");
  const cleanLast = lastName.toLowerCase().replace(/\s+/g, "");
  return `${cleanFirst}.${cleanLast}${randomNum}`;
};

const HomePage = () => {
  const [to, setTo] = useState("");
  const [forValue, setForValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchPersonData = async () => {
    try {
      const response = await fetch("/data/persons.json"); // Adjust path as needed
      if (!response.ok) {
        throw new Error("Failed to fetch persons.json");
      }
      const data = await response.json();

      const usersWithUsernames = data.map((user) => {
        if (!user.username || user.username.trim() === "") {
          return {
            ...user,
            username: generateUsername(user.first_name, user.last_name),
            name: `${user.first_name} ${user.last_name}`,
            initial: user.first_name.charAt(0).toUpperCase(),
          };
        }
        return {
          ...user,
          name: `${user.first_name} ${user.last_name}`,
          initial: user.first_name.charAt(0).toUpperCase(),
        };
      });

      setUsers(usersWithUsernames);
    } catch (error) {
      console.error("Error loading person data:", error);
    }
  };

  fetchPersonData();
}, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(to.toLowerCase())
  );

  const handleClose = () => alert("Close clicked!");
  const handlePay = () => alert("Pay clicked!");

  const amount = "Rs. 3,450.00";
  const cashBalance = "$64,272.00";

  return (
    <MobileLayout amount={amount} onClose={handleClose} onPay={handlePay}>
      <div className="flex flex-col gap-4 relative">
        <LabeledInput label="To" value={to} onChange={(e) => setTo(e.target.value)} />

        <LabeledInput label="For" value={forValue} onChange={(e) => setForValue(e.target.value)} />

        <PaymentOption
          logoSrc="/ca.png"
          balanceText={`Cash balance: ${cashBalance}`}
          onClick={() => alert("Payment option clicked")}
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
  );
};

export default HomePage;
