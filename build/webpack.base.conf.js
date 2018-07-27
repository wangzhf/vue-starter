const path = require('path');

// 解析路径
function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {

    entry: {
        main: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js?[hash]',
        chunkFilename: '[name].js?[hash]'
    },

    // module
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    minChunks: 1
                }
            }
        }
    }
}
