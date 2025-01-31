import React, { createContext, useContext, useState } from "react";
import { router } from "expo-router";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle login
  const login = async (mobileNumber, password) => {
    setLoading(true); // Start loading
    setError(""); // Clear previous error
    try {
      const response = await fetch("https://bank-backend-1-4cqz.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      setUser(data); // Set user data
      setIsLogged(true); // Set logged in status
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null); // Clear user data
    setIsLogged(false); // Set logged out status
    setError(""); // Clear error messages (optional)
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        error,
        login, // Expose the login function
        logout, // Expose the logout function
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
