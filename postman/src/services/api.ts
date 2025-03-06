import axios from 'axios';
import {
  deleteData,
  getData,
  headData,
  optionsData,
  patchData,
  postData,
  putData,
} from './requestService';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

type DataType = {
  http_method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  url: string;
};

export async function sendData(data: DataType, body: { [k: string]: string }) {
  switch (data.http_method) {
    case 'GET':
      return getData(data.url);
    case 'POST':
      return postData(data.url, body);
    case 'PUT':
      return putData(data.url, body);
    case 'DELETE':
      return deleteData(data.url);
    case 'PATCH':
      return patchData(data.url, body);
    case 'HEAD':
      return headData(data.url);
    case 'OPTIONS':
      return optionsData(data.url);
    default:
      throw new Error(`Unsupported HTTP method: ${data.http_method}`);
  }
}

export default apiClient;
