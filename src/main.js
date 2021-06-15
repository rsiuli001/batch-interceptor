import apiClient from './apiClient.js';
import { CONSTANTS } from './Constants.js';

const runTest = async () => {
    // Should return [{id:”fileid1”},{id:”fileid2”}]
    apiClient()
        .get(CONSTANTS.base_url, { params: { ids: ['fileid1', 'fileid2'] } })
        .then((res) => {
            console.log('debug ==> Should return [{id:”fileid1”},{id:”fileid2”}]: ', res.data);
        })
        .catch((err) => {
            console.log('debug ==> no error', err);
        });
    // Should return [{id:”fileid2”}]
    apiClient()
        .get(CONSTANTS.base_url, { params: { ids: ['fileid2'] } })
        .then((res) => {
            console.log('debug ==> Should return [{id:”fileid2”}]: ', res.data);
        })
        .catch((err) => {
            console.log('debug ==> no error', err);
        });
    // Should reject as the fileid3 is missing from the response
    apiClient()
        .get(batchUrl, { params: { ids: ['fileid3'] } })
        .then((res) => {
            console.log('debug ==> should not resolve: ', res.data);
        })
        .catch((err) => {
            console.log(
                'debug ==> Should reject as the fileid3 is missing from the response: ',
                err
            );
        });
};

export default runTest;
// runTest();
