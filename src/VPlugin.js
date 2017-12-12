import api from './api'

function setKeys(pageName, ifRefresh) {
  let keys = getSession('keys') || {};

  if (!keys[pageName]) {
    keys[pageName] = {o: 0, n: 0}
  }

  if (ifRefresh) {
    keys[pageName].o++;
  } else {
    keys[pageName].n = keys[pageName].o;
  }
  setSession('keys', keys);
}

export default {
  install(Vue){

    Vue.mixin({
      created(){
        setVue(this)
      },
    });

    Vue.prototype.$post = api.post;
    Vue.prototype.$get = api.get;

    Vue.prototype.$setPage = function (pageName, data, ifRefresh) {
      const currentPage = getPageName();
      if (!pageName || pageName === currentPage) {
        setKeys(currentPage, false);
        setSession(currentPage, this._data);
      } else {
        setKeys(pageName, ifRefresh);
        if (data) {
          setSession(pageName, data);
        }
      }
    };

    // 更新某个页面vue实例的data的attr属性
    Vue.prototype.$setData = function (pageName, attr, value, ifRefresh) {
      const data = getSession(pageName);
      if (!data) return;
      data[attr] = value;
      setKeys(pageName, ifRefresh);
      setSession(pageName, data);
    };

    Vue.prototype.$ifRefresh = function () {
      const data = getSession(getPageName());
      if (!data) return true;

      const keys = getSession('keys');
      if (!keys) return true;

      const currentPage = getPageName();
      if (!keys[currentPage]) {
        return true;
      } else {
        return keys[currentPage].n !== keys[currentPage].o;
      }
    };

    Vue.directive('back', function (el, binding) {
      el.onclick = function () {
        history.go(-1);
      }
    });

    Vue.directive('href', function (el, binding) {
      const value = binding.value;
      if (value) {
        switch (typeof value) {
          case 'string':
            el.onclick = function (e) {
              if (binding.modifiers.stop) {
                e.stopPropagation();
                if (el == e.target) {
                  openPage(value);
                }
              } else {
                openPage(value);
              }
            };
            break;
          case 'object':
            el.onclick = function (e) {
              if (binding.modifiers.stop) {
                e.stopPropagation();
                if (el == e.target) {
                  openPage(value[0], value[1]);
                }
              } else {
                openPage(value[0], value[1]);
              }
            };
            break;
        }
      }
    });

    // 1970-01-01 20:00
    Vue.filter('time', function (timestamp) {
      const date = new Date(Number(timestamp) * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      // const second = date.getSeconds();

      // const time = [hour, minute, second].map(formatNumber).join(':')
      const time = [hour, minute].map(formatNumber).join(':');

      // return date.toDateString() === new Date().toDateString()
      //   ? '今天' + ' ' + time
      //   : [year, month, day].map(formatNumber).join('-') + ' ' + time
      return [year, month, day].map(formatNumber).join('-') + ' ' + time
    });

    // 01-01 20:00
    Vue.filter('time_2', function (timestamp) {
      const date = new Date(Number(timestamp) * 1000);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();

      const time = [hour, minute].map(formatNumber).join(':');
      return [month, day].map(formatNumber).join('-') + ' ' + time
    });

    // 01-01
    Vue.filter('time_3', function (timestamp) {
      const date = new Date(Number(timestamp) * 1000);
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return [month, day].map(formatNumber).join('-');
    });

    // 倒计时1 HH:MM:SS
    Vue.filter('countdown', function (d_timestamp) {
      if (d_timestamp < 0) return '00:00:00';

      const h = Math.floor(d_timestamp / 3600);
      const m = Math.floor(d_timestamp / 60 - h * 60);
      const s = d_timestamp - (h * 3600 + m * 60);
      return [h, m, s].map(formatNumber).join(':');
    });

    // 倒计时2 d天h小时m分
    Vue.filter('countdown_2', function (d_timestamp) {
      if (d_timestamp < 0) return '0天0小时0分';

      const d = Math.floor(d_timestamp / 86400);
      const h = Math.floor(d_timestamp / 3600 - d * 24);
      const m = Math.floor(d_timestamp / 60 - d * 1440 - h * 60);
      return d + '天' + h + '小时' + m + '分';
    });

    // 以下是本项目专用
    Vue.filter('countdown_h', function (countdown_str) {
      return countdown_str.split(':')[0];
    });

    Vue.filter('countdown_m', function (countdown_str) {
      return countdown_str.split(':')[1];
    });

    Vue.filter('countdown_s', function (countdown_str) {
      return countdown_str.split(':')[2];
    });

    Vue.filter('avatar', function (value) {
      return value || './static/img/default_head.png';
    });

  }
}

