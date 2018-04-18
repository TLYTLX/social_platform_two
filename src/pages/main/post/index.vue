<template>
	<div>
		<Header title="帖子详情"></Header>
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
        		【新鲜事】就开始考虑士大夫看见就发士大夫艰苦奋斗
        	</div>
        	<div class="singlepost" v-for="i in 5">
            	<div class="post-left">
            		<div class="poster">贴主</div>
            		<router-link to="/profile"><div class="avatar"></div></router-link>
            		<router-link to="/profile" style="text-decoration: none;">
            			<div class="username">甲方的都是</div>
            		</router-link>
            		<div class="info">电信学院  15级</div>
            		<div>
            			<i class="el-icon-bell"></i>
            			<div class="connect">联系TA</div>
            		</div>
            	</div>
            	<div class="post-right">
            		<div style="color:#bfbfbf">{{i}}楼</div>
            		<div class="post-content">fdsdffds范德萨发大水范德萨加快了第三方接口发送的科技大厦士大夫但是看见的是房间里的身份的数据库发士大夫金龙卡撒旦反抗进来说说大家看见发生的事件的时间考虑的是副科级领导说说</div>
            		<div class="post-reply">
            			<a href>对方是否</a>：建设的封建士大夫艰苦附近开房快捷方式的
            			<div>2018-01-09
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
            		<div class="post-reply">
            			<a href>djdsfk</a>
            			回复
            			<a href>对方是否</a>：收到反馈收到付款记录是第三方接口发送的
            			<div>2018-01-09<span>回复</span></div>
            		</div>
            		<div class="post-option">
            			<div style="cursor:pointer" @click="reply=i">
            				<i class="el-icon-edit-outline"></i>
            				回帖
            			</div>
            			<div>发表于 2018-03-28 08:33:22</div>
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
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '../../../components/header.vue';
import Footer from '../../../components/footer.vue';
export default {
  data() {
    return {
    	reply: 0,
    	reply2:0
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
