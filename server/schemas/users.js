/**
 * Created by zhao on 2017/8/12.
 */
var mongoose = require('mongoose');

// 用户的表结构
module.exports = new mongoose.Schema({
    // 用户名
    username: String,
    // 密码
    password: String,
    // 身份，三种：普通用户(user)，管理员(admin)，超级管理员(superAdmin)
    identity: {
        type: String,
        default: 'user'
    },
    // 是否激活
    isActive: {
        type: Boolean,
        default: true
    },
    // 注册时间
    registerDate: {
        type:Date,
        default:Date.now
    }
});
