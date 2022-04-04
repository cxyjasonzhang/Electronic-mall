// detail 小仓库 
import { reqGetGoodsInfo, reqAddOrUpdateShopCar } from "@/api"
// 引入返回游客身份的ID---->随机字符串
import { getUUID } from '@/utils/uuid_token'
const state = {
    // 这边初始数据格式不能乱写，先看一下服务器返回的数据是什么类型的
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
};
const mutations = {
    GOODSINFO(state, goodinfo) {
        state.goodInfo = goodinfo;
    }
};
const actions = {
    // 获取产品信息action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGetGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GOODSINFO", result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCar(skuId, skuNum);
        // 加入购物车发送请求，前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他数据，只返回code==200，表明操作成功
        // 因为没有返回数据，不需要三连环存储数据
        // console.log(result);
        if (result.code == 200) {
            // 加入购物车成功
            return 'OK'
        } else {
            // 加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {
    // 路径导航简化数据
    categoryView(state) {
        //因为state中的goodInfo初始状态是一个空对象，当网络不好的时候，数据还未存到仓库中，点击Search组件中图片跳转Detail组件时返回的categoryView数据为undefined
        // 所以使它至少为空对象 ，浏览器不会警告
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 售卖属性数据简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }

};
export default {
    state,
    mutations,
    actions,
    getters
}