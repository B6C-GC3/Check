import { L } from '../lib/abpUtility';
import { notification } from 'antd';
import axios from 'axios';

const qs = require('qs');

declare var abp: any;

const http = axios.create({
  baseURL: abp.appServiceUrl,
  timeout: 1800000,
  withCredentials: true,
  xsrfCookieName: abp.security.antiForgery.tokenHeaderName,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  }
});

http.interceptors.request.use(
  function (config) {
    let authToken = abp.auth.getToken();
    let antiForgeryToken = abp.security.antiForgery.getToken();
    if (!!abp.auth.getToken()) {
      config.headers.common['authorization'] = "Bearer  " + authToken;
      config.headers.common[abp.security.antiForgery.tokenHeaderName] = antiForgeryToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },

  error => {
    if (typeof error.response !== "undefined"
      && typeof error.response.config !== "undefined"
      && typeof error.response.config.url !== "undefined") {

      var arrPath = error.response.config.url.split('/');
      if (arrPath.length > 0 && arrPath[arrPath.length - 1] === "checkToken") {
        localStorage.clear();
        sessionStorage.clear();
        abp.auth.clearToken();
        window.location.href = '/user/login';
      }
    }

    if (!!error.response && !!error.response.data.error
      && !!error.response.data.error.message
      && error.response.data.error.details) {
      localStorage.setItem("request-err", error.response.data.error.details);
      notification.error({
        message: error.response.data.error.message,
        description: error.response.data.error.details,
        placement: 'bottomRight'
      });
    } else if (!!error.response
      && !!error.response.data.error
      && !!error.response.data.error.message) {
      localStorage.setItem("request-err", error.response.data.error.message);
      notification.error({
        message: L('Common.Error'),
        description: error.response.data.error.message,
        placement: 'bottomRight'
      });
    } else if (!error.response) {
      localStorage.setItem("request-err", L('Common.UnknownError'));
      notification.error({
        message: L('Common.Error'),
        description: L('Common.UnknownError'),
        placement: 'bottomRight'
      });
    }

    if (!!error.response && error.response.status === 401) {
      localStorage.setItem("request-err", error.response.data.message);
      notification.error({
        message: L('Common.Error'),
        description: error.response.data.message,
        placement: 'bottomRight'
      });
    }

    return Promise.reject(error);
  }
);

export default http;
