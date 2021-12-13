import { LogisticUnitModel } from "../../api/apiModel";
import { LogisticUnitSetStore } from "./store";

export const logisticUnitsInitialState: LogisticUnitSetStore = {
  loading: false,
  data: [],
  error: "",
}


const logisticUnitsReducer = (state = logisticUnitsInitialState, action: any) => {
  switch (action.type)
 { 
  case "LOGISTIC_UNIT_LOADING":
    return {
        ...state,
        error: false,
        loading: true,
    };
    case "LOGISTIC_UNIT_SUCCESS":
      return {
          ...state,
          loading: false,
          data: action.payload,
      };
    case "LOGISTIC_UNIT_CREATE":
      return {
          ...state,
          error: false,
          loading: true,
          data: [...state.data].concat(action.payload),
      };
      case "LOGISTIC_UNIT_UPDATE":
        const updatedData = state.data.map(unit => {
          if (unit.id === action.payload.id) {
            return action.payload;
          }
          return unit ;
        })
        return {
            ...state,
            error: false,
            loading: true,
            data: updatedData
        };
    case "LOGISTIC_UNIT_ERROR":
      return {
          ...state,
          loading: false,
          error: action.payload,
      };

   default:
     return state
 }
}

export { logisticUnitsReducer }