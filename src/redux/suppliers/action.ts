import { ClientFormModel } from "../../components/clientTable/types";
import request from "../../helpers/request";
import { translateToModel, translatetoApiModel } from "../customers/translatorCustomers";


export const getSuppliers = () => (dispatch: any) => {
  dispatch({type: "CUSTOMERS_LOADING"});

  return request().get(
    "/customers/v1/suppliers/",
    {
      headers: { Authorization: `Token ${localStorage.token}`}}
  )
  .then((resp) => {
    dispatch({
      type: "CUSTOMERS_SUCCESS",
      payload: translateToModel(resp.data),
    });
  })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "CUSTOMERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const postSupplier = (model: ClientFormModel) => (dispatch: any) => {
  return request().post(
    "/customers/v1/suppliers/",
    translatetoApiModel(model),
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "CUSTOMER_CREATE",        
        payload: translateToModel([resp.data]),
      });
    dispatch({type: "CUSTOMERS_SUCCESS"})
    })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "CUSTOMERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const putSupplier = (model: ClientFormModel) => (dispatch: any) => {
  return request().put(
    `/customers/v1/suppliers/${model.id}/`,
    translatetoApiModel(model),
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "CUSTOMER_UPDATE", 
        payload: translateToModel([resp.data]),
      });
      dispatch({type: "CUSTOMERS_SUCCESS"})
    }) 
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "CUSTOMERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const deleteSupplier = (idx: number) => (dispatch: any) => {

  return request().delete(
    `/customers/v1/suppliers/${idx}`,
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(resp => {
     dispatch({
       type: "CUSTOMER_DELETE",
       payload: idx
      })
      dispatch({type: "CUSTOMERS_SUCCESS"})}
    ).catch((err) => {Promise.reject(err);       
    dispatch({
    type: "CUSTOMERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

