import { CustomersSetStore } from "./store";
import { translateCustomersData } from "./translatorCustomers";

export const customersInitialState: CustomersSetStore = {
  loading: false,
  data: [],
  error: "",
}


const customersReducer = (state = customersInitialState, action: any) => {
  switch (action.type)
 { 
  case "CUSTOMERS_LOADING":
    return {
        ...state,
        error: false,
        loading: true,
    };
    case "CUSTOMERS_SUCCESS":
      return {
          ...state,
          loading: false,
          data: translateCustomersData(action.payload),
      };

    case "CUSTOMERS_ERROR":
      return {
          ...state,
          loading: false,
          error: action.payload,
      };

   default:
     return state
 }
}

export default customersReducer;