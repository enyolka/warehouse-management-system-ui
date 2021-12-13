import { ClientFormModel } from "../../components/clientTable/types";
import { ProductFormModel, ProductTemplateFormModel } from "../../components/productTable/types";
import request from "../../helpers/request";
import { translateToFormModel, translateToPostApiModel, translateToPostFormModel } from "./translatorProduct";


export const getProducts = (suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]) => (dispatch: any) => {
  dispatch({type: "PRODUCT_LOADING"});

  return request().get(
    "/storages/v1/products/",
    {
      headers: { Authorization: `Token ${localStorage.token}`}}
  )
  .then((resp) => {
    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: translateToFormModel(resp.data, suppliers, templates),
    });
  })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "PRODUCT_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const postProduct = (model: ProductFormModel, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]) => (dispatch: any) => {
  return request().post(
    "/storages/v1/products/",
    translateToPostApiModel(model, suppliers),
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "PRODUCT_CREATE",        
        payload: translateToPostFormModel([resp.data], suppliers, templates), 
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


export const postFromTemplateProduct = (template: number, count: number, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]) => (dispatch: any) => {
  return request().post(
    "/storages/v1/products/from_template/",
    {template_id: template, count: count},
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "PRODUCT_CREATE",        
        payload: translateToPostFormModel(resp.data, suppliers, templates), 
      });
    dispatch({type: "PRODUCT_SUCCESS"})
    return translateToPostFormModel(resp.data, suppliers, templates)
    })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "PRODUCT_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}


export const putProduct = (model: ProductFormModel, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]) => (dispatch: any) => {
  return request().put(
    `/storages/v1/products/${model.id}/`,
    translateToPostApiModel(model, suppliers),
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "PRODUCT_UPDATE", 
        payload: translateToPostFormModel([resp.data], suppliers, templates),
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

export const deleteProduct = (idx: number) => (dispatch: any) => {

  return request().delete(
    `/storages/v1/products/${idx}`,
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(resp => {
     dispatch({
       type: "PRODUCT_DELETE",
       payload: idx
      })
      dispatch({type: "PRODUCT_SUCCESS"})}
    ).catch((err) => {Promise.reject(err);       
    dispatch({
    type: "PRODUCT_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

