import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const $host = axios.create({
  baseURL,
});

export { baseURL, $host };
