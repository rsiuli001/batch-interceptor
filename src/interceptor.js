// import { get, includes } from 'lodash';
import createError from 'axios/lib/core/createError.js';
import httpAdapter from 'axios/lib/adapters/http.js';
import { MAX_REQUEST_TIME } from './Constants.js';

import pkg from 'lodash';
const { get, includes } = pkg;

var reqArray = [];
var reqPromise;

const resolveBatchResult = (results, config) => {
    const data = JSON.parse(results.data);
    const fileIds = get(congfig, 'params.ids', []);

    if (data) {
        const files = get(data, 'items', []).filter((element) => includes(fileIds, element.id));

        if (files?.length > 0) {
            return Promise.resolve({ ...results, data: { files } });
        } else {
            return Promise.reject(createError('No Content', config, 204));
        }
    } else {
        return Promise.reject(createError('No Content', config, 204));
    }
};

const getBatchconfig = (config) => ({
    ...config,
    params: {
        ...config.params,
        ids: reqArray.reduce((acc, cv) => [...new Set([...acc, get(cv, 'params.id', [])])]),
    },
});

const batchRequest = (config) => {
    if (reqArray.length > 0) {
        reqArray.push(config);
        return reqPromise;
    } else {
        reqArray.push(config);
        reqPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                // const batch = getBatchconfig(config);
                httpAdapter(getBatchconfig(config))
                    .then(resolve)
                    .catch(reject)
                    .finally(() => (reqArray = []));
            }, MAX_REQUEST_TIME);
        });
    }
};

const batchInterceptor = (axios) => {
    axios.interceptors.request.use(
        (req) => {
            req.adapter = (config) =>
                batchRequest(config).then((res) => {
                    resolveBatchResult(res, config);
                });

            return req;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
};

export default batchInterceptor;
