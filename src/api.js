const axios = require('axios');

axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
// axios.defaults.baseURL = 'http://feimao.zertone1.com/app/';
axios.defaults.baseURL = 'https://app.feelmao.com/app/';

const content = 'pinet.FeiMao.2017';
const t = '3';

axios.interceptors.request.use(function (config) {
  showLoading();
  const token = getToken() || '';
  let method = config.method;
  let url, str;
  if (method === 'get') {
    config.params = config.params ? Object.assign({}, config.params) : {};
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
    config.data = config.data ? Object.assign({}, config.data) : {};
    config.data.t = t;
    config.data.content = content;
    config.data.time = Date.parse(new Date()) / 1000;
    config.data.sign = getSign(config.data);
    delete config.data.content;
    config.data.access_token = token;
    str = '';
    for (let i in config.data) {
      str += encodeURIComponent(i) + '=' + encodeURIComponent(config.data[i]) + '&';
    };
    str = str.slice(0, str.length - 1);
    config.data = str
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
      axios.post(url, params)
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
