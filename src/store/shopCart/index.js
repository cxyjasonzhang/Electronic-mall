import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"
const state = {
    // 返回的数据为数组形式
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        console.log(result);
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车某一个产品的action
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "OK"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 更新购物车商品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        // console.log(result)
        if (result.code == 200) {
            return "OK"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除选中的所有商品
    deleteCheckedAllCart({ dispatch, getters }) {
        // console.log(getters)
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach((value) => {
            let promise = value.isChecked == 1 ? dispatch('deleteCartList', value.skuId) : "";
            // 将每一次返回的Promise存储到数组当中
            promiseAll.push(promise)
        })
        // Promise.all 方法 传入一个数组
        // 只要全部的Promise都为成功，返回的即为成功  如果有一个失败，返回为失败结果
        return Promise.all(promiseAll)
    },
    // 全选或全不选中商品
    updateAllChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        // console.log(state.cartList)
        state.cartList[0].cartInfoList.forEach((item) => {
            // 全部一起修改就行了
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        })
        return Promise.all(promiseAll)
    }
};
const getters = {
    // 简化数据
    cartList(state) {
        // 如果服务器还未返回数据，返回至少为空对象
        return state.cartList[0] || {};
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}


