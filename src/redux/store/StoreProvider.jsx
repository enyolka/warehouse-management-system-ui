import React, { createContext, useReducer, useEffect, useMemo } from "react";
import customersReducer, { customersInitialState } from "../customers/reducer";
import {
  getCustomers,
} from "../customers/action";
import {
  getSuppliers,
} from "../suppliers/action";
import supplierReducer, { supplierInitialState } from "../suppliers/reducer";
import loginReducer, { loginInitialState } from "../login/reducer";
import userReducer, { userInitialState } from "../users/reducer";
import {productTemplatesReducer, productTemplatesInitialState} from "../productTemplates/reducer"
import { getProductTemplates } from "../productTemplates/action";
import {productsReducer, productsInitialState} from "../products/reducer"
import {storagesReducer, storagesInitialState} from "../storage/reducer"
import {logisticUnitsReducer, logisticUnitsInitialState} from "../logisticUnit/reducer"
import { getProducts } from "../products/action";
import { getUsers } from "../users/action";
import { getStorages } from "../../redux/storage/action";
import { ProductFormModel } from "../../components/productTable/types";
import { getLogisticUnits } from "../logisticUnit/action";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => { 
  const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState)
  const [userState, userDispatch] = useReducer(userReducer, userInitialState)
  const [customersState, customersDispatch] = useReducer(customersReducer, customersInitialState)
  const [suppliersState, suppliersDispatch] = useReducer(supplierReducer, supplierInitialState)
  const [productTemplatesState, productTemplatesDispatch] = useReducer(productTemplatesReducer, productTemplatesInitialState)
  const [productsState, productsDispatch] = useReducer(productsReducer, productsInitialState)
  const [logisticUnitsState, logisticUnitsDispatch] = useReducer(logisticUnitsReducer, logisticUnitsInitialState)
  const [storageState, storageDispatch] = useReducer(storagesReducer, storagesInitialState)


  const extraData = useMemo(
    () => ({
      suppliers: suppliersState.data,
      templates: productTemplatesState.data,
    }),
    [suppliersState, productTemplatesState]
  );

  useEffect(() => {
    if(localStorage.token) {
      getUsers()(userDispatch);
      getCustomers()(customersDispatch);
      getSuppliers()(suppliersDispatch);
      getProductTemplates()(productTemplatesDispatch)
      getProducts(extraData.suppliers, extraData.templates)(productsDispatch);
      getLogisticUnits()(logisticUnitsDispatch);
      getStorages()(storageDispatch)
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
      productsDispatch, 
      logisticUnitsState,
      logisticUnitsDispatch,
      storageState, 
      storageDispatch  
      }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
