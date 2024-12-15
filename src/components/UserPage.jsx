import React from "react";
import { useLocation } from "react-router";

const UserPage = () => {
  const location = useLocation();
  const user = location.state?.state;

  if (!user) {
    return <div>No user data available.</div>;
  }
  return (
    <div className="user-details-container">
    <div className="user-card">
      <img
        src={`https://robohash.org/${user.login.username}?size=200x200`}
        alt="user-avatar"
        className="user-avatar"
      />
      <h2 className="user-name">
        {user.name.title} {user.name.first} {user.name.last}
      </h2>
      <p className="user-info">Username: {user.login.username}</p>
      <p className="user-info">Email: {user.email}</p>
      <p className="user-info">City: {user.location.city}</p>
      <p className="user-info">State: {user.location.state}</p>
      <p className="user-info">Country: {user.location.country}</p>
      <p className="user-info">Postcode: {user.location.postcode}</p>
    </div>
  </div>
  );
};

export default UserPage;
