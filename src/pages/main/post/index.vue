<template>
	<div>
        <div id="main">
        	<div class="page">
        		<el-button>返回本版</el-button>
        		<el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
        	</div>
        	<div class="post-title">
        		【{{post.type}}】{{post.title}}
        	</div>
        	<div class="singlepost" v-for="(i,index) in post.reply">
            	<div class="post-left">
            		<div class="poster" v-if="i.user.name==post.reply[0].user.name">贴主</div>
            		<router-link to="/profile"><div class="avatar"></div></router-link>
            		<router-link to="/profile" style="text-decoration: none;">
            			<div class="username">{{i.user.name}}</div>
            		</router-link>
            		<div class="info">{{i.user.college}}  {{i.user.year}}级</div>
            		<div v-if="i.user.state=='在线'">
            			<i class="el-icon-bell"></i>
            			<div class="connect">联系TA</div>
            		</div>
            	</div>
            	<div class="post-right">
            		<div style="color:#bfbfbf">{{index}}楼</div>
            		<div class="post-content">{{i.content}}</div>
            		<div class="post-reply" v-if="i.reply.length" v-for="j in i.reply">
            			<a href>{{j.user}}</a>
            			<span v-if="j.replyuser">回复<a href>{{j.replyuser}}</a></span>
            			：{{j.content}}
            			<div>{{j.content}}
            				<span v-if="reply2!=i" @click="reply2=i">回复</span>
            				<div style="text-align: right" v-else>
                    			<el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入内容"
                                    v-model="textarea">
                                </el-input>
                                <el-button type="primary" class="submit">提交</el-button>
                    		</div>
            			</div>
            		</div>
            		<div class="post-option">
            			<div style="cursor:pointer" @click="reply=i">
            				<i class="el-icon-edit-outline"></i>
            				回帖
            			</div>
            			<div>发表于 {{i.time}}</div>
            		</div>
            		<div style="text-align: right" v-show="reply==i">
            			<el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="textarea">
                        </el-input>
                        <el-button type="primary" class="submit">提交</el-button>
            		</div>
            	</div>
            </div>
            <div class="page">
        		<el-button>返回本版</el-button>
        		<el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
        	</div>
        	<div class="main-reply">
        		<div style="text-align:left;margin:10px 0;">快速回复楼主：</div>
        		<el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请输入内容"
                    v-model="textarea">
                </el-input>
                <el-button type="primary" class="submit">提交</el-button>
        	</div>
        </div>
    </div>
</template>
<script>
import Header from '../../../components/header.vue';
import Footer from '../../../components/footer.vue';
export default {
  data() {
    return {
    	reply: 0,
    	reply2:0,
    	post:{
    		title:'对方的士大夫犯得上方法犯得上反对法发发地方犯得上大师傅犯得上',
    		type:'新鲜事',
    		reply:[
    		    {
    		    	user:{
            		    name:'十大科技士大夫艰苦',
            		    college:'软件学院',
            		    sex:'女',
            		    year:2014
        		    },
        		    time:'2018-07-23 08:33:23',
        		    content:'空间的身份科技发达省份的设计开发的是靠近发的时间开始的方法的刷卡记录的是付款记录的发的时刻记得是犯法的设计开发的时间考虑发的刷卡记录的算法框架',
        		    reply:[
        		    	{
        		    	user:'sdffsfsdsdf',
        		    	content:'dsfssdfsfds',
        		    	replyuser:'dfdddf',
        		    	},
        		    ]
    		    }
    		]
    	}
    }
  },
  components: {
  	Header,
  	Footer,
  }
}
</script>

<style>
	body{
		background: #f7f9fb;
		margin:0;
	}
	#main{
		margin: 40px auto;
		width: 80%;
		border-top: 3px solid #6ba484;
		background: #fff;
	}
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
		width: 550px;
		margin-bottom: 20px;
		position: relative;
	}
	.post-right{
		padding: 40px;
		border-left: 1.5px solid #e6e7ea;
	}
</style>
