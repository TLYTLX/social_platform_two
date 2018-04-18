<template>
	<div>
		<Header></Header>
        <div id="banner">
        	<router-link to="/sale" class="banner-font"><img src="../static/sale.png"></router-link>
        	<div class="banner-font"><img src="../static/anonymous.png"></div>
        	<router-link to="/news" class="banner-font">
        		<img src="../static/news.png">
        	</router-link>
        	<div class="banner-font"><img src="../static/profess.png"></div>
        	<div class="banner-font"><img src="../static/rent.png"></div>
        	<div class="banner-font"><img src="../static/date.png"></div>
        </div>
        <div class="para">
        	<div id="profess" class="block1">
        		<div><img src="../static/news-title.png" class="title"></div>
        		<div class="profess-block" v-for="i in 12">
        			<div class="profess-content" style="-webkit-box-orient: vertical;">窗外的暴雨淋不湿屋内的你，我是暴雨，你还是你。</div>
        			<div class="news-time">2018-02-05</div>
        		</div>
        	</div>
        	<div id="news" class="block1">
        		<img src="../static/profess-title.png" class="title">
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
<script>
import Header from './header.vue';
import Footer from './footer.vue';
export default {
  data() {
    return {
    }
  },
  components: {
    Header,
    Footer
  },
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
		background: center center url('../static/banner2.jpg') no-repeat;
		background-size: cover;
		display: flex;
	}
	.banner-font{
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
