import apiClient from './api';

type Param = { [k: string]: string };

export const getData = async (url: string, headers: Record<string, string>) => {
  console.log(headers);
  return apiClient.get(url, { headers });
};

export const postData = async (
  url: string,
  data: Param,
  headers: Record<string, string>,
) => {
  return apiClient.post(url, data, { headers });
};

export const putData = async (
  url: string,
  data: Param,
  headers: Record<string, string>,
) => {
  return apiClient.put(url, data, { headers });
};

export const deleteData = async (
  url: string,
  headers: Record<string, string>,
) => {
  return apiClient.delete(url, { headers });
};

export const patchData = async (
  url: string,
  data: Param,
  headers: Record<string, string>,
) => {
  return apiClient.patch(url, data, { headers });
};

export const headData = async (
  url: string,
  headers: Record<string, string>,
) => {
  return apiClient.head(url, { headers });
};

export const optionsData = async (
  url: string,
  headers: Record<string, string>,
) => {
  return apiClient.options(url, { headers });
};
