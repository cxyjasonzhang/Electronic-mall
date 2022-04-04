module.exports = {
    // 关闭eslint校验
    lintOnSave: false,
    productionSourceMap: false,
    // 代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: { '^/api': '' }
            }
        }
    }
}