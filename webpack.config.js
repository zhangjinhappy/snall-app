//加载模块
 const path=require("path");
//  启动热更新的第二部
 const webpack=require("webpack");
 //导入内存中生成HTML页面 的插件
 const htmlWebpackPlugin=require("html-webpack-plugin");
 //导入内存中生成vue页面 的插件
 const VueLoaderPlugin = require('./node_modules/vue-loader/lib/plugin');
 const  Version = new Date().getTime();

module.exports = {
    mode:'production',
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        //输出配置文件
        path:path.join(__dirname,'./html/'),
        filename:'bundle'+Version+'.js'
    },
    devServer:{  //这是配置 dev-server 命令参数第二种形式，相对来数这种方式麻烦一些
        //--open --port 3000 --contentBase src --hot
        open:true,//自动打开浏览器
        port:3010,//设置启动时候运行端口
        contentBase:'src',//指定托管的根目录
        hot: true,//启动热更新 的 第一步
        disableHostCheck: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//热更新的模块对象。第三步
        new webpack.NamedModulesPlugin(),
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),
            filename:"index.html"
        }),
        // 增加一个plugins
        new webpack.ProvidePlugin({
            mui:"mui",
            "window.mui":"mui"
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //       warnings: false,
        //       drop_console: true,
        //       pure_funcs: ['console.log']
        //     },
        //     sourceMap: false
        //   })
    ],
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=7631$name=[hash:8]-[name].[ext]'},
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {test:/\.vue$/,use:['vue-loader']}            
        ]
    },
    performance: {
        hints: "error", // 枚举   
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
          // 提供资源文件名的断言函数
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
        }
    },
  
      
};