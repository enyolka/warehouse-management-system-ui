import { Axios } from "axios";
import React, { createContext, useState, useEffect } from "react";

import request from "../helpers/request";

export const StoreContext = createContext();

// type Props = {
//   children: any;
// };

const StoreProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  // const fetchData = async () => {
  //   const { data } = await request.get("/v1/users/token/", {
  //     params: {
  //       username: "emilia",
  //       password: "admin000",
  //     },
  //   });
  //   setToken(data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const config = {
  //   headers: { Authorization: `Token ${token}` },
  // };

  // request
  //   .post(
  //     "http://localhost:8000/api/v1/get_token_payloads",
  //     // bodyParameters,
  //     config
  //   )
  //   .then(console.log)
  //   .catch(console.log);

  return (
    <StoreContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
