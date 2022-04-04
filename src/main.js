import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--一个全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图---全局组件 
import Carousel from '@/components/Carousel'
// 注册分页器---全局组件 
import Pagination from "@/components/Pagination"
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 引入路由
import router from './router'
//引入Vuex
import store from './store'
//测试
// import { reqGetSearchInfo } from "@/api"
// console.log(reqGetSearchInfo({}))
// 按需引入 element-ui 组件样式
import { Button, MessageBox } from 'element-ui';
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入自定义插件
import myPlugin from '@/plugins/myPlugin'
// 引入懒加载所用的图片  图片和json文件都是默认暴露的
import panda from "@/assets/pander.jpg"
// 除了vuex的另外一种写法
// 引入api所有接口函数
// 统一引入
import * as API from "@/api"

// 引入表单校验插件
import "@/plugins/validata"

// 使用element-ui
Vue.use(Button);
// 使用自定义插件
Vue.use(myPlugin, {
  name: 'upper'
});
// 使用懒加载插件
Vue.use(VueLazyload, {
  // 传入一个配置对象
  loading: panda
});
// 另一种使用方式 挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false
// 引入mockServe.js---mock数据
import "@/mock/mockServe"
// 引入swiper样式
import 'swiper/css/swiper.css'

new Vue({
  render: h => h(App),
  // 全局事件总线的配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由信息:当这里书写router时，组件上有$route,$router
  router,
  // 注册仓库
  store
}).$mount('#app')
