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
import userReducer, { userInitialState } from "../users/reducer";
import {productTemplatesReducer, productTemplatesInitialState} from "../productTemplates/reducer"
import { getProductTemplates } from "../productTemplates/action";
import {productsReducer, productsInitialState} from "../products/reducer"
import { getProducts } from "../products/action";
import { getUsers } from "../users/action";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => { 
  const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState)
  const [userState, userDispatch] = useReducer(userReducer, userInitialState)
  const [customersState, customersDispatch] = useReducer(customersReducer, customersInitialState)
  const [suppliersState, suppliersDispatch] = useReducer(supplierReducer, supplierInitialState)
  const [productTemplatesState, productTemplatesDispatch] = useReducer(productTemplatesReducer, productTemplatesInitialState)
  const [productsState, productsDispatch] = useReducer(productsReducer, productsInitialState)

  useEffect(() => {
    if(localStorage.token) {
      getUsers()(userDispatch);
      getCustomers()(customersDispatch);
      getSuppliers()(suppliersDispatch);
      getProductTemplates()(productTemplatesDispatch)
      getProducts(suppliersState.data)(productTemplatesDispatch)
  }}, [loginState.data]);

  return (
    <StoreContext.Provider value={{ 
      loginState, 
      loginDispatch, 
      userState,
      userDispatch,
      customersState, 
      customersDispatch, 
      suppliersState, 
      suppliersDispatch, 
      productTemplatesState, 
      productTemplatesDispatch,
      productsState, 
      productsDispatch  
      }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
