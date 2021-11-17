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
import {productTemplatesReducer, productTemplatesInitialState} from "../productTemplates/reducer"
import { getProductTemplate } from "../productTemplates/action";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState)
  const [customersState, customersDispatch] = useReducer(customersReducer, customersInitialState)
  const [suppliersState, suppliersDispatch] = useReducer(supplierReducer, supplierInitialState)
  const [productTemplatesState, productTemplatesDispatch] = useReducer(productTemplatesReducer, productTemplatesInitialState)

  useEffect(() => {
    if(localStorage.token) {
    getCustomers()(customersDispatch);
    getSuppliers()(suppliersDispatch);
    getProductTemplate(suppliersState.data)(productTemplatesDispatch)
  }}, [loginState.data]);

  return (
    <StoreContext.Provider value={{ 
      loginState, 
      loginDispatch, 
      customersState, 
      customersDispatch, 
      suppliersState, 
      suppliersDispatch, 
      productTemplatesState, 
      productTemplatesDispatch 
      }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
