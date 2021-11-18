import { ProductSetStore } from "./store";

export const productsInitialState: ProductSetStore = {
  loading: false,
  data: [],
  error: "",
}


const productsReducer = (state = productsInitialState, action: any) => {
  switch (action.type)
 { 
  case "PRODUCT__LOADING":
    return {
        ...state,
        error: false,
        loading: true,
    };
    case "PRODUCT__SUCCESS":
      console.log(action.payload)
      return {
          ...state,
          loading: false,
          data: action.payload || state.data,
      };
    case "PRODUCT__CREATE":
      console.log(action.payload)
    return {
        ...state,
        error: false,
        loading: true,
        data: [...state.data].concat(action.payload),
    };
    case "PRODUCT__UPDATE":
      console.log(action.payload)
      const updatedData = state.data.map(prod => {
        if (prod.id === action.payload[0].id) {
          return action.payload[0];
        }
        return prod ;
      })
      return {
          ...state,
          error: false,
          loading: true,
          data: updatedData
      };
    case "PRODUCT__DELETE":
      const reducedData = state.data.filter(element => element.id !== action.payload)
      return {
          ...state,
          error: false,
          loading: true,
          data: reducedData,
      };
    case "PRODUCT__ERROR":
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