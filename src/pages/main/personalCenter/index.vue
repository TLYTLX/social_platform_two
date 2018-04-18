<template>
	<div>
    	<div class="main">
        	<div class="menu">
                <div class="avatar"></div>
                <div class="username">{{user.name}}</div>
                <div :class="[menu==1? 'menu-item active':'menu-item']" @click="menu=1;title='我的资料'">个人资料</div>
                <div :class="[menu==2? 'menu-item active':'menu-item']" @click="menu=2;title='我的帖子'">我的帖子</div>
                <div :class="[menu==3? 'menu-item active':'menu-item']" @click="menu=3;title='我的消息'">我的消息</div>
            </div>
        	<div class="content">
        		<div class="content-title">{{title}}</div>
        		<Info v-if="menu==1" :info="info"></Info>
        		<my-post v-if="menu==2" :post="post"></my-post>
        		<my-message v-if="menu==3" :message="message"></my-message>
        	</div>
        </div>
    </div>
</template>
<script>
import Header from '../../../components/header.vue';
import Footer from '../../../components/footer.vue';
import Info from './information/index.vue';
import MyPost from './post/index.vue';
import MyMessage from './message/index.vue';
export default {
  data() {
    return {
    	menu: 1,
    	title: '我的资料',
    	info:{
    		name:'的建设的封建士大夫阶级',
    		avatar:'',
    		sex:'女',
    		year:1980,
    		introduce:'健康的看见对方的空间是发到空间里的实时监控可适当放宽觉得十分士大夫艰苦奋斗刷卡机'
    	},
    	message:[
    	    {
    	    	username:'dsfdsds',
    	    	type:'新鲜事',
    	    	title:'是的方法对付的是顺丰到付到付的',
    	    	content:'发的数据库的分量接口发的收款付款链接发甲方的时刻监督司法会计发射点士大夫艰苦空间发的是艰苦大师傅大师傅艰苦8',
    	    },{
    	    	username:'dsfdsds',
    	    	type:'新鲜事',
    	    	title:'是的方法对付的是顺丰到付到付的',
    	    	content:'发的数据库的分量接口发的收款付款链接发甲方的时刻监督司法会计发射点士大夫艰苦空间发的是艰苦大师傅大师傅艰苦8',
    	    },{
    	    	username:'dsfdsds',
    	    	type:'新鲜事',
    	    	title:'是的方法对付的是顺丰到付到付的',
    	    	content:'发的数据库的分量接口发的收款付款链接发甲方的时刻监督司法会计发射点士大夫艰苦空间发的是艰苦大师傅大师傅艰苦8',
    	    },{
    	    	username:'dsfdsds',
    	    	type:'新鲜事',
    	    	title:'是的方法对付的是顺丰到付到付的',
    	    	content:'发的数据库的分量接口发的收款付款链接发甲方的时刻监督司法会计发射点士大夫艰苦空间发的是艰苦大师傅大师傅艰苦8',
    	    },
    	],
    	post:[
            {
                title: '单价多少积分多少积分多少发多少交付时间',
                type_model: '二手交易',
                date: '2018-03-04 08:03:34',
                state: '冻结'
            },{
                title: '单价多少积分多少积分多少发多少交付时间',
                type_model: '二手交易',
                date: '2018-03-04 08:03:34',
                state: '冻结'
            },{
                title: '单价多少积分多少积分多少发多少交付时间',
                type_model: '二手交易',
                date: '2018-03-04 08:03:34',
                state: '冻结'
            },{
                title: '单价多少积分多少积分多少发多少交付时间',
                type_model: '二手交易',
                date: '2018-03-04 08:03:34',
                state: '冻结'
            },
        ]
    }
  },
  components: {
  	Header,
  	Footer,
  	Info,
  	MyPost,
  	MyMessage
  }
}
</script>

<style>
	body{
		background: #f7f9fb;
		margin:0;
	}
	.main {
		display: flex;
		width: 90%;
		margin: 10px auto;
	}
	.menu{
		width: 280px;
		background: #73BAB2;
		height: calc(100vh - 115px);
	}
	.menu-item {
		line-height: 50px;
		margin: 10px 30px;
		text-align: center;
		color: #fff;
	}
	.active{
		font-size: 18px;
		font-weight: bold;
		border-bottom: 1px solid #fff;
	}
	.menu-item:hover{
		border-bottom: 1px solid #fff;
		font-size: 18px;
	}
	.content{
		margin-left: 30px;
		width: 70%;
		min-height: calc(100vh - 115px);
		background: #fff;
	}
	.content-title{
		padding-left: 20px;
		line-height: 50px;
		border-top: 3px solid #606266;
		border-bottom: 1.5px solid #e6e7ea;
	}
	.form {
		line-height: 40px;
		width: 500px;
		margin: 50px auto;
		vertical-align: middle;
	}
	.form-label{
		text-align: right;
		color: #606266;
	}
	.avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		margin: 30px auto;
		background: #aaa;
	}
	.username{
		line-height: 30px;
		font-size: 20px;
		text-align: center;
		color: #fff;
	}
</style>
