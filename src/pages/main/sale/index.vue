<template>
	<div>
		<Header title="二手交易"></Header>
        <Search type="sale"></Search>
        <div id="main">
        	<router-link to="/post" v-for="i in 5" class="sale-block">
        		<div class="sale-img"></div>
        		<div class="sale-title">【衣服】第三方科技时代士大夫艰苦奋斗设计开发的是对方是否数</div>
        		<div>2018-03-13</div>
        	</router-link>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Search from '../../../components/search.vue';
import Header from '../../../components/header.vue';
import Footer from '../../../components/footer.vue';
export default {
  data() {
    return {
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
