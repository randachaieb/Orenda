import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({});
  const [search, setSearch] = useState(true);

  useEffect(async () => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth({ token });
      axios
        .get("/api/v1/user/me", {
          headers: {
            "Content-Type": "multipart/form-data;",
            "x-auth-token": localStorage.getItem("token"),
          },
        })

        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => err.message);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, user, setUser, setSearch, search }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
