import apiClient from './apiClient.js';
import { CONSTANTS } from './Constants.js';

const runTest = () => {
    // Should return [{id:”fileid1”},{id:”fileid2”}]
    apiClient()
        .get(CONSTANTS.batch_url, { params: { ids: ['fileid1', 'fileid2'] } })
        .then((res) => {
            console.log('debug ==> Should return [{id:”fileid1”},{id:”fileid2”}]: ', res.data);
        })
        .catch((err) => {
            console.log('debug ==> no error on 1st', err);
        });
    // Should return [{id:”fileid2”}]
    apiClient()
        .get(CONSTANTS.batch_url, { params: { ids: ['fileid2'] } })
        .then((res) => {
            console.log('debug ==> Should return [{id:”fileid2”}]: ', res.data);
        })
        .catch((err) => {
            console.log('debug ==> no error on 2nd', err);
        });
    // Should reject as the fileid3 is missing from the response
    apiClient()
        .get(CONSTANTS.batch_url, { params: { ids: ['fileid3'] } })
        .then((res) => {
            console.log('debug ==> should not resolve: ', res.data);
        })
        .catch(() => {
            console.log('debug ==> Should reject as the fileid3 is missing from the response ');
        });
};

export default runTest;
