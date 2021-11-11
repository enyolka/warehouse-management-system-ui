import { ClientSetStore } from "./store";

export const supplierInitialState: ClientSetStore = {
  loading: false,
  data: [],
  error: "",
}


const supplierReducer = (state = supplierInitialState, action: any) => {
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
          data: action.payload || state.data,
      };
    case "CUSTOMER_CREATE":
    return {
        ...state,
        error: false,
        loading: true,
        data: [...state.data].concat(action.payload),
    };
    case "CUSTOMER_UPDATE":
      const updatedData = state.data.map(customer => {
        if (customer.id === action.payload[0].id) {
          return action.payload[0];
        }
        return customer ;
      })
      return {
          ...state,
          error: false,
          loading: true,
          data: updatedData
      };
    case "CUSTOMER_DELETE":
      const reducedData = state.data.filter(element => element.id !== action.payload)
      return {
          ...state,
          error: false,
          loading: true,
          data: reducedData,
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

export default supplierReducer