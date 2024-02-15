import HttpClient from "../services/HttpClient";
import axios from "axios";
import { adaptedUser } from "../adapters";

const instance = axios.create();
instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export const loginUserApi = (user) => {
  return new Promise((resolve, reject) => {
    instance
      .post("/login", user)
      .then((response) => {
        const formattedUser = adaptedUser(response);
        resolve(formattedUser);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const GetUsersPagination = (request) => {
  return new Promise((resolve, reject) => {
    HttpClient.get(
      `/paginationUser?numberPage=${request.numberPage}&itemsPerPage=${request.itemsPerPage}&search=${request.search}`
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const GetCurrentUserApi = () => {
  return new Promise((resolve, reject) => {
    HttpClient.get("/getUserSession")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteUserApi = (id) => {
  return new Promise((resolve, reject) => {
    HttpClient.delete(`/deleteUser?id=${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createUserApi = (user) => {
  return new Promise((resolve, reject) => {
    HttpClient.post("/createUser", user)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateUserApi = ({ id, password }) => {
  return new Promise((resolve, reject) => {
    console.log({ id, password })
    HttpClient.put(`/updateUser?id=${id}`, { password })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
