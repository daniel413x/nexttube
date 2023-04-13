import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const $host = axios.create({
  baseURL,
});

const $authHost = axios.create({
  baseURL,
});

const authInterceptor = (reqConfig: AxiosRequestConfig) => {
  const config = { ...reqConfig };
  const token =
    localStorage.getItem('registeredToken') ||
    localStorage.getItem('guestToken');
  config.headers!.authorization = `Bearer ${token}`;
  return config as AxiosRequestConfig & { headers: AxiosHeaders };
};

$authHost.interceptors.request.use(authInterceptor);

export { baseURL, $host, $authHost };
