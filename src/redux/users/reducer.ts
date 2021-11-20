import { UserSetStore } from "./store";

export const userInitialState: UserSetStore = {
  loading: false,
  data: [],
  error: false,
}


const userReducer = (state = userInitialState, action: any): UserSetStore => {
  switch (action.type)
 { 
  case "USERS_LOADING":
    return {
        ...state,
        error: false,
        loading: true,
    };
    case "USERS_SUCCESS":
      return {
          ...state,
          loading: false,
          data: action.payload || state.data,
      };
    case "USER_CREATE":
    return {
        ...state,
        error: false,
        loading: true,
        data: [...state.data].concat(action.payload),
    };
    case "USER_UPDATE":
      const updatedData = state.data.map(user => {
        if (user.id === action.payload[0].id) {
          return action.payload[0];
        }
        return user ;
      })
      return {
          ...state,
          error: false,
          loading: true,
          data: updatedData
      };
    case "USER_DELETE":
      const reducedData = state.data.filter(element => element.id !== action.payload)
      return {
          ...state,
          error: false,
          loading: true,
          data: reducedData,
      };
    case "USERS_ERROR":
      return {
          ...state,
          loading: false,
          error: action.payload,
      };

   default:
     return state
 }
}

export default userReducer