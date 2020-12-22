module.exports = {
    publicPath: '/',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'https://c.iwanmen.com/element/api/', 
                ws: true,
                changeOrigin: true,//本地开启一个虚拟服务器
                pathRewrite: { //路径重写 
                    '^/api': '' //替换target中的请求地址， 请求https://eleme3-october.herokuapp.com/api/的时候直接使用/api替换就行
                }
            }
        }
    }
}