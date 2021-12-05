import { ClientFormModel } from "../../components/clientTable/types";
import { ProductTemplateFormModel } from "../../components/productTable/types";
import request from "../../helpers/request";
import { translateToPostFormModel } from "../products/translatorProduct";


export const getLogisticUnits = () => (dispatch: any) => {
  dispatch({type: "LOGISTIC_UNIT_LOADING"});

  return request().get(
    "/storages/v1/logistic_units/",
    {
      headers: { Authorization: `Token ${localStorage.token}`}}
  )
  .then((resp) => {
    dispatch({
      type: "LOGISTIC_UNIT_SUCCESS",
      payload: resp.data
    });
  })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "LOGISTIC_UNIT_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}


export const postLogisticUnitMovement = (logistic_unit: number, storage_type: number, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]) => (dispatch: any) => {
  return request().post(
    `/storages/v1/logistic_units/${logistic_unit}/move/`,
    {storage_type: storage_type},
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      console.log(resp)
      dispatch({
        type: "PRODUCT_UPDATE",        
        payload: translateToPostFormModel(resp.data, suppliers, templates), 
      });
    dispatch({type: "PRODUCT_SUCCESS"})
    })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "PRODUCT_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}