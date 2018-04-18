<template>
	<div>
		<Header title="新鲜事"></Header>
        <Search type="news"></Search>
        <div id="main">
        	<div class="mainleft">
        		<div class="news" v-for="i in 20">
        			<router-link to="/post" class="news-title">附件是第三方接口来得深刻理解反对犯得上大师傅大师傅即使对方开具收费的</router-link>
        			<div style="display: flex">
            			<div class="news-content" style="-webkit-box-orient: vertical;">附件是第三方接口来得深刻理解反对犯得上大师傅大师傅即使对方开具收费的附件是第三方接口来得深刻理解反对犯得上大师傅大师傅即使对方开具收费的附件是第三fdsdsffjklskjsdjsjdksadfjkdsfkjfdskjdsfkjdskjds方接口来得深刻理解反对犯得上大师傅大师傅即使对方开具收费的</div>
            			<div class="news-like">
            				<img src="../../../static/like.png" style="width: 40px;display:block;margin: 10px auto;">
            			345</div>
            			<div class="news-like">
            				<div style="margin: 20px auto;">回复</div>
            			345</div>
            		</div>
        		</div>
        	</div>
        	<div class="mainright">
        		<div class="range-title">月度热赞榜</div>
        		<div class="range-one" v-for="i in 10">
        			<div class="range-text">{{i}}.反倒是艰苦大师傅但是看了士范德萨范德萨可适当放宽吉林省士大夫犯得上大夫急口令方式</div>
        			<div style="white-space:nowrap">2018-3-24</div>
        		</div>
        	</div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Search from '../../../components/search.vue';
import Header from '../../../components/header.vue';
import Footer from '../../../components/footer.vue';
export default {
  data() {
    return {
    }
  },
  components: {
  	Header,
  	Footer,
  	Search
  }
}
</script>

<style>
	body{
		background: #f7f9fb;
		margin:0;
	}
	#main{
		margin-top: 40px;
	}
	.mainleft{
		margin-left: 30px;
		width: 60%;
		display: inline-block;
	}
	.mainright{
		vertical-align: top;
		margin-left: 4%;
		display: inline-block;
		width: 32%;
		border: 1px solid #aaa;
		background: #fff;
	}
	.news-title {
		color: #73bab2;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-bottom: 10px;
		font-size: 17px;
	}
	.news-title:hover {
		cursor: pointer;
		font-size: 18px;
	}
	.news-content {
		border: 1px solid #bbb;
		background: #f5f5f5;
		width: 70%;
		text-indent:30px;
		line-height: 1.7rem;
		padding: 10px;
		-webkit-box-orient: vertical;
		text-align: left;
		display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin-bottom: 20px;
	}
	.news-like {
		border: 1px solid #bbb;
		background: #f5f5f5;
		width: 90px;
		height: 90px;
		margin-left: 30px;
		text-align: center;
	}
	.range-title {
		background: #73BAB2;
		color: #fff;
		text-align: center;
        line-height: 35px;
	}
	.range-one {
		line-height: 35px;
		padding: 5px 10px;
		display: flex;
	}
	.range-one:hover {
		cursor: pointer;
		color: #73bab2;
	}
	.range-text {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-right: 5px;
	}
</style>
