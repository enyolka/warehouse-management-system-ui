import { UserCreateModel } from "../../components/staffTable/types";
import request from "../../helpers/request";
// import { translateToModel, translatetoApiModel } from "../users/translatorUsers";


export const getUsers = () => (dispatch: any) => {
  dispatch({type: "USERS_LOADING"});

  return request().get(
    "/users/v1/users/",
    {
      headers: { Authorization: `Token ${localStorage.token}`}}
  )
  .then((resp) => {
    dispatch({
      type: "USERS_SUCCESS",
      payload: resp.data,
    });
  })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "USERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const postUser = (model: UserCreateModel) => (dispatch: any) => {
  console.log(model)
  return request().post(
    "/users/v1/users/",
    model,
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "USER_CREATE",        
        payload: resp.data,
      });
    dispatch({type: "USERS_SUCCESS"})
    })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "USERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const putUser = (model: UserCreateModel) => (dispatch: any) => {
  return request().put(
    `/users/v1/users/${model.id}/`,
    model,
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(
    resp => { 
      dispatch({
        type: "USER_UPDATE", 
        payload: resp.data,
      });
      dispatch({type: "USERS_SUCCESS"})
    }) 
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "USERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

export const deleteUser = (idx: number) => (dispatch: any) => {

  return request().delete(
    `/users/v1/users/${idx}`,
     { headers: { Authorization: `Token ${localStorage.token}`}}
  ).then(resp => {
     dispatch({
       type: "USER_DELETE",
       payload: idx
      })
      dispatch({type: "USERS_SUCCESS"})}
    ).catch((err) => {Promise.reject(err);       
    dispatch({
    type: "USERS_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}

