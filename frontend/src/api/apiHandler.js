import customAxios  from '../utility/axios';
import {store} from '../store/store';

customAxios.interceptors.request.use(async(config) => {
      config.headers['Authorization'] = `Bearer ${store.getState().user.accessToken}`;
    return config;
  });

function getDataAxiosPost(url, params) {
    return customAxios.post(url, params);
}

function getData(url) {
    return customAxios.get(url);
}

function deleteData(url) {
    return customAxios.delete(url);
}

export { getDataAxiosPost, getData, deleteData };