import { objectToParams } from './transforms';
import { getCookie } from './helpers';

const _getHeaders = (headers: {[key: string]: string;} = {}) => ({
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
});

const post = (
    url, data,
    callback = (a, b) => {},
    errorCallback = (err: any) => {},
    headers={},
) => {
    const meta = {
        method: 'post',
        headers: _getHeaders(headers),
        body: JSON.stringify(data),
        credentials: 'include',
    };
    // TODO: better error handling
    const postUrl = url.substr(0, 4) === 'http' ? url : `${process.env.API_URL}${url}`;
    fetch(postUrl, meta)
        .then((response) => {
            if (!response.ok) {
                response.json().then((json: object) => errorCallback(json));
                return;
            } else if (response.status < 200 || response.status > 204) {
                // TODO; error handle well
                errorCallback(response.statusText);
                return;
            }
            const respheaders = {};
            for (const x of response.headers) {
                respheaders[x[0]] = x[1];
            }
            response.json().then((json: object) => callback(json, respheaders));
        })
        .catch((err: any) => { console.warn('ERROR: ', err); errorCallback(err); });
};

// PUT
const put = (
    url, data,
    callback = (data: any) => {},
    errorCallback = (err: any) => {},
    headers={},
) => {
    const meta = {
        method: 'put', headers: _getHeaders(headers), body: JSON.stringify(data),
        credentials: 'include',
    };
    const putUrl = url.substr(0, 4) === 'http' ? url : `${process.env.API_URL}${url}`;
    // TODO: better error handling
    fetch(putUrl, meta)
        .then((response) => {
            if (response.status === 400) {
                response.json().then(json => errorCallback(json));
            } else if (response.status < 200 || response.status > 204) {
                // TODO; error handle well
                errorCallback(response.statusText);
                return;
            }
            const respheaders = {};
            for (const x of response.headers) {
                respheaders[x[0]] = x[1];
            }
            response.json().then(json => callback(json, respheaders));
        })
        .catch(err => errorCallback(err));
};

// GET
const get = (
    url, data,
    callback = (data: any) => {},
    errorCallback = (err: any) => {},
    headers={},
) => {
    const newheaders = {
        ...headers,
    };
    // combine data
    const geturl = url.substr(0, 4) === 'http' ? url : `${process.env.API_URL}${url}`;
    const getUrl = `${geturl}?${objectToParams(data)}`;
    const meta = { method: 'get', headers: newheaders, credentials: 'include' };
    fetch(getUrl, meta)
        .then(d => d.json())
        .then(json => callback(json))
        .catch(err => errorCallback(err));
};

// DELETE
const del = (
    url, data,
    callback = () => {},
    errorCallback = (err: any) => {},
    headers,
) => {
    const meta = {
        method: 'delete', headers: _getHeaders(headers), body: JSON.stringify(data),
        credentials: 'include',
    };
    // TODO: better error handling
    const deleteUrl = `${process.env.API_URL}${url}?${objectToParams(data)}`;
    fetch(deleteUrl, meta)
        .then((response) => {
            if (response.status === 400) {
                response.json().then(json => errorCallback(json));
            } else if (response.status < 200 || response.status > 204) {
                // TODO; error handle well
                errorCallback(response.statusText);
                return;
            }
            const respheaders = {};
            for (const x of response.headers) {
                respheaders[x[0]] = x[1];
            }
            response.json().then(json => callback(json, respheaders));
        })
        .catch(err => errorCallback(err));
};

const requests =  { get, put, post, delete: del };

export default requests;
