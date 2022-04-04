// 当前模块：API统一管理
import requests from "./ajax";
import mockRequests from "./mockAjax"

// 三级联动接口
export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: 'get' })
// 发请求：axios发请求返回结果Promise对象


// 获取banner  （Home首页轮播图接口）
export const reqBannerList = () => mockRequests({ url: "/banner", method: 'get' })
//获取floor 数据
export const reqFloorList = () => mockRequests({ url: "/floor", method: 'get' })

// 当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params })
// 获取产品详情页的信息
export const reqGetGoodsInfo = (skuid) => requests({ url: `/item/${skuid}`, method: 'get' })
// 将商品添加到购物车中（获取更新某个商品的个数）
export const reqAddOrUpdateShopCar = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 获取购物车列表接口----紧接着就是获取数据--存到vuex 三连环
export const reqCartList = () => requests({ url: '/cart/cartList', methods: 'get' })
// 删除商品接口 传入商品Id
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
//修改购物车商品选中接口 传入两个参数
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
// 发送验证码的请求接口
export const reqMessageCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 注册接口 post请求 要传参数 phone password code 为string
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', method: "post", data })
// 登陆接口  post请求
export const reqUserLogin = (data) => requests({ url: "/user/passport/login", data, method: "post" })
//获取用户信息  get 请求
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
// 退出登录接口 get请求
export const reqUserLoginOut = () => requests({ url: '/user/passport/logout', method: 'get' })
// 获取用户地址信息 get请求 统一登录账号密码
export const reqUserAddress = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
// 获取订单信息 
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// 提交订单接口  ----- 现在开始练习不使用vuex 三连环来获取数据
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
// 获取订单支付信息接口
export const reqPayMessage = (orderId) => requests({ url: `payment/weixin/createNative/${orderId}`, method: 'get' })
// 查询订单支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
// 获取我的订单列表  当PersonOrder组件挂载完毕后 开始请求
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
