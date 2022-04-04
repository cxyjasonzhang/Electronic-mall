// 登录与注册的仓库
import { reqMessageCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLoginOut } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/gettoken"
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    // 存储 token
    USERLOGIN(state, token) {
        state.token = token
    },
    // 存储用户信息
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除用户信息 
    ClEAR(state) {
        state.token = ""
        state.userInfo = {}
        // 清除localStorage中的TOKEN
        removeToken();
    }
};
const actions = {
    async getMessageCode({ commit }, phone) {
        let result = await reqMessageCode(phone);
        // console.log(result)
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return "OK"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册业务
    async getUserRegister({ commit }, data) {
        let result = await reqUserRegister(data);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务
    async getUserLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // 请求成功后 将令牌token存到state中
        // 服务器下发的token，使用户唯一的标识 将来通过token找服务器要用户的信息
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            // 这边需要进行持久化存储token 但一般不写在这里 一般封装成一个函数 放在utils文件夹中
            // localStorage.setItem('TOKEN',result.data.token);
            setToken(result.data.token);
            return "OK"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        // 当请求成功后 将用户信息存到state中
        if (result.code == 200) {
            // 这边需要进行持久化存储token 但一般不写在这里 一般封装成一个函数 放在utils文件夹中
            // localStorage.setItem('TOKEN',result.data.token);
            commit('USERINFO', result.data);
            return "OK"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async getUserLoginOut({ commit }) {
        // 只是向服务器发起请求 通知服务器清除token
        let result = await reqUserLoginOut();
        // 在mutations中 清除state数据
        if (result.code == 200) {
            commit("ClEAR");
            return "OK"
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
