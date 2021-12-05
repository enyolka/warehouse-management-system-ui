import { ClientFormModel } from "../../components/clientTable/types";
import { ProductTemplateFormModel } from "../../components/productTable/types";
import request from "../../helpers/request";
import { translateToFormModel, translateToPostApiModel, translateToPostFormModel } from "./translatorProductTemplate";


export const getProductTemplates = () => (dispatch: any) => {
  dispatch({type: "PRODUCT_TEMPLATE_LOADING"});

  return request().get(
    "/storages/v1/product-templates/",
    {
      headers: { Authorization: `Token ${localStorage.token}`}}
  )
  .then((resp) => {
    dispatch({
      type: "PRODUCT_TEMPLATE_SUCCESS",
      payload: translateToFormModel(resp.data),
    });
  })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "PRODUCT_TEMPLATE_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const postProductTemplate = (model: ProductTemplateFormModel, suppliers: ClientFormModel[]) => (dispatch: any) => {
  return request().post(
    "/storages/v1/product-templates/",
    translateToPostApiModel(model),
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "PRODUCT_TEMPLATE_CREATE",        
        payload: translateToPostFormModel(resp.data, suppliers),
      });
    dispatch({type: "PRODUCT_TEMPLATE_SUCCESS"})
    })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "PRODUCT_TEMPLATE_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const putProductTemplate = (model: ProductTemplateFormModel, suppliers: ClientFormModel[]) => (dispatch: any) => {

  return request().put(
    `/storages/v1/product-templates/${model.id}/`,
    translateToPostApiModel(model),
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "PRODUCT_TEMPLATE_UPDATE", 
        payload: translateToPostFormModel(resp.data, suppliers),
      });
      dispatch({type: "PRODUCT_TEMPLATE_SUCCESS"})
    }) 
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "PRODUCT_TEMPLATE_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const deleteProductTemplate = (idx: number) => (dispatch: any) => {
  return request().delete(
    `/storages/v1/product-templates/${idx}`,
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(resp => {
     dispatch({
       type: "PRODUCT_TEMPLATE_DELETE",
       payload: idx
      })
      dispatch({type: "PRODUCT_TEMPLATE_SUCCESS"})}
    ).catch((err) => {Promise.reject(err);       
    dispatch({
    type: "PRODUCT_TEMPLATE_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

