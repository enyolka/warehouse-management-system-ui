import { CustomersSetStore } from "./store";

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
          data: action.payload,
      };
    case "CUSTOMER_LOADING":
        return {
            ...state,
            error: false,
            loading: true,
    };
    case "CUSTOMER_CREATE":
    return {
        ...state,
        error: false,
        loading: true,
    };
    case "CUSTOMER_UPDATE":
      return {
          ...state,
          error: false,
          loading: true,
      };
    case "CUSTOMER_DELETE":
      return {
          ...state,
          error: false,
          loading: true,
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