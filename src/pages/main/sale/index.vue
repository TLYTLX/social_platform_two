<template>
	<div style="width:100%">
        <Search  @getList="getList"></Search>
        <div id="main">
        	<router-link :to="{path:'/post', query: {id: i._id}}" v-for="i in data" class="sale-block">
        		<img class="sale-img" :src="i.image">
        		<div class="sale-title">【{{i.type}}】{{i.title}}</div>
        		<div>{{i.addTime}}</div>
        	</router-link>
        </div>
        <el-pagination layout="prev, pager, next"
                       v-if="total>30"
                       @current-change="handleCurrentChange"
                       :page-size="30"
                       :total="total">
        </el-pagination>
    </div>
</template>
<script>
import Search from './search.vue';
export default {
    data() {
        return {
        	data:[],
            listUrl: 'http://localhost:8081/content',
            likeListUrl: 'http://localhost:8081/content/like',
            page: 1,
            total: 0,
        }
    },
    created () {
        this.getList();
    },
    methods:{
        getList (page=1,filters={type:'',value: ''}) {
            this.$http.get(this.listUrl + '?page='+ this.page +
                '&category=' + '二手市场' + '&type=' + filters.type
                    + '&value=' + filters.value
            ).then(response => {
                response.data.contents.forEach((content) => {
                    content.addTime = this.formatDate(content.addTime);
                });
                this.total = response.data.count;
                this.data = response.data.contents;
                console.log(this.data);
            }, response => {
                console.log('error:' + response);
            })
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getList();
        },
    },
    components: {
    	Search
    }
}
</script>

<style>
	body{
		background: #f7f9fb;
		margin:0;
	}
	/*#main{*/
		/*margin: 40px 60px;*/
	/*}*/
	.sale-block{
        vertical-align: top;
		display: inline-block;
		width: 180px;
		height: 280px;
		background: #fff;
		border: 1px solid #aaa;
		margin: 20px;
		color: #606266;
		text-decoration: none;
		text-align: right;
		padding: 10px;
	}
	.sale-img{
		width: 160px;
		height: 160px;
		background: #aaa;
	}
	.sale-title{
		margin: 10px;
        line-height: 1.2rem;
		text-align: left;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
	}
</style>
