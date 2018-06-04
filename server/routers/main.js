/**
 * Created by zhao on 2017/8/11.
 */

var express = require('express');

var router = express.Router();

var http = require("http");

var tc = require('text-censor');

formidable = require('formidable'),
fs = require('fs'),
AVATAR_UPLOAD_FOLDER = '/avatar/';
SALE_UPLOAD_FOLDER = '/sale/';

var Content = require('../models/Content');

var User = require('../models/User');

//加密
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

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
    User.findOne( { _id: id} ).then(function (user) {
        res.json({
            userInfo: user
        });
    });
})

/*获取他人信息*/
var userinfo = {};
router.get('/information', function (req, res, next) {
    var name = req.query.name;
    User.findOne( { username: name} ).then(function (user) {
        userinfo._id = user._id;
        userinfo.username = user.username;
        userinfo.year = user.year;
        userinfo.college = user.college;
        userinfo.introduce = user.introduce;
        userinfo.sex = user.sex;
        userinfo.avatar = user.avatar;
        userinfo.registerDate = user.registerDate;
        return Content.find({user: userinfo._id}).count().then(function (count) {
            userinfo.count = count;
            res.json({
                userInfo: userinfo
            });
        })
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
    // 查询数据库中用户名和密码是否存在且对应, 如是, 则可以进行修改
    //旧密码加密
    var content = 'slcks' + password + 'dref';
    var sign = crypto.createHash('md5').update(content).digest('hex');

    User.findOne({
        _id: id,
        password: sign,
    }).then(function (userInfo) {
        if (!userInfo) {
            responseData.code = 2;
            responseData.message = '原密码错误';
            res.json(responseData);
            return;
        } else {
            //新密码加密
            var content2 = 'slcks' + newPass + 'dref';
            var sign2 = crypto.createHash('md5').update(content2).digest('hex');
            User.update({
            _id: id,
        },{
            password: sign2
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

/*获取个人消息列表*/
var myMessage = {};
router.get('/my/message', function (req, res, next) {
    myMessage.id = req.query.id;
    myMessage.user = req.query.user;
    myMessage.count = 0;
    myMessage.page = Number(req.query.page || 1);
    myMessage.limit = 5;
    myMessage.pages = 0;
    myMessage.contents = [];
    var list = [];
    Content.find({$or:[{user: myMessage.id,"comments.0": { "$exists" : 1 }},
        {"comments.user.name": myMessage.user},
        {"comments.reply.replyUser": myMessage.user}] }
    ).then(function (contents) {
        for(let i = 0;i < contents.length;i++) {
            for(let j = 0;j < contents[i].comments.length;j++) {
                if(contents[i].user == myMessage.id &&
                    contents[i].readTime < contents[i].comments[j].postTime
                    ) {
                    let obj = {};
                    obj.title = contents[i].title;
                    obj.id = contents[i]._id;
                    obj.category = contents[i].category;
                    obj.content = contents[i].comments[j].content;
                    obj.postTime = contents[i].comments[j].postTime;
                    obj.user = contents[i].comments[j].user.name;
                    obj.type = 1;
                    list.push(obj);
                } else if(contents[i].user != myMessage.id) {
                    for(let k = 0;k < contents[i].comments[j].reply.length;k++) {
                        if(contents[i].comments[j].user.name == myMessage.user &&
                            contents[i].readTime < contents[i].comments[j].reply[k].postTime) {
                            let obj = {};
                            obj.title = contents[i].title;
                            obj.id = contents[i]._id;
                            obj.category = contents[i].category;
                            obj.content = contents[i].comments[j].reply[k].content;
                            obj.postTime = contents[i].comments[j].reply[k].postTime;
                            obj.user = contents[i].comments[j].reply[k].username;
                            obj.type = 2;
                            list.push(obj);
                        } else if(contents[i].comments[j].reply[k].replyUser == myMessage.user &&
                            contents[i].readTime < contents[i].comments[j].reply[k].postTime) {
                            let obj = {};
                            obj.title = contents[i].title;
                            obj.id = contents[i]._id;
                            obj.category = contents[i].category;
                            obj.content = contents[i].comments[j].reply[k].content;
                            obj.postTime = contents[i].comments[j].reply[k].postTime;
                            obj.user = contents[i].comments[j].reply[k].username;
                            obj.type = 3;
                            list.push(obj);
                        }
                    }
                }
            }
        }
        if(list.length>1) list.sort(function(a,b){
            return b.postTime - a.postTime;
        })
        myMessage.count = list.length;
        myMessage.contents = list.slice((myMessage.page-1)*myMessage.limit,myMessage.page*myMessage.limit);
        res.json(myMessage);
    })
})

/*修改文章已读事件*/
router.post('/my/contents/modify/readTime', function (req, res, next) {
    var id = req.body.id;
    var time = req.body.time;
    Content.update({
        _id: id
    },{
        readTime: time
    }).then(function () {
        responseData.code = 0;
        responseData.message = '评论状态变为已读';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '评论状态修改失败';
        res.json(responseData);
    })
})

/*获取帖子列表*/
var data = {};
router.get('/content', function (req, res, next) {
    data.category = req.query.category || '';
    var type = req.query.type || '';
    var value = req.query.value.trim() || '';
    var sex = req.query.sex || '';
    var area = req.query.area || '';
    var money = req.query.money || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    if(data.category === '二手市场') data.limit = 30;
    else data.limit = 10;
    data.pages = 0;
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    if (type && value && data.category === '匿名论坛') {
        where[type] = new RegExp(value,"gi");
    } else if (data.category === '新鲜事' || data.category === '二手市场') {
        if(type)where.type = new RegExp(type,"gi");
        if(value)where.title = new RegExp(value,"gi");
    } else if (data.category === '合租') {
        if(sex)where.sex = new RegExp(sex,"gi");
        if(area)where.area = new RegExp(area,"gi");
        if(money)where.money = new RegExp(money,"gi");
        if(value)where.title = new RegExp(value,"gi");
    } else if (value) {
        where.title = new RegExp(value,"gi");
    }
    Content.find(where).count().then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);

        var skip = (data.page - 1) * data.limit;

        if (data.category === '匿名论坛') {
            return Content.find().where(where).sort({addTime: -1}).limit(data.limit).skip(skip);
        } else {
            return Content.find().where(where).sort({addTime: -1})
                   .limit(data.limit).skip(skip)
                   .populate({path: 'user', select: 'username college sex year introduce avatar'});
        }

    }).then(function (contents) {
        data.contents = contents;
        // console.log(data);
        res.json(data);
    })
})

router.get('/map',function(req,res,next){
    http.request('http://map.baidu.com/subways/index.html?c=beijing&ccode=131&qq-pf-to=pcqq.group',function(res){
        console.log(res);
    })

})

router.post('/upload', function(req, res) {

  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {

    if (err) {
      res.locals.error = err;
      //res.render('index', { title: TITLE });
      return;
    }
    //console.log('11111111',files);

    var extName = '';  //后缀名
    switch (files.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    /*if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      //res.render('index', { title: TITLE });
      console.log(extName)
      return;
    }*/

    var avatarName = Math.random() + '.' + extName;
    //图片写入地址；
    var newPath = form.uploadDir + avatarName;
    //显示地址；
    //var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
    //console.log("newPath",newPath);
    //fs.renameSync(files.path, newPath);  //重命名
    responseData.code = 0;
    responseData.data = files;
    responseData.message = '上传成功';
    //responseData.path = files.path;
    res.json(responseData);
  });
});

/*获取热赞帖子列表*/
var likedata = {};
router.get('/content/like', function (req, res, next) {
    likedata.category = req.query.category || '';
    likedata.number = req.query.number || 10;
    var where = {};
    if (likedata.category) {
        where.category = likedata.category;
    }
    if (likedata.category === '匿名论坛') {
        Content.where(where).sort({like: -1}).limit(likedata.number).then(function (contents) {
            likedata.contents = contents;
            // console.log(data);
            res.json(likedata);
        });
    } else {
        Content.where(where).sort({like: -1}).limit(likedata.number)
            .populate({path: 'user', select: 'username college sex year introduce avatar'})
            .then(function (contents) {
            likedata.contents = contents;
            // console.log(data);
            res.json(likedata);
        });
    }
})

/*
 * 帖子保存
 * */
router.post('/content/add', function (req, res, next) {

    //过滤敏感字眼
    let content = req.body.content,
        title = req.body.title,
        alias = req.body.alias || '';
    tc.filter(content,function(err, censored){
        content = censored;
    });
    tc.filter(title,function(err, censored){
        title = censored;
    });
    tc.filter(alias,function(err, censored){
        alias = censored;
    });
    // 保存帖子到数据库
    new Content({
        category: req.body.category,
        title: title,
        description: req.body.description || '',
        content: content,
        user: req.userInfo._id,
        addTime: new Date(),
        area: req.body.area || '',
        image: req.body.image || '',
        meetTime: req.body.meetTime,
        type: req.body.type || '',
        alias: alias,
        sex: req.body.sex || '',
        money: req.body.money || ''
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
    }).then(function (content) {
        contentDetail.count = content.comments.length;
        content.views = content.views + 1;
        content.save();

        if (content.category === '匿名论坛') {
            Content.findOne({
                _id: contentId,
            }, {comments: {$slice: [(contentDetail.page-1)*contentDetail.limit,contentDetail.limit]}}).then(function (content) {
                contentDetail.content = content;
                res.json(contentDetail);
            });
        } else {
            Content.findOne({
                _id: contentId,
            }, {comments: {$slice: [(contentDetail.page-1)*contentDetail.limit,contentDetail.limit]}})
                .populate({path: 'user', select: 'username college sex year introduce avatar'})
                .then(function (content) {
                contentDetail.content = content;
                res.json(contentDetail);
            });
        }
    })
})

/*
 * 帖子点赞数加1
 * */
router.post('/like', function (req, res, next) {
    var contentId = req.query.contentid;


    Content.findOne({
        _id: contentId,
    }).populate({path: 'user', select: 'username college sex year introduce avatar'}).then(function (content) {
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
    Content.findOne({
        _id: contentId,
    }).then(function (content) {
        let comment = req.body.content;
        tc.filter(comment,function(err, censored){
            comment = censored;
        });
        if (content.category === '匿名论坛') {
            postData = {
                // 评论信息
                user: {
                    name: '匿名用户',
                    college:'匿名',
                    sex:'匿名',
                    year:'匿名',
                },
                postTime: new Date(),
                content: comment,
                reply: []
            };
            Content.findOne({
                _id: contentId,
            }).populate({path: 'user', select: 'username college sex year introduce avatar'}).then(function (content) {
                content.comments.push(postData);
                return content.save();
            }).then(function (newContent) {
                responseData.message = '评论成功';
                responseData.data = newContent;
                res.json(responseData);
            },function(err){console.log(err)})
        } else {
            // 评论信息
            User.findOne ({username: req.userInfo.username}).then (function (user) {
                postData = {
                    user: {
                        name: req.userInfo.username,
                        college:user.college,
                        sex:user.sex,
                        year:user.year,
                        avatar:user.avatar
                    },
                    postTime: new Date(),
                    content: comment,
                    reply: []
                };
                Content.findOne({
                    _id: contentId,
                }).populate({path: 'user', select: 'username college sex year introduce avatar'}).then(function (content) {
                    content.comments.push(postData);
                    return content.save();
                }).then(function (newContent) {
                    responseData.message = '评论成功';
                    responseData.data = newContent;
                    res.json(responseData);
                },function(err){console.log(err)})
            })

        }
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
    var replyComment = {};

    Content.findOne({
        _id: contentId,
    }).then(function (content) {
        let comment = req.body.content;
        tc.filter(comment,function(err, censored){
            comment = censored;
        });
        if (content.category === '匿名论坛') {
            replyComment = {
                username: '匿名用户',
                postTime: new Date(),
                content: comment,
                replyUser: replyUser
            };
        } else {
            replyComment = {
                username: req.userInfo.username,
                postTime: new Date(),
                content: comment,
                replyUser: replyUser
            };
        }
        // 查询当前文章的信息
        Content.findOne({
            _id: contentId
        }).populate({path: 'user', select: 'username college sex year introduce avatar'}).then(function (content) {
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
})


module.exports = router;
