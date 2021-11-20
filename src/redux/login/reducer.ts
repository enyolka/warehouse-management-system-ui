import { LoginStore } from "./store";


export const loginInitialState: LoginStore = {
  loading: false,
  data: {
          id: 0,
          username: localStorage.getItem("username") || "",
          email: localStorage.getItem("email") || ""
        },
  error: "",
};

const saveToLocalStorage = (data: any) => {
  try {
    localStorage.setItem("user_id", data.id)
    localStorage.setItem("username", data.username)
    localStorage.setItem("email", data.email)
  } catch(e) {
    console.log(e)
  }
}

const loginReducer = (state = loginInitialState, action: any) => {
  switch (action.type)
 { 
  case "LOGIN_LOADING":
    return {
        ...state,
        error: false,
        loading: true,
    };
    case "LOGIN_SUCCESS":
      saveToLocalStorage(action.payload)
      return {
          ...state,
          loading: false,
          data: action.payload,

      };

    case "LOGIN_ERROR":
      return {
          ...state,
          loading: false,
          error: action.payload,

      };

      case "LOGOUT_USER": {
        return loginInitialState
      }
   default:
     return  state;
 }
}

export default loginReducer;