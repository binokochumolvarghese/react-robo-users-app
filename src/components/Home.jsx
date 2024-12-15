import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "./Search";
import UserPage from "./UserPage";

const Home = () => {
  const [users, setUsers] = useState([]); // List of users
  const [loading, setLoading] = useState(false); // API loading state
  const [pageNumber, setPageNumber] = useState(1); // Tracks page for pagination
  const [hasMore, setHasMore] = useState(true); // Checks if more users are available
  const observer = useRef(); // Ref for infinite scroll
  const [isSearching, setIsSearching] = useState(false); // Tracks search mode

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://randomuser.me/api/?page=${pageNumber}&results=10`
      );
      setUsers((prevUsers) => [...prevUsers, ...data.results]); // Append new data
      setHasMore(data.results.length > 0); // Check if results are empty
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to search the user
  const searchUser = (searchText) => {
    if (searchText.trim() !== "") {
      setIsSearching(true); // Activate search mode
      const filteredUsers = users.filter(
        (user) =>
          user.name.first
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          user.name.last.toLowerCase().includes(searchText.trim().toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setIsSearching(false); // Exit search mode
      setUsers([]); // Reset users before fetching again
      setPageNumber(1);
      setHasMore(true);
    }
  };

  // Infinite scroll: IntersectionObserver callback
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading || !hasMore || isSearching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, isSearching]
  );

  // Fetch data when pageNumber changes
  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  return (
    <div className="user-list-container">
    <div className="search-bar">
      <Search users={users} searchUser={searchUser} />
    </div>
    <div className="user-cards">
      {users.map((user, index) => {
        const isLastUser = users.length === index + 1;
        return (
          <div
            className="user-card-wrapper"
            key={user.login.uuid}
            ref={isLastUser ? lastPostElementRef : null}
          >
            <Link to="/UserPage" state={{ state: user }}>
              <div className="user-card">
                <img
                  alt="robots"
                  src={`https://robohash.org/${user.login.username}?size=200x200`}
                  className="user-avatar"
                />
                <h3 className="user-name">
                  {user.name.title} {user.name.first} {user.name.last}
                </h3>
                <p className="user-info">{user.login.username}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  
    {loading && <h4 className="loading-text">Loading...</h4>}
    {!hasMore && <h4 className="loading-text">No more users to load.</h4>}
  </div>
  
  );
};

export default Home;
