import React from "react";

const generateUsername = (name) => {
  const base = name.toLowerCase().replace(/\s+/g, ".");
  const randomNum = Math.floor(Math.random() * 10000);
  return `${base}${randomNum}`;
};

const UserSelectField = ({ users, selectedUser, onSelect, searchTerm = "" }) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  // Check if exact name already exists
  const hasExactMatch = users.some(
    (user) => user.name.toLowerCase() === normalizedSearch
  );

  // Suggest custom user if needed
  const customInputUser =
    normalizedSearch && !hasExactMatch
      ? [
          {
            userId: "custom-" + normalizedSearch,
            name: searchTerm.trim(),
            username: generateUsername(searchTerm),
            avatar: null,
            initial: searchTerm.charAt(0).toUpperCase(),
          },
        ]
      : [];

  // Exact/substring matches
  const substringMatches = users.filter(
    (user) =>
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.username.toLowerCase().includes(normalizedSearch)
  );

  // Closest (startsWith) matches not already included
  const closestMatches = users.filter(
    (user) =>
      !substringMatches.includes(user) &&
      (user.name.toLowerCase().startsWith(normalizedSearch) ||
        user.username.toLowerCase().startsWith(normalizedSearch))
  );

  // Combine all
  const finalList = [...customInputUser, ...substringMatches, ...closestMatches];

  return (
    <div className="space-y-2">
      {finalList.map((user) => {
        const isSelected = selectedUser?.userId === user.userId;

        return (
          <div
            key={user.userId}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-150 ${
              isSelected ? "bg-gray-900" : "bg-black"
            } hover:bg-gray-700`}
            onClick={() => onSelect(user)}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500">
                <span className="text-white font-bold">{user.initial}</span>
              </div>
            )}

            <div className="flex-1 text-white">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-400">${user.username}</div>
            </div>

            <input
              type="checkbox"
              checked={isSelected}
              readOnly
              className="w-5 h-5 text-blue-500"
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserSelectField;
