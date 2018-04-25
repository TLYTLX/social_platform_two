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
    },
    //专业
    college: {
        type: String,
        default: '未知'
    },
    //性别
    sex:{
        type: String,
        default: '未知'
    },
    //年级
    year:{
        type: String,
        default: '未知'
    },
    //简介
    introduce:{
        type: String,
        default: '暂无'
    },
    //头像
    avatar:{
        type:String,
        default:''
    }
});
