import React, { createContext, useReducer, useEffect } from "react";
import customersReducer, { customersInitialState } from "../customers/reducer";
import {
  getCustomers,
} from "../../redux/customers/action";
import {
  getSuppliers,
} from "../../redux/suppliers/action";
import supplierReducer, { supplierInitialState } from "../suppliers/reducer";
import loginReducer, { loginInitialState } from "../login/reducer";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState)
  const [customersState, customersDispatch] = useReducer(customersReducer, customersInitialState)
  const [suppliersState, suppliersDispatch] = useReducer(supplierReducer, supplierInitialState)

  useEffect(() => {
    getCustomers()(customersDispatch);
    getSuppliers()(suppliersDispatch);
  }, []);

  return (
    <StoreContext.Provider value={{ loginState, loginDispatch, customersState, customersDispatch, suppliersState, suppliersDispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
