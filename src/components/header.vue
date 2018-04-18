<template>
	<div id="header">
		<a href="" v-if="title" class="jump">返回主页</a>
		<div class="jump">{{title}}</div>
		<div v-if="title">
		    <router-link to="/personal" href="" class="jump">个人中心</router-link>
		    <a href="" class="jump">退出</a>
		</div>
		<div v-else>
		    <a href="" class="jump">登陆</a>
		    <a href="" class="jump">注册</a>
		</div>
    </div>
</template>
<script>
export default {
    props:['title'],
    data() {
        return {
        }
    },
    created() {
    }
}
</script>

<style>
	#header{
		display: flex;
		justify-content: space-between;
		line-height: 45px;
		width: 100%;
		background: #73bab2;
	}
	.jump {
		display: inline-block;
		padding: 0 20px;
		text-decoration: none;
		color: #fff!important;
	}
</style>
