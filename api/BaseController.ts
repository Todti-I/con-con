import axiosStatic, { AxiosError, AxiosResponse } from 'axios';
import isDev from 'con-con/utils/is-dev';

const axios = axiosStatic.create({
  baseURL: 'http://88.210.6.3:5000',
});

axios.interceptors.request.use(
  async (config) => {
    // config.headers = { Authorization: `Bearer XXX` };
    return config;
  },
  (error) => Promise.reject(error)
);

export default abstract class BaseController {
  protected async get<T>(url: string, params?: object): Promise<T> {
    try {
      const res = await axios.get<T>(url, { params });
      isDev && console.log(`GET ${url}`); // LOG
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      isDev && console.error(`GET ${url}`, error.response); // LOG
      throw error.response;
    }
  }

  protected async post<T, K>(
    url: string,
    data?: K,
    params?: object
  ): Promise<T> {
    try {
      const res = await axios.post<K, AxiosResponse<T>>(url, data, { params });
      isDev && console.log(`POST ${url}`); // LOG
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      isDev && console.error(`POST ${url}`, error.response); // LOG
      throw error.response;
    }
  }

  protected async put<T, K>(url: string, data?: K): Promise<T> {
    try {
      const res = await axios.put<K, AxiosResponse<T>>(url, data);
      isDev && console.log(`PUT ${url}`); // LOG
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      isDev && console.error(`PUT ${url}`, error.response); // LOG
      throw error.response;
    }
  }

  protected async delete<T>(url: string, params?: object): Promise<T> {
    try {
      const res = await axios.delete<T>(url, { params });
      isDev && console.log(`DELETE ${url}`); // LOG
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      isDev && console.error(`DELETE ${url}`, error.response); // LOG
      throw error.response;
    }
  }
}
