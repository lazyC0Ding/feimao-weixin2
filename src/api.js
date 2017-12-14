const axios = require('axios');

axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
// axios.defaults.baseURL = 'http://feimao.zertone1.com/app/';
axios.defaults.baseURL = 'http://app.feelmao.com/app/';

const getURLSearchParams = function (paramsJson) {
  const p = new URLSearchParams();
  for (let i in paramsJson) {
    p.append(i, paramsJson[i]);
  }
  return p;
};

const content = 'pinet.FeiMao.2017';
const t = '3';

axios.interceptors.request.use(function (config) {
  showLoading();
  const token = getToken() || '';
  let method = config.method;
  let url, str;
  if (method === 'get') {
    config.params = config.params || {};
    config.params = Object.assign(config.params, {
      t,
      content,
      time:Date.parse(new Date()) / 1000,
    });
    config.params['sign'] = getSign(config.params);
    delete config.params['content'];
    config.params['access_token'] = token;

    // 控制台打印
    const params = [];
    for (let i in config.params) {
      params.push(i + '=' + config.params[i]);
    }
    str = params.join('&');
    // -------

  } else if (method === 'post') {
    config.data = config.data || new URLSearchParams();
    config.data.append('t', t);
    config.data.append('content', content);
    config.data.append('time', (Date.parse(new Date())) / 1000);
    config.data.sort();
    config.data.append('sign', md5(decodeURIComponent(config.data.toString())));
    config.data.delete('content');
    config.data.append('access_token', token);

    // 控制台打印
    str = decodeURIComponent(config.data.toString());
    // -------
  }
  url = config.baseURL + config.url;
  console.log(`${method}: ${url}?${str}`);
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  hideLoading();
  return response;
}, function (error) {
  hideLoading();
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default {
  get(url, params){
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params
      })
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  post(url, params){
    return new Promise((resolve, reject) => {
      let p;
      if (params) {
        p = getURLSearchParams(params)
      }
      axios.post(url, p)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
