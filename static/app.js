var ua = navigator.userAgent;
alert('456');

if (ua.indexOf('iPhone') > -1) {//苹果手机
  window.onload = function () {
    setTimeout(() => {
      window.addEventListener("popstate", function (e) {
        // alert("我监听到了浏览器的返回按钮事件啦");
        alert('后退');
        self.location = document.referrer;
      });
    }, 500)
  }
}

if (getSystemType() === 'ios') {//苹果手机
  window.onload = function () {
    setTimeout(() => {
      window.addEventListener("popstate", function (e) {
        // alert("我监听到了浏览器的返回按钮事件啦");
        alert('后退2');
        location.reload();
      });
    }, 500)
  }
}



const config = {
  debug: true
};

if (!config.debug) {
  console.log = function () {
  };
}

// wx.config({
//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: 'wx739a1b97ce756bcd', // 必填，公众号的唯一标识
//   timestamp: '', // 必填，生成签名的时间戳
//   nonceStr: '', // 必填，生成签名的随机串
//   signature: '',// 必填，签名，见附录1
//   jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// });

// vue对象相关 ↓
let $vue;

function setVue($_vue) {
  if (!$vue) {
    $vue = $_vue;
  }
}

// Loading相关
let hasLoading = false;
function showLoading() {
  if (!hasLoading) {
    hasLoading = true;
    setTimeout(_showLoading, 500);
  }
}

function _showLoading() {
  if (hasLoading) {
    $vue.$vux.loading.show({
      text: 'Loading'
    })
  }
}

function hideLoading() {
  if (hasLoading) {
    $vue.$vux.loading.hide();
    hasLoading = false;
  }
}

function toast(msg) {
  if ($vue) {
    $vue.$vux.toast.show({
      text: msg,
      type: 'text',
    })
  }
}

function login() {
  const from = getPageName();
  if (is_weixn()) {
    // const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx739a1b97ce756bcd&redirect_uri=http%3A%2F%2Ffeimao-weixin.zertone2.com%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    // location.href = url;
    openPage('setInfo', {from})
  } else {
    openPage('login', {from});
  }
}

function errback(res) {
  switch (res.errcode) {
    case 99:
      login();
      break;
    default:
      toast(res.message);
      break;
  }
}

// 以下是页面状态相关
// 1.改变${pageName}.html页面vue实例上data[attr] = value;
function changeState(pageName, attr, value) {
  const data = getSession(pageName);
  if (!data) return;
  data[attr] = value;
  return setSession(pageName, data);
}

function follow_common() {
  const willRefreshByFollow = ['index', 'follows', 'person_detail'];
  for (let page of willRefreshByFollow) {
    if (page === getPageName() && page === 'index') return;
    changeState(page, '$_follow', true);
  }
}

// 各种action
function jumpAction(action) {
  switch (action.action_id) {
    case '1':
      break;
    case '3':
      location.replace(action.jump + '.html');
      break;
    case '4':
      location.replace(action.jump + '.html');
      break;
    default:
      let params = {};
      if (action.params && action.params.length) {
        for (let i of action.params) {
          params[i.key] = i.value;
        }
      }
      openPage(action.jump, params);
      break;
  }
}

