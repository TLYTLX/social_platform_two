<template>
	<div style="width:100%">
        <Search type="sale"></Search>
        <div id="main">
        	<router-link to="/post" v-for="i in data" class="sale-block">
        		<div class="sale-img"></div>
        		<div class="sale-title">【{{i.type}}】{{i.title}}</div>
        		<div>{{i.time}}</div>
        	</router-link>
        </div>
    </div>
</template>
<script>
import Search from '../../../components/search.vue';
import Header from '../../../components/header.vue';
import Footer from '../../../components/footer.vue';
export default {
  data() {
    return {
    	data:[
    	    {
    	    	title:'大师傅犯得上大师傅发射点发射点方法对付的',
    	    	time: '2018-07-03',
    	    	type: '衣服'
    	    },{
    	    	title:'大师傅犯得上大师傅发射点发射点方法对付的',
    	    	time: '2018-07-03',
    	    	type: '衣服'
    	    },{
    	    	title:'大师傅犯得上大师傅发射点发射点方法对付的',
    	    	time: '2018-07-03',
    	    	type: '衣服'
    	    },{
    	    	title:'大师傅犯得上大师傅发射点发射点方法对付的',
    	    	time: '2018-07-03',
    	    	type: '衣服'
    	    },
    	]
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
		margin: 40px 60px;
	}
	.sale-block{
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
		margin: 10px auto;
		width: 160px;
		height: 160px;
		background: #aaa;
	}
	.sale-title{
		margin: 10px;
		text-align: left;
	}
</style>
