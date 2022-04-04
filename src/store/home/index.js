// home的小仓库
//引入发请求的函数
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
const actions = {
    //书写业务逻辑，不能修改state
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            // 调用上面mutation的CATEGORYLIST，将请求数据赋给state的数组categoryList
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqBannerList();
        if (result.code == 200) {
            commit("BANNERLIST", result.data)
        }
    },
    // 获取floor的数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }
    }
};
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}