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
    		<ul class="ca-menu">
		        <li v-for="i in profess">
                    <a href="#">
                    	<i class="el-icon-star-on ca-icon" id="heart"></i>
                        <div class="ca-content">
                            <div class="ca-main">{{i.title}}</div>
                            <div class="ca-sub">{{i.time}}</div>
                        </div>
                    </a>
                </li>
            </ul>
    	</div>
    	<div id="news" class="block1">
    		<div class="block-title" style="color:#000">发现新鲜事</div>
            <div class="block-sub">HOT POINT</div>
            <div>
                <div class="line-abs"></div>
                <i class="el-icon-warning news-title"></i>
                <div class="line-abs"></div>
            </div>
    		<div style="width:60%;margin:0 auto">
        		<div class="news-block" v-for="i in news">
        			<div style="display:inline-block;width:90%">
        			    <div class="news-title">{{i.title}}</div>
        			    <div class="news-content" style="-webkit-box-orient: vertical;">{{i.content}}</div>
        		    </div>
                    <div style="display:inline-block;text-align:center">
                        <img src="../../../static/like.png" style="width: 40px;display:block">
                        {{i.like}}
                    </div>
        			<div class="news-time">{{i.time}}</div>
        		</div>
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
	                    	<a href="#" class="btn">go on</a>
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
        profess:[
            {
                title:'窗外的暴雨淋不湿屋内的你，我是暴雨，你还是你。',
                time:'2018-03-14'
            },{
                title:'窗外的暴雨淋不湿屋内的你，我是暴雨，你还是你。',
                time:'2018-03-14'
            },{
                title:'窗外的暴雨淋不湿屋内的你，我是暴雨，你还是你。',
                time:'2018-03-14'
            },{
                title:'窗外的暴雨淋不湿屋内的你，我是暴雨，你还是你。',
                time:'2018-03-14'
            },{
                title:'窗外的暴雨淋不湿屋内的你，我是暴雨，你还是你。',
                time:'2018-03-14'
            },
        ],
        news:[
            {
                title:'就点击发送发送的技术的附近发生大幅度升级',
                time:'2018-03-23',
                like:324,
                content:'手动阀手动阀手动阀手动阀升级更快更高就反    倒是实施打击非法收集数据接口了决定是否健康绿色的士大夫急口令东方斯卡拉看来犯得上士大夫艰苦副书记考虑'
            },{
                title:'就点击发送发送的技术的附近发生大幅度升级',
                time:'2018-03-23',
                like:324,
                content:'手动阀手动阀手动阀手动阀升级更快更高就反    倒是实施打击非法收集数据接口了决定是否健康绿色的士大夫急口令东方斯卡拉看来犯得上士大夫艰苦副书记考虑'
            },{
                title:'就点击发送发送的技术的附近发生大幅度升级',
                time:'2018-03-23',
                like:324,
                content:'手动阀手动阀手动阀手动阀升级更快更高就反    倒是实施打击非法收集数据接口了决定是否健康绿色的士大夫急口令东方斯卡拉看来犯得上士大夫艰苦副书记考虑'
            },{
                title:'就点击发送发送的技术的附近发生大幅度升级',
                time:'2018-03-23',
                like:324,
                content:'手动阀手动阀手动阀手动阀升级更快更高就反    倒是实施打击非法收集数据接口了决定是否健康绿色的士大夫急口令东方斯卡拉看来犯得上士大夫艰苦副书记考虑'
            },
        ],
        nav:[
            {
                title:'匿名论坛',
                introduce:'匿名吐槽发泄不满总之大家都不知道你是谁呀w'
            },{
                title:'二手市场',
                introduce:'在别人手里或许有你想要的东西'
            },{
                title:'合租信息',
                introduce:'寻找可靠兴趣相投的室友'
            },{
                title:'相约华工',
                introduce:'一起狼人杀密逃各种桌游或者只是看个电影'
            },
        ]
    }
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
.ca-menu{
    padding:0;
    margin:20px auto;
    width: 1100px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    list-style: none;
    align-items: center;
}
.ca-menu li{
    width: 200px;
    height: 240px;
    position: relative;
    margin: 5px;
    background: #fdf1ed;
    -webkit-box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    -moz-box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    margin-right: 4px;
    -webkit-transition: all 300ms linear;
    -moz-transition: all 300ms linear;
    -o-transition: all 300ms linear;
    -ms-transition: all 300ms linear;
    transition: all 300ms linear;
}
.ca-menu li a{
    text-align: left;
    width: 100%;
    height: 100%;
    display: block;
    color: #333;
    position: relative;
}
.ca-icon{
    font-size: 60px;
    color: #333;
    text-shadow: 0px 0px 1px #333;
    line-height: 150px;
    position: absolute;
    width: 100%;
    height: 50%;
    left: 0px;
    top: 0px;
    text-align: center;
    -webkit-transition: all 400ms linear;
    -moz-transition: all 400ms linear;
    -o-transition: all 400ms linear;
    -ms-transition: all 400ms linear;
    transition: all 400ms linear;
}
.ca-icon#heart{
    color: #fda9a9;
    text-shadow: 0px 0px 1px #f7002f;
}
.ca-content{
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 20px;
    top: 20px;
}
.ca-main{
    font-size: 20px;
    opacity: 0.8;
    text-align: center;
    -webkit-transition: all 200ms linear;
    -moz-transition: all 200ms linear;
    -o-transition: all 200ms linear;
    -ms-transition: all 200ms linear;
    transition: all 200ms linear;
}
.ca-sub{
    text-align:right;
    font-size: 14px;
    color: #666;
    position: absolute;
    bottom: 0px;
    line-height: 40px;
    width: 100%;
    left: 0px;
    opacity: 0.8;
    -webkit-transition: all 200ms linear;
    -moz-transition: all 200ms linear;
    -o-transition: all 200ms linear;
    -ms-transition: all 200ms linear;
    transition: all 200ms linear;
}
.ca-menu li:hover{
    background-color: #fff;
    z-index:999;
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
}
.ca-menu li:hover .ca-icon{
    color: #606266;
    font-size: 90px;
    opacity:0.3;
}
.ca-menu li:hover .ca-icon#heart{
    -webkit-animation: smallToBig 900ms alternate infinite ease;
    -moz-animation: smallToBig 900ms alternate infinite ease;
    -ms-animation: smallToBig 900ms alternate infinite ease;
}
.ca-menu li:hover .ca-main{
    color: #606266;
    -webkit-animation: smallToBig 300ms ease;
    -moz-animation: smallToBig 300ms ease;
    -ms-animation: smallToBig 300ms ease;
}
.ca-menu li:hover .ca-sub{
    color: #606266;
    -webkit-animation: moveFromBottom 500ms ease;
    -moz-animation: moveFromBottom 500ms ease;
    -ms-animation: moveFromBottom 500ms ease;
}
@-webkit-keyframes smallToBig{
    from {
        -webkit-transform: scale(0.1);
    }
    to {
        -webkit-transform: scale(1);
    }
}
@-moz-keyframes smallToBig{
    from {
        -moz-transform: scale(0.1);
    }
    to {
        -moz-transform: scale(1);
    }
}
@-ms-keyframes smallToBig{
    from {
        -ms-transform: scale(0.1);
    }
    to {
        -ms-transform: scale(1);
    }
}

@-webkit-keyframes moveFromBottom {
    from {
        -webkit-transform: translateY(100%);
    }
    to {
        -webkit-transform: translateY(0%);
    }
}
@-moz-keyframes moveFromBottom {
    from {
        -moz-transform: translateY(100%);
    }
    to {
        -moz-transform: translateY(0%);
    }
}
@-ms-keyframes moveFromBottom {
    from {
        -ms-transform: translateY(100%);
    }
    to {
        -ms-transform: translateY(0%);
    }
}
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
#profess{
	background: #f1f1f1;
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
#news{
	background: #f1f1f1;
}
</style>
