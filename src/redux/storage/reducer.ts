import { StoragePlaceModel } from "../../api/apiModel";
import { StorageSetStore } from "./store";

export const storagesInitialState: StorageSetStore = {
  loading: false,
  data: {id: 2, title: 'Admission Storage', storage_type: 1, storageplace_set: []},
  error: "",
}


const storagesReducer = (state = storagesInitialState, action: any) => {
  switch (action.type)
 { 
  case "STORAGE_LOADING":
    return {
        ...state,
        error: false,
        loading: true,
    };
    case "STORAGE_SUCCESS":
      return {
          ...state,
          loading: false,
          data: action.payload,
      };
    case "STORAGE_ERROR":
      return {
          ...state,
          loading: false,
          error: action.payload,
      };

   default:
     return state
 }
}

export { storagesReducer }