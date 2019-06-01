import axios from 'axios';
import Idx from 'idx';
import { Config } from '../Config';

const instance = axios.create({
  baseURL: `${Config.API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  timeout: 120000,
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

// Add a request interceptor
instance.interceptors.request.use(config => config, error => Promise.reject(error));

// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  (error) => {
    if (Idx(error, _ => _.response.data)) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default instance;
