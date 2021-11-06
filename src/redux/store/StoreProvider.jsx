import React, { createContext, useReducer } from "react";
import customersReducer, { customersInitialState } from "../customers/reducer";
import loginReducer, { loginInitialState } from "../login/reducer";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState)
  const [customersState, customersDispatch] = useReducer(customersReducer, customersInitialState)
  const [suppliersState, suppliersDispatch] = useReducer(customersReducer, customersInitialState)

  return (
    <StoreContext.Provider value={{ loginState, loginDispatch, customersState, customersDispatch, suppliersState, suppliersDispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
