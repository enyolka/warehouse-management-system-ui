import { ProductSetStore } from "./store";

export const productsInitialState: ProductSetStore = {
  loading: false,
  data: [],
  error: "",
}


const productsReducer = (state = productsInitialState, action: any) => {
  switch (action.type)
 { 
  case "PRODUCT_LOADING":
    return {
        ...state,
        error: false,
        loading: true,
    };
    case "PRODUCT_SUCCESS":
      return {
          ...state,
          loading: false,
          data: action.payload || state.data,
      };
    case "PRODUCT_CREATE":
    return {
        ...state,
        error: false,
        loading: true,
        data: [...state.data].concat(action.payload),
    };
    case "PRODUCT_UPDATE":
      const updatedData = state.data.map(prod => {
        if (prod.id === action.payload.id) {
          return action.payload;
        }
        return prod ;
      })
      return {
          ...state,
          error: false,
          loading: true,
          data: updatedData
      };
    case "PRODUCT_DELETE":
      const reducedData = state.data.filter(element => element.id !== action.payload)
      return {
          ...state,
          error: false,
          loading: true,
          data: reducedData,
      };
    case "PRODUCT_ERROR":
      return {
          ...state,
          loading: false,
          error: action.payload,
      };

   default:
     return state
 }
}

export { productsReducer }