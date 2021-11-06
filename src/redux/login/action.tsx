import { Redirect } from "react-router-dom";
import request from "../../helpers/request";
import { LoginDataStore } from "./store";

export const login =
  (username: string, password: string) => (dispatch: any) => {
    dispatch({ type: "LOGIN_LOADING" });

    request()
      .post(
        "/users/v1/token/",
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
          .get("/users/v1/me/", {
            headers: { Authorization: `Token ${localStorage.token}` },
          })
          .then((resp) => {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: resp.data,
            });
            // resp.status === 200 ?? <Redirect to="/dashboard" />;
          })
          .catch((err) => {
            Promise.reject(err);
            dispatch({
              type: "LOGIN_ERROR",
              payload: err.response ? err.response.data : "COULD NOT CONNECT",
            });
          });
      })
      .catch((err) => Promise.reject(err));
  };

export const logout = (history: any) => (dispatch: any) => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("username");
  dispatch({
    type: "LOGOUT_USER",
  });
  return <Redirect to="/" />;
};
