
import request from "../helpers/request";

export const login = (username: string, password:string) => (dispatch: any) => {
  dispatch({type: "LOGIN_LOADING"});

  request().post(
    "/users/v1/token/",
    // payload,
    {
      username: username,
      password: password,
      token: "",
    },
    { headers: { "Content-Type": "application/json" } }
  )
  .then((resp) => {
    localStorage.token = resp.data.token;
    request()
      .get("/users/v1/me", {
        headers: { Authorization: `Token ${resp.data.token}` },
      })
      .then((resp) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: resp.data,
        });
        // resp.status === 200 ?? <Redirect to="/dashboard" />;
      })
      .catch((err) => {Promise.reject(err);       
        dispatch({
        type: "LOGIN_ERROR",
        payload: err.response ? err.response.data : "COULD NOT CONNECT",
        });
      });
  })
  .catch((err) => Promise.reject(err));
}