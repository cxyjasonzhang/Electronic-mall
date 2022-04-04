// 自定义插件 vue插件一定是暴露一个对象
let myPlugin = {};

myPlugin.install = function (Vue, options) {
    // 第一个参数是vue函数，第二个参数为使用插件时传入的自定义对象
    // console.log(options);
    Vue.directive(options.name, (element, params) => {
        console.log(params);
        // 将msg的值转化为大写字母
        element.innerHTML = params.value.toUpperCase();
    })
}

export default myPlugin;