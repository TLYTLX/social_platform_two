<template>
	<div>
    	<div class="personal-main">
        	<div class="menu">
                <img class="avatar" :src="info.avatar">
                <div class="username">{{info.username}}</div>
                <div :class="[menu==1? 'menu-item active':'from-left menu-item']" @click="menu=1;title='我的资料'">个人资料</div>
                <div :class="[menu==2? 'menu-item active':'from-left menu-item']" @click="menu=2;title='我的帖子'">我的帖子</div>
                <div :class="[menu==3? 'menu-item active':'from-left menu-item']" @click="menu=3;title='我的消息'">我的消息</div>
            </div>
        	<div class="content">
        		<div class="content-title">{{title}}</div>
        		<Info v-if="menu==1" :info="info"></Info>
        		<my-post v-if="menu==2"></my-post>
        		<my-message v-if="menu==3" :message="message"></my-message>
        	</div>
        </div>
    </div>
</template>
<script>
import Info from './information/index.vue';
import MyPost from './post/index.vue';
import MyMessage from './message/index.vue';
export default {
  data() {
    return {
    	menu: 1,
    	title: '我的资料',
    	info:{},
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
    }
  },
    components: {
    	Info,
    	MyPost,
    	MyMessage
    },
    created(){
        this.getInfo();
    },
    methods: {
        getInfo () {
            let obj = JSON.parse(document.cookie.substring(9));
            let username = obj.username;
            this.$http.get('http://localhost:8081/my/info?id=' + username).then(response => {
                this.info = response.data.userInfo;
            }, response => {
                console.log('error:' + response);
            })
        },
    }
}
</script>

<style>
	.personal-main {
		display: flex;
        justify-content: center;
		margin-top: 20px;
	}
	.menu{
		width: 280px;
		background: #73BAB2;
		height: 600px;
        text-align: center;
	}
    /* ~~~~~~~ INIT. BTN ~~~~~~~ */

    .menu-item {   
        line-height: 50px;
        margin: 10px 30px;
        text-align: center;
        position: relative; 
        font-size: 16px;
        color: #fff;
        text-transform: uppercase;
        -webkit-transition: all 600ms cubic-bezier(0.77, 0, 0.175, 1);
        transition: all 600ms cubic-bezier(0.77, 0, 0.175, 1);  
        -webkit-user-select: none;  
           -moz-user-select: none;  
            -ms-user-select: none;  
                user-select: none;
    }    

    .btn:before, .btn:after {
        content: '';
        position: absolute; 
        -webkit-transition: inherit;    
        transition: inherit;
        z-index: -1;
    }    

    .btn:hover {
        color: #000;
        -webkit-transition-delay: .6s;
                transition-delay: .6s;
    }    

    .btn:hover:before {
        -webkit-transition-delay: 0s;
                transition-delay: 0s;
    }    

    .btn:hover:after {
        background: #fff;
        -webkit-transition-delay: .4s;
                transition-delay: .4s;
    }
    /* From Left */

    .from-left:before, 
    .from-left:after {
        top: 0;
        width: 0;
        height: 100%;
    }    

    .from-left:before {
        right: 0;
        border: 1px solid #fff;
        border-left: 0;
        border-right: 0;    
    }    

    .from-left:after {
        left: 0;
    }    

    .from-left:hover:before,
    .from-left:hover:after {
        width: 100%;
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
		min-height: 600px;
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
