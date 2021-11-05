import { CustomerFormModel } from "../../components/customers/types";
import request from "../../helpers/request";
import { translateToStore, translatetoApiModel } from "./translatorCustomers";

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
      payload: translateToStore(resp.data),
    });
  })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "CUSTOMERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const postCustomer = (model: CustomerFormModel) => (dispatch: any) => {
  dispatch({type: "CUSTOMER_CREATE"});

  return request().post(
    "/customers/v1/customers/",
    translatetoApiModel(model),
     { headers: { Authorization: `Token ${localStorage.token}`}}
  )
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "CUSTOMERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const deleteCustomer = (idx: number) => (dispatch: any) => {
  dispatch({type: "CUSTOMER_DELETE"});

  return request().delete(
    `/customers/v1/customers/${idx}`,
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).catch((err) => {Promise.reject(err);       
    dispatch({
    type: "CUSTOMERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

