const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');
const html = require('html-withimg-loader');
const cleanWebpack = require('clean-webpack-plugin');

module.exports = {
    entry:'./src/app.js',
    output:{
        path:path.resolve(__dirname,'dist/'),
        filename:'js/app.js',
        publicPath:'/'
    },
    plugins:[
        new HtmlWebpack({
            filename:'index.html',
            template:'./src/index.html'
        }),
        new cleanWebpack(['dist'])   //清除dist目录
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            'react'
                        ]
                    }                    
                }],
                exclude:[path.resolve(__dirname,'node_modules')]
            },
            {
                //这部分是需要被模块化的文件
                test:/\.css$/,
                // localIdentName:取值 path , name , local , hash:base64
                use:['style-loader',{ loader:'css-loader',options:{module:true,localIdentName:'[name]-[local]_[hash:base64:6]'} }],
                exclude:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'src/common')
                ]
            },
            {   //这部分是不用模块化的CSS文件
                test:/\.css$/,
                use:['style-loader','css-loader'],
                include:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'src/common')
                ]

            },
            {
                test:/\.jpg$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'assets/img/[name]_[hash:6].[ext]'
                    }
                }]
            },
            {
                test:/\.html$/,
                use:['html-withimg-loader']
            },
            {
                test:/\.(svg|woff|woff2|ttf|eot)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'assets/fonts/[name]_[hash:6].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    devServer:{
        port:8000,
        open:true,
        contentBase:'./src',
        publicPath:'/'
    }    
}