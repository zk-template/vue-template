// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import axios from 'axios';

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title;
  }
  next();
});
router.afterEach(route => {
});

axios.interceptors.response.use(response => { // axios拦截器
  return response
}, error => {
	let statusCode = error.response.status;
	let request = error.response.config;
	let method = request.method;
	let url = request.url;
	switch (statusCode) {
		case 403:
			break;
		case 404:
			break;
		case 503:
			break;
		default:
			return false;
			// router.push({ path: '/login' });
			// something to do  status_code 403 权限不足或者是登录失败  判断当前请求的接口是否为登录 同事登录页跳转传参 有参数返回上一级 routee.go(-1) w无参数进主页
	};
  	return Promise.reject(error)
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
