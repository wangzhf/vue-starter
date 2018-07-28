const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 解析路径
function resolve(_dir){
    return path.join(__dirname, '..', _dir);
}

// 解析资源路径
function assetsPath(_path){
    return path.join(config.prod.assetsSubDirecotry, _path);
}

module.exports = {
    resolve,
    assetsPath
}
