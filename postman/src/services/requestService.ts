import apiClient from './api';

type Param = { [k: string]: string };
type Headers = Record<string, string>;

export const getData = async (url: string, headers: Headers) => {
  console.log(headers);
  return apiClient.get(url, { headers });
};

export const postData = async (url: string, data: Param, headers: Headers) => {
  return apiClient.post(url, data, { headers });
};

export const putData = async (url: string, data: Param, headers: Headers) => {
  return apiClient.put(url, data, { headers });
};

export const deleteData = async (url: string, headers: Headers) => {
  return apiClient.delete(url, { headers });
};

export const patchData = async (url: string, data: Param, headers: Headers) => {
  return apiClient.patch(url, data, { headers });
};

export const headData = async (url: string, headers: Headers) => {
  return apiClient.head(url, { headers });
};

export const optionsData = async (url: string, headers: Headers) => {
  return apiClient.options(url, { headers });
};
