<template>
    <div class="index">
        <Header></Header>
        <div id="banner">
            <ul class="nav">
                <li v-for="category in categories" class="banner-font">
                    <router-link :to="{path:category.path}">
                        <img :src=category.img>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="para">
            <div id="profess" class="block1">
                <div><img src="../../static/news-title.png" class="title"></div>
                <div class="profess-block" v-for="i in 12">
                    <div class="profess-content" style="-webkit-box-orient: vertical;">窗外的暴雨淋不湿屋内的你，我是暴雨，你还是你。</div>
                    <div class="news-time">2018-02-05</div>
                </div>
            </div>
            <div id="news" class="block1">
                <img src="../../static/profess-title.png" class="title">
                <div class="news-block" v-for="i in 4">
                    <div>
                        <div class="news-title">是十分士大夫似的dfsfss</div>
                        <div class="news-content" style="-webkit-box-orient: vertical;">手动阀手动阀手动阀手动阀升级更快更高就反    倒是实施打击非法收集数据接口了决定是否健康绿色的士大夫急口令东方斯卡拉看来犯得上士大夫艰苦副书记考虑</div>
                    </div>
                    <div class="news-time">2018-03-31</div>
                </div>
            </div>
        </div>
        <div class="para">
            <div class="block2" style="background: #e6eaea"></div>
            <div class="block2" style="background: #e6e7ea"></div>
            <div class="block2" style="background: #e9e6ea"></div>
            <div class="block2" style="background: #eae6e7"></div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script type="es6">

    import Header from '../../components/header.vue';
    import Footer from '../../components/footer.vue';

    import saleImg from '../../static/sale.png';
    import anonymousImg from '../../static/anonymous.png';
    import newsImg from '../../static/news.png';
    import professImg from '../../static/profess.png';
    import rentImg from '../../static/rent.png';
    import dateImg from '../../static/date.png';

    export default {
        name: 'index',
        data() {
            return {
                showRegister: false,
                showLogin: true,
                showLogined: false,
                user: {},
                username: '',
                password: '',
                repassword: '',
                warningInfo: '',
                identity: 'user',
                categories: [{
                    path: '/sale',
                    img: saleImg
                }, {
                    path: '/anonymous',
                    img: anonymousImg
                }, {
                    path: '/news',
                    img: newsImg
                }, {
                    path: '/profess',
                    img: professImg
                }, {
                    path: '/rent',
                    img: rentImg
                }, {
                    path: '/date',
                    img: dateImg
                },],
            }
        },
        components: {
            Header,
            Footer
        },
        created() {
            this.$http.get('http://localhost:8081').then(response => {
                if (!response.data.code) { // 之前登陆过
                    this.showLogin = !this.showLogin;
                    this.showLogined = !this.showLogined;
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
            toggleRL() {
                this.showRegister = !this.showRegister;
                this.showLogin = !this.showLogin;
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
                    if (response.data.code != 0) {
                        this.warningInfo = response.data.message;
                        return;
                    } else {
                        this.showLogin = !this.showLogin;
                        this.showRegister = !this.showRegister;
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
                    if (response.data.code != 0) {
                        this.warningInfo = response.data.message;
                        return;
                    } else {
                        this.showLogin = !this.showLogin;
                        this.identity = response.data.userInfo.identity;
                        this.showLogined = !this.showLogined;
                        this.username = response.data.userInfo.username;
                        this.user = response.data.userInfo;
                    }
                    ;
                }, response => {
                    console.log('error:' + response);
                })
            },
            logout() {
                this.$http.get('http://localhost:8081/api/user/logout').then(response => {
                    this.showLogin = !this.showLogin;
                    this.showLogined = !this.showLogined;
                    this.user = {};
                }, response => {
                    console.log(response);
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

    #banner{
        height: 400px;
        justify-content: center;
        width: 100%;
        align-items: flex-end;
        background: center center url('../../static/banner2.jpg') no-repeat;
        background-size: cover;
        display: flex;
    }
    .nav {
        width: 100%;
    }
    .banner-font{
        display: inline-block;
        width: 15%;
        height: 55px;
        justify-content: center;
        position: relative;
        color: #fff;
        font-size: 32px;
        text-align: center;
        cursor: pointer;
    }
    .banner-font:hover {
        height:60px;
    }
    .banner-font:hover::before {
        content: "/";
        left: 0px;
        position: absolute;
        font-weight: lighter;
    }
    .banner-font:hover::after {
        content: "/";
        right:  0px;
        position: absolute;
        font-weight: lighter;
    }
    .banner-font img{
        width: auto;
        height: 40px;
    }
    .para{
        display: flex;
        justify-content: center;
    }
    .block1{
        width: 40%;
        height: 500px;
        margin: 20px 4%;
        text-align: center;
        padding: 10px;
        box-shadow: 3px 3px 10px #a1a1a1;
        position: relative;
    }
    .title {
        height: 35px;
        width: auto;
    }
    .profess-block{
        background: #fff;
        opacity: 0.4;
        box-shadow: 0px 0px 6px #d1d1d1;
        width: 115px;
        height: 115px;
        padding: 5px;
        margin:5px;
        display: inline-block;
        color: #fda9a9;
        cursor: pointer;
    }
    .profess-content {
        -webkit-box-orient: vertical;
        text-align: left;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        overflow: hidden;
    }
    .profess-block:hover {
        position: absolute;
        opacity: 1;
        background: #fef6f3;
        box-shadow: 0px 0px 6px #a1a1a1;
        left: 25%;
        top: 25%;
        width: 50%;
        height: 50%;
    }
    .news-block{
        background: #fff;
        opacity: 0.8;
        margin: 10px auto;
        padding: 5px;
        width: 86%;
        color: #a4a4a4;
        text-align: left;
        box-shadow: 2px 2px 5px #d1d1d1;
        cursor: pointer;
    }
    .news-block:hover{
        height: 125px;
        line-height: 1.6rem;
    }
    .news-content {
        -webkit-box-orient: vertical;
        text-indent:30px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .news-block:hover .news-content {
        -webkit-line-clamp: 3;
    }
    .news-time{
        color: #a4a4a4;
        text-align: right;
    }
    .news-title{
        color: #6ba484;
        font-size: 18px;
    }
    .block2{
        width: 23%;
        margin:20px;
        height: 300px;
    }
    #profess{
        background: #fdf1ed;
    }
    #news{
        background: #d9eee7;
    }
</style>
