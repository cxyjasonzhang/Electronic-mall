import { reqGetSearchInfo } from "@/api";
// search的小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    //获取search模块数据
    async getSearchList({ commit }, params = {}) {
        //当前这个getSearchList函数在调用时至少传一个空对象
        // params参数 = 是用户派发dispatch时，第二个参数传递过来的
        // 记得传params参数啊！！！！！！！！！！
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
// 计算属性==简化数据
// 项目中getters主要作用是：简化仓库中的数据
const getters = {
    // 
    goodsList(state) {
        // 有问题的，返回的数据有可能是undefined，因为服务器未返回数据
        // 假如没有网，state.searchList.goodsList返回的是undefined，但undefined不能遍历，所以至少得返回一个空数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        // 有问题的，返回的数据有可能是undefined，因为服务器未返回数据
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    },
    totalList(state) {
        return state.searchList.total;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}