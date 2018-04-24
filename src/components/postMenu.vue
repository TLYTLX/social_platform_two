<template>
    <div>
	    <div class="news">
	    	<router-link :to="{path:'/post', query: {id: post._id}}" class="news-title">{{post.title}}</router-link>
	    	<div style="display: flex">
   	    		<div class="news-content" style="-webkit-box-orient: vertical;">{{post.content}}</div>
   	    		<div class="news-like point" @click="addLike">
   	    			<img src="../static/like.png" style="width: 40px;display:block;margin: 10px auto;">
   	    		{{post.like}}</div>
                <div class="news-like">
                    <div style="margin: 20px auto;">阅读量</div>
                    {{post.views}}</div>
   	    		<div class="news-like">
   	    			<div style="margin: 20px auto;">回复</div>
   	    		{{post.comments.length}}</div>
   	    	</div>
	    </div>
    </div>
</template>

<script>
export default {
    props:['post'],
    data() {
        return {
        }
    },
    created() {
    },

    methods: {
        addLike () {
            this.$emit('likeClick', this.post._id);
        }
    }
}
</script>

<style>
	.news-title {
		display: block;
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
        height: 90px;
		text-indent:30px;
		line-height: 1.7rem;
		padding: 10px;
		text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
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
</style>
