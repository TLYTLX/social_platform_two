/**
 * Created by zhao on 2017/8/11.
 */
var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');


// 统一返回格式  code=0代表成功，1代表失败
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: '',
    }
    next();
});

router.use(function (req, res, next) {
    // console.log(req.userInfo);
    if (req.userInfo == null || req.userInfo.identity === 'user') {
        responseData.code = 1;
        responseData.message = '无管理员权限'
        res.json(responseData);
        return;
    }
    next();
})

/*
 * 首页
 * */
router.get('/', function (req, res, next) {
    responseData.code = 0;
    responseData.message = '你好,管理员'
    responseData.userInfo = req.userInfo;
    res.json(responseData);
})

/*
 * 用户管理
 * */
router.get('/user', function (req, res, next) {
    /*
     * 读取数据库中用户数据
     *
     * limit(Number):限制获取数据的条数
     *
     * skip(Number): 忽略数据的条数
     *
     * 每页显示两条
     * 1: 1-2 skip:0 (当前页-1)*limit
     * 2: 3-4 skip:2
     * */
    var page = Number(req.query.page || 1);
    var username = req.query.username;
    var filter = req.query.filter || {$all : ['user', 'admin']};
    var limit = 10;
    var pages = 0;

    if (username) {
        var newUserName = username.trim();
        User.find( { username: new RegExp(newUserName,"gim"), identity: filter} ).count().then(function (count) {
            // 计算总页数
            pages = Math.ceil(count / limit);
            // page取值不能超过pages
            // page = Math.min(page, pages);
            // 取值不能小于1
            // page = Math.max(page, 1);

            var skip = (page - 1) * limit;

            User.find( { username: new RegExp(newUserName,"gim"), identity: filter} ).limit(limit).skip(skip).then(function (users) {
                // console.log(users);
                res.json({
                    userInfo: req.userInfo,
                    users: users,
                    page: page,
                    pages: pages,
                    count: count,
                    limit: limit,
                });
            });

        })
    } else {
        User.find({identity: filter}).count().then(function (count) {
            // 计算总页数
            pages = Math.ceil(count / limit);
            // page取值不能超过pages
            // page = Math.min(page, pages);
            // 取值不能小于1
            // page = Math.max(page, 1);

            var skip = (page - 1) * limit;

            User.find({identity: filter}).limit(limit).skip(skip).then(function (users) {
                // console.log(users);
                res.json({
                    userInfo: req.userInfo,
                    users: users,
                    page: page,
                    pages: pages,
                    count: count,
                    limit: limit,
                });
            });

        })
    }
})

/*
 * 删除用户
 * */
router.get('/user/delete', function (req, res, next) {
    // 获取要删除用户的id
    var ids = req.query.ids.split(',');
    User.deleteMany({
        "_id":{
            "$in":ids
        }
    }).then(function () {
        responseData.code = 0;
        responseData.message = '用户删除成功';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '用户删除失败';
        res.json(responseData);
    })
})

/*
 * 修改用户状态
 * */
router.post('/user/modify/status', function (req, res, next) {
    // 获取要修改用户的id
    var id = req.body.id;
    var isActive = req.body.isActive;
    User.update({
        _id: id,
    },{
        isActive: isActive
    }).then(function () {
        responseData.code = 0;
        responseData.message = '用户修改成功';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '用户修改失败';
        res.json(responseData);
    })
})

/*
 * 修改用户密码
 * */
router.post('/user/modify/password', function (req, res, next) {
    // 获取要修改用户的id
    var id = req.body.id;
    var password = req.body.password;
    User.update({
        _id: id,
    },{
        password: password
    }).then(function () {
        responseData.code = 0;
        responseData.message = '修改密码成功';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '修改密码失败';
        res.json(responseData);
    })
})


/*
 * 分类首页
 * */
router.get('/category', function (req, res, next) {
    /*
     * 读取数据库中所有分类
     *
     * limit(Number):限制获取数据的条数
     *
     * skip(Number): 忽略数据的条数
     *
     * 每页显示两条
     * 1: 1-2 skip:0 (当前页-1)*limit
     * 2: 3-4 skip:2
     * */
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    Category.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count / limit);
        // page取值不能超过pages
        // page = Math.min(page, pages);
        // 取值不能小于1
        // page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        /*
         * sort 排序
         * -1: 降序
         * 1: 升序
         * */
        Category.find().sort({_id: -1}).limit(limit).skip(skip).then(function (categories) {
            // console.log(categories);
            res.json({
                userInfo: req.userInfo,
                categories: categories,
                page: page,
                pages: pages,
                count: count,
                limit: limit,
            });
        });

    })
})

/*
 * 分类的保存
 * */
router.post('/category/add', function (req, res, next) {
    var name = req.body.name || '';
    // 数据库中是否已经存在同名的分类名称
    Category.findOne({
        name: name,
    }).then(function (rs) {
        if (rs) {
            // 如果rs存在表示数据库中已存在该分类
            responseData.message = '数据库中已存在该类别';
            responseData.code = 1;
            res.json(responseData);
            return Promise.reject();
        } else {
            // 数据库中不存在该分类, 可以保存
            return new Category({
                name: name,
            }).save();
        }
    }).then(function (newCategory) {
        responseData.message = '分类添加成功';
        responseData.code = 0;
        res.json(responseData);
    })
})

/*分类编辑首页*/
router.get('/category/edit', function (req, res, next) {
    // 获取要编辑分类的id
    var id = req.query.id;
    Category.findOne({
        _id: id,
    }).then(function (category) {
        responseData.code = 0;
        responseData.message = '分类信息';
        responseData.category = category;
        res.json(responseData);
    })
})

/*
 * 保存分类的修改
 * */
router.post('/category/edit', function (req, res, next) {
    var id = req.body.id;
    var name = req.body.name || '';
    // 获取要修改的分类的信息
    Category.findOne({
        _id: id,
    }).then(function (category) {
        if (!category) {
            responseData.code = 1;
            responseData.message = '分类信息不存在';
            res.json(responseData);
            return Promise.reject();
        } else {
            // 当用户没有做任何修改时
            if (name == category.name) {
                responseData.code = 0;
                responseData.message = '修改成功';
                res.json(responseData);
                return Promise.reject();
            } else {
                // 判断要修改的分类名是否已存在(id不一样但是名字一样)
                return Category.findOne({
                    _id: {$ne: id},
                    name: name,
                })
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory) {
            responseData.code = 1;
            responseData.message = '该分类名称已被占用';
            res.json(responseData);
            return Promise.reject();
        } else {
            return Category.update({
                _id: id
            }, {
                name: name,
            })
        }
    }).then(function () {
        responseData.code = 0;
        responseData.message = '修改成功';
        res.json(responseData);
    })
})

/*
 * 分类的删除
 * */
router.get('/category/delete', function (req, res, next) {
    // 获取要删除分类的id
    var id = req.query.id;
    Category.remove({
        _id: id,
    }).then(function () {
        responseData.code = 0;
        responseData.message = '分类删除成功';
        res.json(responseData);
    })
})

/*
 * 文章管理首页
 * */
router.get('/content', function (req, res, next) {
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    var filter = req.query.filter.trim();
    var type = req.query.type;


    if (filter) {
        if (type == 'title') {
            Content.find( {title: new RegExp(filter,"gi")} ).count().then(function (count) {
                // 计算总页数
                pages = Math.ceil(count / limit);

                var skip = (page - 1) * limit;

                Content.find( {title: new RegExp(filter,"gi")} )
                    .sort({_id: -1}).limit(limit).skip(skip).populate(['user']).then(function (contents) {
                    // console.log(contents);
                    res.json({
                        userInfo: req.userInfo,
                        contents: contents,
                        page: page,
                        pages: pages,
                        count: count,
                        limit: limit
                    });
                });
            });
        } else if (type == 'category') {
            Content.find( {category: new RegExp(filter,"gi")} ).count().then(function (count) {
                // 计算总页数
                pages = Math.ceil(count / limit);

                var skip = (page - 1) * limit;

                Content.find( {category: new RegExp(filter,"gi")} )
                    .sort({_id: -1}).limit(limit).skip(skip).populate(['user']).then(function (contents) {
                    // console.log(contents);
                    res.json({
                        userInfo: req.userInfo,
                        contents: contents,
                        page: page,
                        pages: pages,
                        count: count,
                        limit: limit
                    });
                });
            });
        } else if (type == 'username') {

            User.find ({username: new RegExp(filter,"gi")}).then (function (users) {
                var ids = users.map(item => {
                    return item._id;
                });
                Content.find({user: {$in: ids}}).populate({path:'user'}).count().then(function (count) {
                    // 计算总页数
                    pages = Math.ceil(count / limit);

                    var skip = (page - 1) * limit;

                    Content.find({user: {$in: ids}}).sort({_id: -1}).limit(limit).skip(skip).populate({path:'user'}).then(function (contents) {
                        // console.log(contents);
                        res.json({
                            userInfo: req.userInfo,
                            contents: contents,
                            page: page,
                            pages: pages,
                            count: count,
                            limit: limit
                        });
                    });
                });
            });
        }

    } else {
        Content.count().then(function (count) {
            // 计算总页数
            pages = Math.ceil(count / limit);

            var skip = (page - 1) * limit;

            Content.find().sort({_id: -1}).limit(limit).skip(skip).populate(['user']).then(function (contents) {
                // console.log(contents);
                res.json({
                    userInfo: req.userInfo,
                    contents: contents,
                    page: page,
                    pages: pages,
                    count: count,
                    limit: limit
                });
            });
        });
    }


})

/*
 * 文章添加页面
 * */
// router.get('/content/add', function (req, res, next) {
//     Category.find().sort({_id: -1}).then(function (categories) {
//         res.json({
//             userInfo: req.userInfo,
//             categories: categories,
//         })
//     })
// })
/*
 * 文章保存
 * */
router.post('/content/add', function (req, res, next) {
    // 保存文章到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        user: req.userInfo._id
    }).save().then(function () {
        responseData.code = 0;
        responseData.message = '保存文章成功';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '保存文章失败';
        res.json(responseData);
    })
})

/*
 * 文章的修改页面
 * */
router.get('/content/edit', function (req, res, next) {
    // 获取要修改的文章的信息 并且用表单的形式展现出来
    var id = req.query.id || '';
    // 获取要修改的分类的信息
    Content.findOne({
        _id: id,
    }).then(function (content) {
        if (!content) {
            responseData.code = 1;
            responseData.message = '文章不存在';
            res.json(responseData);
            return Promise.reject();
        } else {
            // console.log(content);
            Category.find().sort({_id: -1}).then(function (categories) {
                res.json({ // 这里要保存原本的信息 尤其是分类 不可以默认顺序排列
                    userInfo: req.userInfo,
                    categories: categories,
                    content: content,
                })
            })
        }
    })
})

/*
 * 保存文章的修改
 * */
router.post('/content/edit', function (req, res, next) {
    var id = req.body.id;
    // 更新文章
    Content.update({
        _id: id,
    }, {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }, function () {
        responseData.code = 0;
        responseData.message = '文章修改成功';
        res.json(responseData);
    })
})

/*
 * 文章的删除
 * */
router.get('/content/delete', function (req, res, next) {
    // 获取要删除帖子的id
    var ids = req.query.ids.split(',');
    Content.deleteMany({
        "_id":{
            "$in":ids
        }
    }).then(function () {
        responseData.code = 0;
        responseData.message = '文章删除成功';
        res.json(responseData);
    }, function () {
        responseData.code = 1;
        responseData.message = '文章删除失败';
        res.json(responseData);
    })
})

/*
 * 修改文章状态
 * */
router.post('/content/modify/status', function (req, res, next) {
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


module.exports = router;
