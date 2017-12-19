const config = {
  debug: true
};

if (!config.debug) {
  console.log = function () {
  };
}

// vue对象相关 ↓
let $vue;

function setVue($_vue) {
  if (!$vue) {
    $vue = $_vue;

    // wx.config相关
    if(isWeixin()) {
      const url = location.href.split('#')[0];


      $vue.$post(URL.getWeixinInfo, {url})
        .then (res => {
          if(res.errcode == 0) {
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
              ]
            });
          }else{
            errback(res);
          }
        })
    }
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
  if (isWeixin()) {
    const url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    const appid = 'wx739a1b97ce756bcd';
    const redirect_uri = encodeURIComponent('http://feimao-weixin.zertone2.com/setInfo.html');
    const response_type = 'code';
    const scope = 'snsapi_userinfo';
    let state = from;  // 自带参数

    const to = `${url}?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`;
    location.href = to;
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

