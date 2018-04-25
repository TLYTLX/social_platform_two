<template>
	<div class="mainright">
		<div class="range-title">月度热赞榜</div>
		<div class="range-one" v-for="(i,index) in list">
			<div class="range-text">
                <router-link :to="{path:'/post', query: {id: i._id}}" class="router-link">
                    {{index+1}}.{{i.title}}
                </router-link>
            </div>
			<div style="white-space:nowrap">{{i.addTime}}</div>
		</div>
	</div>
</template>

<script>
export default {
    props:['list'],
    data() {
        return {
        }
    },
    created() {
    }
}
</script>

<style>
	.mainright{
		vertical-align: top;
		margin-left: 4%;
		display: inline-block;
		width: 32%;
		border: 1px solid #aaa;
		background: #fff;
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
