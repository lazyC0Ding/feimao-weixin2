import Vue from 'vue'
import App from './App.vue'
import VPlugin from '@/VPlugin.js'
import  { LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'

Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(VPlugin);
new Vue({
  el:'#app',
  template:'<App/>',
  components:{
    App
  }
});
