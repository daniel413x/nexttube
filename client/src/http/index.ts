import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
});

const $authHost = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
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

export { $host, $authHost };
