import axios from 'axios';

const ENV = process.env;

const http = axios.create({
  baseURL: ENV.REACT_APP_API_BASE_URL,
});

export const baseMediaUrl = 'https://upload.ustozai-app.uz';

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }

    throw error;
  }
);

// v2
const newUrl = ENV.REACT_APP_API_BASE_URL?.replace('/v1', '/v2');
export const httpV2 = axios.create({
  baseURL: newUrl,
});

httpV2.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpV2.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }

    throw error;
  }
);

export default http;
