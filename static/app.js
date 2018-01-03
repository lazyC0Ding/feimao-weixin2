var config = {
  debug: true,
};

if (!config.debug) {
  console.log = function () {
  };
}

// Loading相关
var hasLoading = false;
function showLoading() {
  if (!hasLoading) {
    hasLoading = true;
    setTimeout(_showLoading, 500);
  }
}

function _showLoading() {
  if (hasLoading) {
    window.theVue.$vux.loading.show({
      text: 'Loading'
    })
  }
}

function hideLoading() {
  if (hasLoading) {
    window.theVue.$vux.loading.hide();
    hasLoading = false;
  }
}

function toast(msg) {
  if (window.theVue) {
    window.theVue.$vux.toast.show({
      text: msg,
      type: 'text',
    })
  }
}

function myAlert(msg, onHide, onShow) {
  if (window.theVue) {
    window.theVue.$vux.alert.show({
      title: '提示',
      content: msg,
      onShow () {
        if(onShow) {
          onShow();
        }
      },
      onHide () {
        if(onHide) {
          onHide();
        }
      }
    })
  }
}

function myConfirm(msg, onConfirm, onCancel) {
  if (window.theVue) {
    window.theVue.$vux.confirm.show({
      title:'提示',
      content:msg,
      onConfirm:onConfirm,
      onCancel:onCancel,
    })
  }
}

function login() {
  var from = encodeURIComponent(location.href);
  if (isWeixin()) {
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    var appid = 'wx739a1b97ce756bcd';
    var redirect_uri = encodeURIComponent('http://wap.feelmao.com/setInfo.html');
    var response_type = 'code';
    var scope = 'snsapi_userinfo';
    var state = from;  // 自带参数

    var to = `${url}?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`;
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
  var data = getSession(pageName);
  if (!data) return;
  data[attr] = value;
  return setSession(pageName, data);
}

function follow_common() {
  var willRefreshByFollow = ['index', 'follows', 'person_detail'];
  for (var page of willRefreshByFollow) {
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
      if (action.jump === '/') {
        location.replace(action.jump);
      }else{
        location.replace(action.jump + '.html');
      }
      break;
    case '4':
      location.replace(action.jump + '.html');
      break;
    default:
      var params = {};
      if (action.params && action.params.length) {
        for (var i of action.params) {
          params[i.key] = i.value;
        }
      }
      openPage(action.jump, params);
      break;
  }
}

