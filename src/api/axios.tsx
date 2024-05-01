// API url definition
import axios from 'axios'

// const BASE_URL = 'http://hezaapi.custopedia.tech/'
const BASE_URL = 'http://localhost:5000/'

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export default axiosInstance;

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false
});
