// 配置路由的地方
import store from '@/store';
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入routes配置
import routes from "./routes"
// 先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
//第一个参数：告诉原来的push方法，往哪里跳转  第二个参数：成功回调  第三个参数：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}
// 对外暴露VueRouter实例
const router = new VueRouter({
    //配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局守卫 前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to 将要跳转的目的路由
    // from 跳转的起点
    // next()放行  next(path)放行到
    // console.log(store.state.user.token)
    let token = store.state.user.token;
    // 挂载home组件时向服务器请求用户信息
    let name = store.state.user.userInfo.name;
    next();
    // 取到token 说明已经登陆
    if (token) {
        // 登录后想要跳转到login/register页 需进行路由拦截
        if (to.path == "/login" || to.path == "/register") {
            next('/')
        } else {
            // 已经登录 但去往的路由不是login
            // 如果已经拥有用户名
            if (name) {
                next();
            } else {
                // 之前遗留的问题 请求信息只在home首页请求一次，并存在vuex中(不能持久保存)，刷新页面后信息会丢失
                // 没有用户名信息，派发action让仓库存储用户信息后再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // 获取用户信息失败，重新登录
                    // 清除token
                    await store.dispatch('getUserLoginOut');
                    next('/login')
                }
            }

        }
    } else {
        // 未登录 不能去往交易页面、交易成功页面、支付页面、
        let toPath = to.path;
        if (toPath.indexOf('/center') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/paysuccess') != -1) {
            // console.log(to.path);
            let toPath = to.path;
            // 跳转路由时携带query参数
            next(`/login?redirect=${toPath}`);
        }
    }
})

export default router