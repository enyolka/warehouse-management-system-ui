import { LogisticUnitModel } from "../../api/apiModel";
import { ClientFormModel } from "../../components/clientTable/types";
import { ProductTemplateFormModel } from "../../components/productTable/types";
import request from "../../helpers/request";
import { translateToFormModelLU, translateToPostFormModel } from "../products/translatorProduct";


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
    return translateToFormModelLU(resp.data)
  })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "LOGISTIC_UNIT_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}


export const postLogisticUnitMovement = (logistic_unit: number, storage_type: number, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[], customer?: number, customers?: ClientFormModel[]) => (dispatch: any) => {
  return request().post(
    `/storages/v1/logistic_units/${logistic_unit}/move/`,
    {storage_type: storage_type,
    customer: customer},
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "PRODUCT_UPDATE",        
        payload: translateToPostFormModel(resp.data, suppliers, templates, customers), 
      });
    dispatch({type: "PRODUCT_SUCCESS"})
    return translateToPostFormModel(resp.data, suppliers, templates, customers);
    })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "PRODUCT_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const postDocuments = (logistic_units: number[], customer: number, type: "admission" | "release") => (dispatch: any) => {
  return request().post(
    `/storages/v1/logistic_units/documents/${type}/`,
    {logistic_units: logistic_units,
    client: customer},
     { headers: { Authorization: `Token ${localStorage.token}`},
     }
  ).then(
    resp => {
    dispatch({
      type: "LOGISTIC_UNIT_UPDATE",
      payload: resp.data
    }); })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "LOGISTIC_UNIT_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}