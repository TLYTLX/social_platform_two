<template>
	<div style="width:100%">
        <div id="banner"><img src="../../../static/logo.png"></div>
    	<div class="block1" id="profess">
            <div class="block-title">你的表白上墙啦</div>
            <div class="block-sub">PROFESS</div>
            <div>
                <div class="line-abs"></div>
                <div class="line-abs"></div>
            </div>
            <div class="profess-image" v-for="i in profess" :style="'background:url('+getRandom(i.background)+') center center;background-size:cover;'">
                <div class="profess-title">
                    <div>{{i.title}}</div>
                    <p>{{i.content}}</p>
                </div>
                <div class="profess-time">{{i.addTime}}</div>
            </div>
    	</div>
    	<div id="news" class="block1">
    		<div class="block-title" style="color:#000">发现新鲜事</div>
            <div class="block-sub">HOT POINT</div>
            <div>
                <div class="line-abs"></div>
                <i class="el-icon-warning news-title"></i>
                <div class="line-abs"></div>
            </div>
    		<div class="news-block" v-for="i in news">
    			<div style="display:inline-block;width:88%">
    			    <div class="news-title">{{i.title}}</div>
    			    <div class="news-content" style="-webkit-box-orient: vertical;">{{i.content}}</div>
    		    </div>
                <div style="display:inline-block;text-align:center">
                    <img src="../../../static/like.png" style="width: 40px;display:block">
                    {{i.like}}
                </div>
    			<div class="news-time">{{i.addTime}}</div>
    		</div>
    	</div>
        <div class="para">
            <ul>
                <li v-for="i in nav">
	            	<div class="port-2 effect-2">
	                	<div class="image-box">
	                    	<img src="../../../static/img-2.jpg" alt="Image-2">
	                    </div>
	                    <div class="text-desc">
	                    	<h3>{{i.title}}</h3>
	                        <p>{{i.introduce}}</p>
                            <router-link :to="{path:i.path}" class="btn">
                                go on
                            </router-link>
	                    </div>
	                </div>
	            </li>
	        </ul>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        profess:[],
        news:[],
        nav:[
            {
                title:'匿名论坛',
                introduce:'匿名吐槽发泄不满总之大家都不知道你是谁呀w',
                path: '/profess'
            },{
                title:'二手市场',
                introduce:'在别人手里或许有你想要的东西',
                path: '/sale'
            },{
                title:'合租信息',
                introduce:'寻找可靠兴趣相投的室友',
                path: '/rent'
            },{
                title:'相约华工',
                introduce:'一起狼人杀密逃各种桌游或者只是看个电影',
                path: '/date'
            },
        ]
    }
  },
  methods:{
    getRandom(background){
        return require('../../../static/background/'+ background +'.jpg');
    },
    getLikeList (category,list) {
        this.$http.get('http://localhost:8081/content/like?category=' + category).then(response => {
            response.data.contents.forEach((content) => {
                content.addTime = this.formatDate(content.addTime);
                content.background = Math.floor(Math.random()*33+1);
            });
            this[list] = response.data.contents;
        }, response => {
            console.log('error:' + response);
        })
    },
  },
  created(){
    this.getLikeList('表白墙','profess');
    this.getLikeList('新鲜事','news');
  },
  mounted(){
    console.log(this.profess);
    console.log(this.news)
  }
}
</script>

<style>
.block-title{
    color: #e97971;
    margin-top: 20px;
    font-size: 22px;
}
.block-sub{
    padding: 5px;
    font-size: 15px;
}
.line-abs {
    margin: 0 20px;
    border-bottom: 1px solid #d8d8d8;
    display: inline-block;
    height: 1px;
    width: 100px;
}
.profess-image{
    margin:10px;
    width: 180px;
    height: 180px;
    display: inline-block;
    vertical-align: top;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}
.profess-image:nth-child(6n){
    width: 360px;
}
.profess-title{
    color: #fff;
    font-size: 20px;
    height: 131px;
    padding: 30px 10px;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    overflow: hidden;
}
.profess-time{
    color: #fff;
    text-align: right;
    padding-right:10px;
    padding-top: 25px;
}

.para img{max-width: 100%; vertical-align: middle;}
.full-length{width: 100%; float: left; padding-bottom: 80px;}
.para ul{margin: 0 -1.5%;}
.para li{float: left; width: 23%; margin: 10px 1%; list-style: none;}

.para h3{font-size: 20px; margin: 5px 0 10px;}
.para p{font-weight: 300; line-height: 20px; font-size: 14px; margin-bottom: 15px;}
.btn{display: inline-block; padding: 5px 10px; font-size: 14px; color: #fff; border: 2px solid #4d92d9; background-color: #4d92d9; text-decoration: none; transition: 0.4s;}
.btn:hover{background-color: transparent; color: #4d92d9; transition: 0.4s;}
.text-desc{position: absolute; left: 0; top: 0; background-color: #fff; height: 100%; opacity: 0; width: 100%; padding: 20px;}
/*= Reset CSS End
================= */
.port-2{float: left; width: 100%; position: relative; overflow: hidden; text-align: center; border: 4px solid rgba(255, 255, 255, 0.9); perspective: 800px;}
.port-2 .text-desc{z-index: -1; transition: 0.6s;}
.port-2 .image-box{transition: 0.4s;}
.port-2:hover .image-box{transform: rotateX(80deg); transform-origin: center bottom 0; transition: 0.4s;}

.port-2.effect-1:hover .text-desc{opacity: 1;}

.port-2.effect-2 .text-desc{opacity: 1; top: -100%;}
.port-2.effect-2:hover .text-desc{top: 0;}

.port-2.effect-3 .text-desc{opacity: 1; top: auto; bottom: -100%;}
.port-2.effect-3:hover .text-desc{bottom: 0;}

body{
	background: #f1f1f1;
	margin:0;
}
.para{
	display: flex;
	justify-content: center;
}
.block1{
	width: 100%;
	text-align: center;
	padding: 10px;
       position: relative;
}
.news-block{
	background: #fff;
	opacity: 0.8;
	margin: 10px auto;
	padding: 5px;
	width: 100%;
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
#profess{
	background: #f1f1f1;
    width:65%;
    display: inline-block;
    vertical-align: top;
}
#news{
    background: #f1f1f1;
    width: 34%;
    display: inline-block;
    vertical-align: top;
}
#banner{
    width: 100%;
    height: 200px;
    border-bottom: 1px solid #333;
    text-align: center;
    background: #f1f1f1 url('../../../static/wall.jpg') repeat center top;
}
#banner img{
    width: 100px;
    margin-top:50px;
}
</style>
