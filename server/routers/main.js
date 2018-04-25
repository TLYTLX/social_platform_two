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

/*获取个人信息*/
router.get('/my/info', function (req, res, next) {
    var id = req.query.id;
    User.find( { username: id} ).then(function (users) {
        res.json({
            userInfo: users[0]
        });
    });
})

/*编辑个人信息*/
router.post('/my/modify/info', function (req, res, next) {
    // 获取要修改用户的id
    var id = req.body.id;
    User.update({
        _id: id,
    },{
        avatar: req.body.avatar,
        year: req.body.year,
        introduce: req.body.introduce,
        college: req.body.college,
        sex: req.body.sex,
    }).then(function () {
        responseData.code = 0;
        responseData.message = '修改个人信息成功';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '修改个人信息失败';
        res.json(responseData);
    })
})

/*用户修改密码*/
router.post('/my/modify/password', function (req, res, next) {
    // 获取要修改用户的id
    var id = req.body.id;
    var password = req.body.pass;
    var newPass = req.body.newPass;
    // 查询数据库中用户名和密码是否存在且对应, 如是, 则登陆成功
    User.findOne({
        _id: id,
        password: password,
    }).then(function (userInfo) {
        if (!userInfo) {
            responseData.code = 2;
            responseData.message = '原密码错误';
            res.json(responseData);
            return;
        } else {
            User.update({
            _id: id,
        },{
            password: newPass
        }).then(function () {
            responseData.code = 0;
            responseData.message = '修改密码成功';
            res.json(responseData);
        }, function () {
            responseData.code = 1;
            responseData.message = '修改密码失败';
            res.json(responseData);
        })
        }
    })
})

/*获取个人发帖列表*/
var mydata = {};
router.get('/my/contents', function (req, res, next) {
    var ObjectId = require('mongodb').ObjectId;
    mydata.user = ObjectId(req.query.id);
    mydata.count = 0;
    mydata.page = Number(req.query.page || 1);
    mydata.limit = 10;
    mydata.pages = 0;
    Content.find({user: mydata.user}).count().then(function (count) {
        mydata.count = count;
        mydata.pages = Math.ceil(mydata.count / mydata.limit);
        var skip = (mydata.page - 1) * mydata.limit;
        return Content.find({user: req.query.id}).sort({addTime: -1}).limit(mydata.limit).skip(skip);
    }).then(function (contents) {
        mydata.contents = contents;
        res.json(mydata);
    })
})
/*删除我的帖子*/
router.get('/my/contents/delete', function (req, res, next) {
    // 获取要删除帖子的id
    var ids = req.query.id.split(',');
    Content.deleteMany({
        "_id":{
            "$in":ids
        }
    }).then(function () {
        responseData.code = 0;
        responseData.message = '删除帖子成功';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '删除帖子失败';
        res.json(responseData);
    })
})

/*修改我的帖子状态*/
router.post('/my/contents/modify/status', function (req, res, next) {
    // 获取要修改帖子的id
    var id = req.body.id;
    var isActive = req.body.isActive;
    Content.update({
        _id: id,
    },{
        isActive: isActive
    }).then(function () {
        responseData.code = 0;
        responseData.message = '帖子修改成功';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '帖子修改失败';
        res.json(responseData);
    })
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
