import request from "../../helpers/request";

export type StorageName = "main" | "admission" | "release"

export const getStorages = (type: StorageName) => (dispatch: any) => {
  dispatch({type: "STORAGE_LOADING"});

  return request().get(
    `/storages/v1/storages/${type}/`,
    {
      headers: { Authorization: `Token ${localStorage.token}`}}
  )
  .then((resp) => {
    dispatch({
      type: "STORAGE_SUCCESS",
      payload: resp.data
    });
  })
  .catch((err) => {Promise.reject(err);       
    dispatch({
    type: "STORAGE_ERROR",
    payload: err.response ? err.response.data : "COULD NOT CONNECT",
    });
  });
}
