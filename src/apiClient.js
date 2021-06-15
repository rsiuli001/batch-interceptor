import axios from 'axios';
import { CONSTANTS } from './Constants.js';
import batchInterceptor from './interceptor.js';

const apiClient = () => {
    const config = {
        host: CONSTANTS.host_url,
        baseAPI: CONSTANTS.base_url,
        headers: {},
    };

    const instance = axios.create(config);
    batchInterceptor(instance);

    return instance;
};

export default apiClient;
