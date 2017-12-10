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
  if ($vue) {
    let ifLogin = confirm('还没有登录,是否登录?');
    if (ifLogin) {
      const type = 0;
      const phone = 15700082535;
      $vue.$post(URL.sendcode, {type, phone})
        .then(res => {
          let code = prompt('输入验证码');
          return $vue.$post(URL.login, {phone, code})
        })
        .then(res => {
          if (res.content) {
            setUser(res.content);
            setToken(res.content.access_token)
          }
        })
    }
  }
}

function errback(res) {
  switch (res.errcode) {
    case 99:
      login();
      break;
  }
  toast(res.message);
}

// 以下是页面状态相关
// 1.改变${pageName}.html页面vue实例上data[attr] = value;
function changeState(pageName, attr, value) {
  const data = getSession(pageName);
  if (!data) return;
  data[attr] = value;
  return setSession(pageName, data);
}

function changePageKey(pageName) {
  const data = getSession(pageName);
  if (!data) return;
  data['pageKey'] = data.pageKey + 1;
  return setSession(pageName, data);
}

function follow_common() {
  const willRefreshByFollow = ['index', 'follows', 'person_detail'];
  for (let page of willRefreshByFollow) {
    if(page === getPageName() && page === 'index') return;
    changeState(page, '$_follow', true);
  }
}

function setKeys(pageName) {
  let keys = getSession('keys') || [];

  if(!keys.pageName) {
    keys.pageName = {
      o:1,
      n:0,
    }
  }else{
    keys.pageName.o++;
  }
}

// 各种action
function jumpAction(action) {
  switch (action.action_id) {
    default:
      let params = {};
      for (let i of action.params) {
        params[i.key] = i.value;
      }
      openPage(action.jump, params);
      break;
  }
}

