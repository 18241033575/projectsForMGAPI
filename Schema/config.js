const mongoose = require('mongoose');




// 在操作数据库前，使用schema设置每个字段的数据类型
const Schema = mongoose.Schema;

module.exports = {
    mongoose,
    Schema
};