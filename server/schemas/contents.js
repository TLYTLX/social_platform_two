/**
 * Created by zhao on 2017/8/12.
 */
var mongoose = require('mongoose');

// 文章的表结构
module.exports = new mongoose.Schema({
    // 文章分类
    category: String,
    // 文章标题
    title: String,
    // 状态 是否解冻
    isActive: {
        type: Boolean,
        default: true
    },
    // 简介
    description: {
        type: String,
        default: '',
    },
    // 内容
    content: {
        type: String,
        default: '',
    },
    // 关联字段 - 用户的id 以后查询时可通过populate(user)把整条记录抽出来,而不仅仅是查询出id
    user: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'User',
    },
    addTime: {
        type: Date,
        default: new Date(),
    },
    views: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Array,
        default: []
    },
});
