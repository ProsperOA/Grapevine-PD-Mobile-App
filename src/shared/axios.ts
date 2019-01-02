import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://136.168.201.106:5001'
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log(config);
    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response);
    return response;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;