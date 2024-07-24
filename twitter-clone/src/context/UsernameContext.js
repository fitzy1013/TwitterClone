import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";

// Create a Context
const UsernameContext = createContext(null);

export const useUsername = () => useContext(UsernameContext);

const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      setUsername(auth().username);
    }
  }, [isAuthenticated, navigate, auth]);

  return (
    <UsernameContext.Provider value={username}>
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameProvider;
