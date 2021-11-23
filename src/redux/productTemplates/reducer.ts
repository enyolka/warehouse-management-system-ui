import { ProductTemplateSetStore } from "./store";

export const productTemplatesInitialState: ProductTemplateSetStore = {
  loading: false,
  data: [],
  error: "",
}


const productTemplatesReducer = (state = productTemplatesInitialState, action: any) => {
  switch (action.type)
 { 
  case "PRODUCT_TEMPLATE_LOADING":
    return {
        ...state,
        error: false,
        loading: true,
    };
    case "PRODUCT_TEMPLATE_SUCCESS":
      return {
          ...state,
          loading: false,
          data: action.payload || state.data,
      };
    case "PRODUCT_TEMPLATE_CREATE":
    return {
        ...state,
        error: false,
        loading: true,
        data: [...state.data].concat(action.payload),
    };
    case "PRODUCT_TEMPLATE_UPDATE":
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
    case "PRODUCT_TEMPLATE_DELETE":
      const reducedData = state.data.filter(element => element.id !== action.payload)
      return {
          ...state,
          error: false,
          loading: true,
          data: reducedData,
      };
    case "PRODUCT_TEMPLATE_ERROR":
      return {
          ...state,
          loading: false,
          error: action.payload,
      };

   default:
     return state
 }
}

export { productTemplatesReducer }