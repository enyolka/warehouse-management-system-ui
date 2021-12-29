/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { Redirect } from "react-router-dom";

export default (history = null) => {
  const headers = {
    Authorization: "",
  };

  const baseURL = process.env.REACT_APP_BACKEND_URL;

  if (localStorage.token) {
    headers.Authorization = `Token ${localStorage.token}`;
  }

  const request = axios.create({
    baseURL: baseURL,
    headers,
    // validateStatus: false,
  });

  request.interceptors.response.use(
    (response) =>
      new Promise((resolve) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 403) {
        localStorage.removeItem("token");

        <Redirect to="/" />;
      } else {
        return new Promise((_, reject) => {
          reject(error);
        });
      }
    }
  );
  return request;
};
