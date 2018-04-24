<template>
	<div>
        <div id="main">
        	<div class="avatar"></div>
        	<div class="info">
        		<div class="username">{{user.name}}[{{user.state}}]</div>
        		<div>{{user.introduce}}</div>
        	</div>
       		<div class="connect">
       			<i class="el-icon-bell"></i>
       		    联系TA
       		</div>
        	<div class="main-info">
        		<div class="info-title">基本信息</div>
        		<div class="info-block">
        			<div><span>昵称：</span>{{user.name}}</div>
        			<div><span>性别：</span>{{user.sex}}</div>
        			<div><span>学院：</span>{{user.college}}</div>
        			<div><span>年级：</span>{{user.year}}</div>
        		</div>
        		<div class="info-title">活跃概况</div>
        		<div class="info-block">
        			<div><span>发帖数：</span>{{user.count}}</div>
        			<div><span>上次在线时间：</span>{{user.lasttime}}</div>
        		</div>
        	</div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    	title:'',
    	user:{
    		name:'大家看法的数据库',
    		state:'在线',
    		introduce:'kjfdsj个人简介kldssjkjlsjkfskjldsfsfdkj',
    		sex:'女',
    		year:2015,
    		college:'软件学院',
    		count:456,
    		lasttime:'2018-07-23 08:34:23'
    	}
    }
  },
  created(){
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
	.avatar {
		display: inline-block;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		margin: 20px 50px;
		background: #aaa;
		vertical-align: middle;
	}
	.info{
		display: inline-block;
		vertical-align: middle;
	}
	.username{
		font-size: 20px;
		color: #73BAB2;
		line-height: 40px;
	}
	.main-info{
		border-top: 1px solid #e6e7ea;
		padding: 30px 50px;
	}
	.info-title{
		font-size: 20px;
		font-weight: 500;
		color: #C0C4CC;
	}
	.info-block{
		padding-bottom: 20px;
		margin: 20px 0;
		border-bottom: 1px solid #e6e7ea;
	}
	.info-block div{
		display: inline-block;
		width: 49%;
		line-height: 30px;
	}
	.info-block span {
		color: #606266;
	}
	.el-icon-bell {
		font-size: 20px;
	}
	.connect {
		float: right;
		margin-top: 40px;
		margin-right:30px;
		cursor: pointer;
		display: inline-block;
		background: #73BAB2;
		color: #fff;
		border-radius: 5px;
		padding: 3px 10px;
	}
</style>
