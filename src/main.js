import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import toast from './components/common/toast'


Vue.config.productionTip = false

// 图片懒加载
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // 这样引入无效，require有效
  // loading: import(~assets/img/common/placeholder.png),
  loading: require('./assets/img/common/placeholder.png'),
})
// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟问题
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
