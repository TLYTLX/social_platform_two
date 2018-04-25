/**
 * Created by zhao on 2017/8/11.
 */

var express = require('express');

var router = express.Router();

var Content = require('../models/Content');

var User = require('../models/User');

// 统一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: '',
    }
    next();
});

router.get('/', function (req, res, next) {
    if (req.userInfo) {
        responseData.code = 0;
        responseData.message = '已登录';
    } else {
        responseData.code = 1;
        responseData.message = '未登录';
    }
    responseData.userInfo = req.userInfo;
    res.json(responseData);
})


/*获取帖子列表*/
var data = {};
router.get('/content', function (req, res, next) {
    data.category = req.query.category || '';
    var type = req.query.type || '';
    var value = req.query.value.trim() || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 10;
    data.pages = 0;
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    if (type && value) {
        where[type] = new RegExp(value,"gi");
    } else if (value) {
        where.title = new RegExp(value,"gi");
    }
    Content.find(where).count().then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);

        var skip = (data.page - 1) * data.limit;

        return Content.find().where(where).sort({addTime: -1}).limit(data.limit).skip(skip).populate(['user']);

    }).then(function (contents) {
        data.contents = contents;
        // console.log(data);
        res.json(data);
    })
})

/*获取热赞帖子列表*/
var likedata = {};
router.get('/content/like', function (req, res, next) {
    likedata.category = req.query.category || '';
    likedata.number = req.query.number || 5;
    var where = {};
    if (likedata.category) {
        where.category = likedata.category;
    }
    Content.where(where).sort({like: -1}).limit(likedata.number).populate(['user']).then(function (contents) {
        likedata.contents = contents;
        // console.log(data);
        res.json(likedata);
    });
})

/*帖子详情*/
var contentDetail = {};
router.get('/view', function (req, res, next) {
    var contentId = req.query.contentid;
    contentDetail.count = 0;
    contentDetail.page = Number(req.query.page || 1);
    contentDetail.limit = 10;
    contentDetail.pages = 0;

    Content.findOne({
        _id: contentId,
    }).populate(['user']).then(function (content) {
        contentDetail.count = content.comments.length;
        content.views = content.views + 1;
        content.save();
        Content.findOne({
            _id: contentId,
        }, {comments: {$slice: [(contentDetail.page-1)*contentDetail.limit,contentDetail.limit]}}).populate(['user']).then(function (content) {
            contentDetail.content = content;
            res.json(contentDetail);
        });

    })
})

/*
 * 帖子保存
 * */
router.post('/content/add', function (req, res, next) {
    // 保存帖子到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description || '',
        content: req.body.content,
        user: req.userInfo._id,
        addTime: new Date(),
        area: req.body.area || '',
        meetTime: req.body.meetTime,
        type: req.body.type || '',
    }).save().then(function () {
        responseData.code = 0;
        responseData.message = '保存帖子成功';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '保存帖子失败';
        res.json(responseData);
    })
})

/*
 * 帖子点赞数加1
 * */
router.post('/like', function (req, res, next) {
    var contentId = req.query.contentid;


    Content.findOne({
        _id: contentId,
    }).populate(['user']).then(function (content) {
        content.like = content.like + 1;
        return content.save();
    }).then(function () {
        responseData.message = '保存成功';
        responseData.code = 0;
        res.json(responseData);
    }, function () {
        responseData.message = '保存失败';
        responseData.code = 1;
        res.json(responseData);
    });
})

/*
 * 提交帖子评论
 * */
router.post('/content_comment/post', function (req, res, next) {
    // 文章ID
    var contentId = req.body.contentid || '';
    var postData = {};
    // 评论信息
    User.findOne ({username: req.userInfo.username}).then (function (user) {
        postData = {
            user: {
                name: req.userInfo.username,
                college:user.college,
                sex:user.sex,
                year:user.year
            },
            postTime: new Date(),
            content: req.body.content,
            reply: []
        }
    });
    // 查询当前文章的信息
    Content.findOne({
        _id: contentId,
    }).populate(['user']).then(function (content) {
        content.comments.push(postData);
        return content.save();
    }).then(function (newContent) {
        responseData.message = '评论成功';
        responseData.data = newContent;
        res.json(responseData);
    })
})
/*
 * 提交回复评论
 * */
router.post('/reply_comment/post', function (req, res, next) {
    // 帖子id
    var contentId = req.body.contentid || '';
    // 楼层
    var postFloor = req.body.postfloor || 0;
    // 回复的对象
    var replyUser = req.body.replyuser || '';
    var replyComment = {
        username: req.userInfo.username,
        postTime: new Date(),
        content: req.body.content,
        replyUser: replyUser
    };

    // 查询当前文章的信息
    Content.findOne({
        _id: contentId
    }).populate(['user']).then(function (content) {
        content.comments[postFloor].reply.push(replyComment);
        //混合类型修改完必须调用markModified splice能成功是因为 mongooseArray 内在调用了this._markModified()
        // 详细解释见：http://cnodejs.org/topic/516ab9c96d38277306376cad
        content.comments.splice(0,0);
        return content.save();
    }).then(function (newContent) {
        responseData.message = '回复成功';
        responseData.data = newContent;
        res.json(responseData);
    })
})


module.exports = router;
