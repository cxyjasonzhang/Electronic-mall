// 对外暴露一个函数 将token存储到localStorage
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
}
// 获取token
export const getToken = () => localStorage.getItem('TOKEN')
// 删除token
export const removeToken = () => {
    localStorage.removeItem("TOKEN")
}