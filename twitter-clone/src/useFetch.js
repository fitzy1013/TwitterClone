import React, { useState, useEffect } from "react";
import axios from "axios";

const useFetchUserInfo = (username) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/users/${username}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }, []);

  return user;
};

export default useFetchUserInfo;
