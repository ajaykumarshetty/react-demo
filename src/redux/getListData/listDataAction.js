import {
  GET_LIST_DATA_ERROR,
  GET_LIST_DATA,
  GET_LIST_DATA_LOADING,
} from "./listDataType";
import axios from "axios";

const BASE_URL = "https://api.coindesk.com/v1/bpi"

export const getListDataLoading = (state, key) => {
  return {
    type: GET_LIST_DATA_LOADING,
    payload: state,
    keyName: key
  };
};

export const getListData = (data, key) => {
  return {
    type: GET_LIST_DATA,
    payload: data,
    keyName: key
  };
};
export const getListDataError = (error) => {
  return {
    type: GET_LIST_DATA_ERROR,
    payload: error,
  };
};

export const getData = (details) => {
  return async function (dispatch) {
    const pathName = details.api;
    const loadingKey = details.loadingKey;
    const listKey = details.listKey

    dispatch(getListDataLoading(true, loadingKey));
    await axios
      .get(`${BASE_URL}/${pathName}`)
      .then((response) => {
        dispatch(getListData(response.data, listKey));
        dispatch(getListDataLoading(false, loadingKey));

      })
      .catch((error) => {
        dispatch(getListDataError(error));
        dispatch(getListDataLoading(false, loadingKey));

      });
  };
};

const instance = axios.create({
  baseURL:BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

export async function getService(url, data) {
  try {
    const res = data ? await instance(url, { params: data }) : await instance(url);
    return res;
  } catch (e) {
    return e;
  }
}