import apiClient from './api';

type Param = { [k: string]: string };

export const getData = async (url: string) => {
  const response = await apiClient.get(url);
  return response.data;
};

export const postData = async (url: string, data: Param) => {
  const response = await apiClient.post(url, data);
  return response.data;
};

export const putData = async (url: string, data: Param) => {
  const response = await apiClient.put(url, data);
  return response.data;
};

export const deleteData = async (url: string) => {
  const response = await apiClient.delete(url);
  return response.data;
};

export const patchData = async (url: string, data: Param) => {
  const response = await apiClient.patch(url, data);
  return response.data;
};

export const headData = async (url: string) => {
  const response = await apiClient.head(url);
  return response.headers;
};

export const optionsData = async (url: string) => {
  const response = await apiClient.options(url);
  return response.headers;
};
