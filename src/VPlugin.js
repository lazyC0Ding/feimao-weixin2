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

    // 指令
    //默认头像
    Vue.directive('avatar', function (el, binding) {
      el.src = './static/img/default_head.png';
      if(binding.value) {
        let img = new Image();
        img.onload = function () {
          el.src = binding.value;
        };
        img.src = binding.value;
      }
    });

    // 使用div等元素的backgroundImage显示图片
    Vue.directive('ratioImg', function (el, binding) {
      const width = document.documentElement.clientWidth;
      const minHeight = width / 1.5;
      const maxHeight = width / 1.25;
      el.style.height = minHeight + 'px';
      el.style.background = 'url(./static/img/default_Article_pic.png) no-repeat center center';
      el.style.backgroundSize = '100%';

      const src = binding.value;
      let ratio;

      const widthStr = '/width_';
      const heightStr = '/height_';
      const wStartIdx = src.indexOf(widthStr);
      if (wStartIdx > -1) {
        const wEndIdx = src.indexOf('/', wStartIdx + 1);
        const hStartIdx = src.indexOf(heightStr);
        const hEndIdx = src.indexOf('/', hStartIdx + 1);
        const srcWidth = src.slice(wStartIdx + widthStr.length, wEndIdx);
        const srcHeight = src.slice(hStartIdx + heightStr.length, hEndIdx);

        ratio = Number(srcWidth) / Number(srcHeight);
      }
      let height = ratio ? width / ratio : minHeight;
      height = height > maxHeight ? maxHeight : height;
      let img = new Image();
      img.onload = function () {
        el.style.height = height + 'px';
        el.style.backgroundImage = 'url(' + src + ')';
      };
      img.src = src;
    });

    Vue.directive('action', function (el, binding) {
      el.onclick = function (e) {
        if (binding.modifiers.stop) {
          e.stopPropagation();
          if (el == e.target) {
            jumpAction(binding.value);
          }
        } else {
          jumpAction(binding.value);
        }
      }
    });

    Vue.directive('action', function (el, binding) {
      el.onclick = function (e) {
        if (binding.modifiers.stop) {
          e.stopPropagation();
          if (el == e.target) {
            jumpAction(binding.value);
          }
        } else {
          jumpAction(binding.value);
        }
      }
    });

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

    // 过滤器
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

    // 1970-01-01
    Vue.filter('time_2', function (timestamp) {
      const date = new Date(Number(timestamp) * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return [year, month, day].map(formatNumber).join('-');
    });

    // 01-01 20:00
    Vue.filter('time_3', function (timestamp) {
      const date = new Date(Number(timestamp) * 1000);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();

      const time = [hour, minute].map(formatNumber).join(':');
      return [month, day].map(formatNumber).join('-') + ' ' + time
    });

    // 01-01
    Vue.filter('time_4', function (timestamp) {
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

    Vue.mixin({
      created(){
        if(!window.theVue){
          window.theVue = this;
          // wx.config相关
          if (isWeixin()) {
            const url = location.href.split('#')[0];
            window.theVue.$post(URL.getWeixinInfo, {url})
              .then(res => {
                if (res.errcode == 0) {
                  const content = res.content;
                  wx.config({
                    debug: false,
                    appId: content.appId,
                    timestamp: content.timestamp,
                    nonceStr: content.nonceStr,
                    signature: content.signature,
                    jsApiList: [
                      'chooseImage',
                      'uploadImage',
                      'chooseWXPay',
                      'previewImage',
                      'hideAllNonBaseMenuItem',
                      'showMenuItems',
                      'onMenuShareAppMessage',
                      'onMenuShareQQ',
                      'onMenuShareTimeline',
                    ]
                  });
                } else {
                  errback(res);
                }
              })
          }
        }
      },
    });

  }
}

