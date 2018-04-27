<template>
    <div>
        <div id="main">
            <div class="page">
                <el-button>
                    <router-link :to=path>
                        返回本版
                    </router-link>
                </el-button>
            </div>

            <div class="post-title">
                【{{post.category}}】{{post.title}}
            </div>

            <div class="singlepost">
                <div class="post-left">
                    <div class="poster">贴主</div>
                    <router-link to="/profile"><img class="avatar" :src="user.avatar"></router-link>
                    <router-link to="/profile" style="text-decoration: none;">
                        <div class="username">{{user.username}}</div>
                    </router-link>
                    <div class="info">{{user.college}}学院  {{user.year}}年级</div>
                </div>
                <div class="post-right">
                    <div class="post-content">{{post.content}}</div>
                </div>
            </div>

            <div class="singlepost" v-for="(i,index) in post.comments">
                <div class="post-left">
                    <router-link to="/profile"><img class="avatar" :src="i.user.avatar"></router-link>
                    <router-link to="/profile" style="text-decoration: none;">
                        <div class="username">{{i.user.name}}</div>
                    </router-link>
                    <div class="info">{{i.user.college}}  {{i.user.year}}级</div>
                </div>
                <div class="post-right">
                    <div style="color:#bfbfbf">{{index+1}}楼</div>
                    <div class="post-content">{{i.content}}</div>
                    <div class="post-reply" v-if="i.reply.length" v-for="j in i.reply">
                        <a href >{{j.username}}</a>
                        <span v-if="j.replyUser">回复<a href>{{j.replyUser}}</a></span>
                        ：{{j.content}}
                        <div>{{j.content}}
                            <span v-if="reply2!=i" @click="reply2=i">回复</span>
                            <div style="text-align: right" v-else>
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入内容"
                                    v-model="reply_content">
                                </el-input>
                                <el-button type="primary" class="submit" @click="onSubmitReply(reply_content, index, j.username)">提交</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="post-option">
                        <div style="cursor:pointer" @click="reply=i">
                            <i class="el-icon-edit-outline"></i>
                            回帖
                        </div>
                        <div>发表于 {{i.postTime}}</div>
                    </div>
                    <div style="text-align: right" v-show="reply==i">
                        <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="comment_content">
                        </el-input>
                        <el-button type="primary" class="submit" @click="onSubmitReply(comment_content, index, '')">提交</el-button>
                    </div>
                </div>
            </div>
            <div class="page">
                <el-button>
                    <router-link to="/profess">
                        返回本版
                    </router-link>
                </el-button>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    :total="total">
                </el-pagination>
            </div>
            <div class="main-reply">
                <div style="text-align:left;margin:10px 0;">快速回复楼主：</div>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 5}"
                    placeholder="写下你的评论"
                    v-model="editing_comment">
                </el-input>
                <el-button type="primary" class="submit" @click="onSubmitComment">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>

    const CATEGORY = {
        '相约华工': '/date',
        '二手市场': '/sale',
        '匿名论坛': '/anonymous',
        '新鲜事': 'news',
        '表白墙': '/profess',
        '合租信息': 'rent'
    };

    export default {

        data() {
            return {
                //是否是匿名模块
                alias: '',
                path: '',
                editing_comment: '',
                reply_content: '',
                comment_content:'',
                reply: 0,
                reply2:0,
                page: 1,
                total: 0,
                user: {
                    username: '',
                    college: '未知',
                    year: '未知'
                },
                post:{
                    title:'',
                    content:'',
                    category: '',
                    comments:[{
                        user: {
                            name: '',
                            college:'',
                            sex:'',
                            year:''
                        },
                        postTime: new Date(),
                        content: '',
                        reply: [{username: '',
                            postTime: new Date(),
                            content: '',
                            replyuser: ''
                        }]
                    }]
                }
            }
        },

        created () {
            this.getView();
        },

        methods: {
            getView () {
                this.$http.get('http://localhost:8081/view?contentid=' + this.$route.query['id'] + '&page=' + this.page).then(response => {
                    this.post = response.data.content;
                    this.total = response.data.count;
                    this.path = CATEGORY[response.data.content.category];
                    this.alias = response.data.content.alias;
                    if(this.alias) {
                        this.user.username = this.alias;
                        this.user.college = '匿名';
                        this.user.year = '匿名';
                    } else {
                        this.user = response.data.content.user;
                    }
                    this.post.comments.forEach((comment) => {
                        comment.postTime = this.formatDate(comment.postTime);
                    });
                }, response => {
                    console.log('error:' + response);
                })
            },

            handleCurrentChange(val) {
                this.page = val;
                this.getView();
            },

            onSubmitComment () {
                if (this.editing_comment == '') {
                    this.$message({
                        message: '评论不能为空',
                        type: 'warning'
                    });
                    return;
                }
                this.$http.post('http://localhost:8081/content_comment/post', {
                    contentid: this.$route.query['id'],
                    content: this.editing_comment,
                }).then(() => {
                    this.editing_comment = "";
                    //如果拿后台返回的数据，那么造成的后果是不会及时分页
//                    this.post = response.data.data;
//                    this.post.comments.forEach((comment) => {
//                        comment.postTime = this.formatDate(comment.postTime);
//                    });
                    this.getView();
                }, response => {
                    console.log('error:' + response);
                })
            },

            onSubmitReply(comment, i, replyuser) {
                if (comment == '') {
                    this.$message({
                        message: '回复不能为空',
                        type: 'warning'
                    });
                    return;
                }
                this.$http.post('http://localhost:8081/reply_comment/post', {
                    contentid: this.$route.query['id'],
                    content: comment,
                    postfloor: i,
                    replyuser: replyuser
                }).then(response => {
                    this.comment_content = "";
                    this.reply_content = "";
                    this.post = response.data.data;
                    this.post.comments.forEach((comment) => {
                        comment.postTime = this.formatDate(comment.postTime);
                    });
                }, response => {
                    console.log('error:' + response);
                })
            },
        }
    }
</script>

<style>
    body{
        background: #f7f9fb;
        margin:0;
    }
    /*#main{*/
        /*margin: 40px auto;*/
        /*width: 80%;*/
        /*border-top: 3px solid #6ba484;*/
        /*background: #fff;*/
    /*}*/
    .page{
        padding: 20px;
        border-bottom: 1.5px solid #e6e7ea;
        display: flex;
        align-items: center;
    }
    .post-title {
        font-size: 28px;
        font-weight: 500;
        padding-left: 50px;
        line-height: 70px;
        border-bottom: 1.5px solid #e6e7ea;
    }
    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 50px auto 10px;
        background: #aaa;
    }
    .submit{
        width: 120px;
        margin: 20px 0;
        color: #fff;
    }
    .username{
        font-size: 20px;
        color: #73BAB2;
        line-height: 40px;
        cursor: pointer;
    }
    .main-reply{
        padding: 30px;
        text-align: right;
    }
    .el-icon-bell {
        font-weight: bold;
        color: #73bab2;
        font-size: 20px;
    }
    .connect {
        cursor: pointer;
        margin: 10px 0;
        display: inline-block;
        background: #73BAB2;
        color: #fff;
        border-radius: 5px;
        padding: 3px 10px;
    }
    .singlepost{
        display: flex;
        justify-content: space-around;
        border-bottom: 3px solid #7DBDB5;
    }
    .post-content{
        min-height: 250px;
    }
    .post-reply{
        border-top: 1.5px solid #e6e7ea;
        margin:10px 0;
        padding-top: 10px;
        overflow: hidden;
    }
    .post-reply div{
        text-align: right;
        color: #C0C4CC;
    }
    .post-reply span{
        color: #aaa;
        margin-left: 10px;
        cursor: pointer;
    }
    .post-option{
        border-top: 1.5px solid #e6e7ea;
        line-height: 43px;
        display: flex;
        justify-content: space-between;
        color: #C0C4CC;
    }
    .el-icon-edit-outline {
        font-size: 24px;
        margin-right: 5px;
    }
    .poster {
        position: absolute;
        right:20px;
        top: 20px;
        background: #6ba484;
        color: #fff;
        padding: 2px 5px;
        border-radius: 5px;
    }
    .post-left{
        text-align: center;
        width: 250px;
        margin-bottom: 20px;
        position: relative;
    }
    .post-right{
        padding: 40px;
        flex: 1;
        border-left: 1.5px solid #e6e7ea;
    }
</style>
