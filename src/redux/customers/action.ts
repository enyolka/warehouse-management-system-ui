import request from "../../helpers/request";

export const getCustomers = () => (dispatch: any) => {
  dispatch({type: "CUSTOMERS_LOADING"});

  request().get(
    "/customers/v1/customers/",
    {
      headers: { Authorization: `Token ${localStorage.token}`}}
  )
  .then((resp) => {
    dispatch({
      type: "CUSTOMERS_SUCCESS",
      payload: resp.data,
    });
  })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "LOGIN_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}