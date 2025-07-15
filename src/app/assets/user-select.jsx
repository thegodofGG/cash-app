// assets/user-select.js

import React from "react";

const UserSelectField = ({ users, selectedUser, onSelect, searchTerm = "" }) => {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2">
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-colors duration-150 ${
            selectedUser?.id === user.id ? "bg-gray-700" : "bg-gray-800"
          }`}
          onClick={() => onSelect(user)}
        >
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full"
            style={{
              backgroundColor:
                user.id === 1
                  ? "#A855F7"
                  : user.id === 2
                  ? "#34D399"
                  : "#FBBF24",
            }}
          >
            <span className="text-white font-bold">{user.initial}</span>
          </div>
          <div className="flex-1 text-white">
            <div>{user.name}</div>
            <div className="text-gray-400 text-sm">{user.username}</div>
          </div>
          <input
            type="checkbox"
            checked={selectedUser?.id === user.id}
            readOnly
            className="w-5 h-5 text-blue-600"
          />
        </div>
      ))}
    </div>
  );
};

export default UserSelectField;
