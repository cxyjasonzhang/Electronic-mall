import { reqUserAddress, reqOrderInfo } from '@/api'
const state = {
    address: [],
    orderInfo: {}
};
const mutations = {
    // 将请求到的地址信息存到state中
    GETADDRESS(state, address) {
        state.address = address
    },
    GETORDER(state, order) {
        state.orderInfo = order
    }
};
const actions = {
    // 请求用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqUserAddress();
        // console.log(result)
        if (result.code == 200) {
            commit('GETADDRESS', result.data)
        }
    },
    // 请求订单信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        // console.log(result);
        if (result.code == 200) {
            commit('GETORDER', result.data)
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