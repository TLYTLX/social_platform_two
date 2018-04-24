<template>
    <div class="index">

        <!--头部-->
        <div class="header">
            <div class="navbar">
                <div class="navbar-header">
                    <router-link to="/">
                        社区系统
                    </router-link>
                </div>
                <ul class="nav">
                    <li v-for="category in categories">
                        <router-link :to="{path:category.path}">
                            {{ category.name }}
                        </router-link>
                    </li>
                </ul>
                <div class="navbar-login" v-if="!showLogined">
                    <span class="oprate" @click="showLoginWin">登陆</span>
                    <span class="oprate" @click="showRegisterWin">注册</span>
                </div>
                <div class="navbar-login" v-else>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="identity !== 'user'">
                                <router-link to="/personal">个人中心</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="identity !== 'user'">
                                <router-link to="/admin">后台管理</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>

        <!--主页-->
        <div class="main">
            <router-view id="levelTwo" :user="user"></router-view>
        </div>

        <!--弹窗-->
        <el-dialog v-model="addFormVisible" :close-on-click-modal="false" class="pop-ups">
            <div class="panel" v-show="showRegister">
                <div class="panel-body">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="用户名" v-model="username">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="密码" v-model="password">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="确认密码" v-model="repassword">
                    </div>
                </div>
                <p class="rlBtn" @click="register">注册</p>
                <p>已有账号?去<span @click="showLoginWin" class="toggle">登录</span></p>
                <p class="text-danger">{{warningInfo}}</p>
            </div>
            <div class="panel" v-show="showLogin">
                <div class="panel-body">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="用户名" v-model="username">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="密码" v-model="password">
                    </div>
                </div>
                <p class="rlBtn" @click="login">登录</p>
                <p>没有账号?去<span @click="showRegisterWin" class="toggle">注册</span></p>
                <p class="text-danger">{{ warningInfo }}</p>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">

    export default {
        name: 'index',
        data() {
            return {
                showRegister: false,
                showLogin: false,
                showLogined: false,
                user: {},
                username: '',
                password: '',
                repassword: '',
                warningInfo: '',
                identity: 'user',
                categories: [{
                    path: '/sale',
                    name: '二手市场'
                }, {
                    path: '/anonymous',
                    name: '匿名论坛'
                }, {
                    path: '/news',
                    name: '新鲜事'
                }, {
                    path: '/profess',
                    name: '表白墙'
                }, {
                    path: '/rent',
                    name: '合租信息'
                }, {
                    path: '/date',
                    name: '相约华工'
                },],
                addFormVisible: false
            }
        },
        created() {
            this.$http.get('http://localhost:8081').then(response => {
                if (!response.data.code) { // 之前登陆过
                    this.showLogined = true;
                    this.username = response.data.userInfo.username;
                    this.identity= response.data.userInfo.identity;
                    this.user = response.data.userInfo;
                }
//                this.categories = response.data.categories
                // console.log(response);
            }, response => {
                console.log('error:' + response);
            })
        },
        methods: {
            showLoginWin () {
                this.addFormVisible = true;
                this.showRegister = false;
                this.showLogin = true;
            },

            showRegisterWin () {
                this.addFormVisible = true;
                this.showLogin = false;
                this.showRegister = true;
                this.username = '';
                this.password = '';
                this.repassword = '';
            },

            register() {
                // 简单验证
                if (this.username == '') {
                    this.warningInfo = '用户名不能为空';
                    return;
                }
                if (this.password == '') {
                    this.warningInfo = '密码不能为空';
                    return;
                }
                if (this.password != this.repassword) {
                    this.warningInfo = '两次输入的密码不一致';
                    return;
                }
                this.$http.post('http://localhost:8081/api/user/register', {
                    username: this.username,
                    password: this.password,
                    repassword: this.repassword
                }).then(response => {
                    if (response.data.code !== 0) {
                        this.warningInfo = response.data.message;
                        return;
                    } else {
                        this.showLoginWin();
                    };
                }, response => {
                    console.log('error:' + response);
                })
            },
            login() {
                if (this.username == '') {
                    this.warningInfo = '用户名不能为空';
                    return;
                }
                if (this.password == '') {
                    this.warningInfo = '密码不能为空';
                    return;
                }
                this.$http.post('http://localhost:8081/api/user/login', {
                    username: this.username,
                    password: this.password,
                }).then(response => {
                    if (response.data.code !== 0) {
                        this.warningInfo = response.data.message;
                        return;
                    } else {
                        this.identity = response.data.userInfo.identity;
                        this.showLogined = true;
                        this.username = response.data.userInfo.username;
                        this.user = response.data.userInfo;
                        this.addFormVisible = false;
                    };
                }, response => {
                    console.log('error:' + response);
                })
            },
            logout() {
                this.$http.get('http://localhost:8081/api/user/logout').then(response => {
                    this.showLogined = false;
                    this.user = {};
                }, response => {
                    console.log('error:' + response);
                })
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .text-danger{
        color:#ff4949;
    }
    .el-dialog--small {
        width: 30%;
    }
    .index
        .header
            box-sizing:border-box;
            padding:10px 100px;
            background-color:#fff;
            box-shadow:0 1px 2px rgba(151,151,151,0.58);
            .navbar
                height:40px;
                line-height:40px;
                .navbar-header
                    float:left;
                    .navbar-brand
                        font-size:20px;
                        color: #2c3e50;
                        font-weight:500;
                .nav
                    margin-left:200px;
                    display:inline-block;
                    &>li
                        display:inline-block;
                        line-height:40px;
                        margin-right:20px;
                        &>a
                            padding:10px;
                            color: #34495e;
                        &>a:hover
                            border-bottom: 3px solid #42b983;
                .navbar-login
                    float: right;
                    .oprate
                        margin-left: 20px;
                        color: #34495e;
                        cursor: pointer;

        .main
            display:flex;
            padding:20px;
            #levelTwo
                position: relative;
                min-height:88vh;
                width: 100%;
        .pop-ups
                .panel
                    width:300px;
                    font-size:14px;
                    margin-left:25px;
                    .panel-body
                        border: 1px solid #d5d5d5;
                        border-bottom: none;
                        border-radius: 3px;
                        margin-bottom:10px;
                        .form-group
                            height:50px;
                            line-height:50px;
                            background-color:#fff;
                            border-bottom: 1px solid #d5d5d5;
                            overflow: hidden;
                            .form-control
                                width: 100%;
                                box-sizing: border-box;
                                padding:10px;
                                &:focus
                                    outline: none;
                    .rlBtn
                        height:40px;
                        line-height:40px;
                        text-align:center;
                        background: #42b983;
                        border-radius: 3px;
                        font-size:20px;
                        color: #fff;
                        margin-bottom:10px;
                        cursor:pointer;
                    .toggle
                        color:#0f88eb;
                        cursor:pointer;
                .info
                    width:300px;
                    font-size:14px;
                    margin-left:50px;
                    line-height:20px;
                    padding:20px;
                    background-color:#fff;
                    border: 1px solid #d5d5d5;
                    #logout
                        cursor:pointer;
</style>
