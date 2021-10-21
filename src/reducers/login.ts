const login = (state: any, action: any) => {
  switch (action.type)
 { 
  case "LOGIN_LOADING":
    return {
      ...state,
      login: {
        ...state.login,
        error: false,
        loading: true,
      },
    };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          data: action.payload,
        },
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: action.payload,
        },
      };

      case "LOGOUT_USER": {
        return {
          ...state,
          login,
        };
      }
   default:
     return state
 }
}

export default login;