import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_NAME } from '~/contexts/Constans';

const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

const httpRequest = axios.create(defaultOptions);

httpRequest.interceptors.request.use(function (config) {
    const token = localStorage[LOCAL_STORAGE_TOKEN_NAME];
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export const get = async (path, option) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

export const post = async (path, option) => {
    const response = await httpRequest.post(path, option);
    return response.data;
};

export const put = async (path, option) => {
    const response = await httpRequest.put(path, option);
    return response.data;
};
export const patch = async (path, option) => {
    const response = await httpRequest.patch(path, option);
    return response.data;
};
export const deletee = async (path, option) => {
    const response = await httpRequest.delete(path, option);
    return response.data;
};

export default httpRequest;
