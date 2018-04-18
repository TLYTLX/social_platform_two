<template>
	<div style="width:100%">
        <Search type="news"></Search>
        <div id="main">
        	<div class="mainleft">
        		<div v-for="i in data">
        			<post-menu :post="i"></post-menu>
        		</div>
        	</div>
        	<post-range :list="list"></post-range>
        </div>
    </div>
</template>
<script>
import Search from '../../../components/search.vue';
import Header from '../../../components/header.vue';
import Footer from '../../../components/footer.vue';
import PostMenu from '../../../components/postMenu.vue';
import PostRange from '../../../components/postRange.vue';
export default {
  data() {
    return {
    	data: [
    	    {
    	    	title: '犯得上士大夫士大夫犯得上犯得上发射点发',
    	    	like: 345,
    	    	reply: 342,
    	    	time: '2019-3-23',
    	    	content: 'ssd反对犯得上犯得上犯得上士大夫发的第三方法大师傅大师傅大师傅士大夫犯得上犯得上士大夫发大师傅大师傅但是副董事长的方式呈现出发射点发撒地方而我仍然为恶恶热热未亡人'
    	    },{
    	    	title: '犯得上士大夫士大夫犯得上犯得上发射点发',
    	    	like: 345,
    	    	reply: 342,
    	    	time: '2019-3-23',
    	    	content: 'ssd反对犯得上犯得上犯得上士大夫发的第三方法大师傅大师傅大师傅士大夫犯得上犯得上士大夫发大师傅大师傅但是副董事长的方式呈现出发射点发撒地方而我仍然为恶恶热热未亡人'
    	    },{
    	    	title: '犯得上士大夫士大夫犯得上犯得上发射点发',
    	    	like: 345,
    	    	reply: 342,
    	    	time: '2019-3-23',
    	    	content: 'ssd反对犯得上犯得上犯得上士大夫发的第三方法大师傅大师傅大师傅士大夫犯得上犯得上士大夫发大师傅大师傅但是副董事长的方式呈现出发射点发撒地方而我仍然为恶恶热热未亡人'
    	    },{
    	    	title: '犯得上士大夫士大夫犯得上犯得上发射点发',
    	    	like: 345,
    	    	reply: 342,
    	    	time: '2019-3-23',
    	    	content: 'ssd反对犯得上犯得上犯得上士大夫发的第三方法大师傅大师傅大师傅士大夫犯得上犯得上士大夫发大师傅大师傅但是副董事长的方式呈现出发射点发撒地方而我仍然为恶恶热热未亡人'
    	    },
    	],
    	list: [
    	    {
    	    	title: '犯得上士大夫士大夫犯得上犯得上发射点发',
    	    	like: 345,
    	    	reply: 342,
    	    	time: '2019-3-23',
    	    	content: 'ssd反对犯得上犯得上犯得上士大夫发的第三方法大师傅大师傅大师傅士大夫犯得上犯得上士大夫发大师傅大师傅但是副董事长的方式呈现出发射点发撒地方而我仍然为恶恶热热未亡人'
    	    },{
    	    	title: '犯得上士大夫士大夫犯得上犯得上发射点发',
    	    	like: 345,
    	    	reply: 342,
    	    	time: '2019-3-23',
    	    	content: 'ssd反对犯得上犯得上犯得上士大夫发的第三方法大师傅大师傅大师傅士大夫犯得上犯得上士大夫发大师傅大师傅但是副董事长的方式呈现出发射点发撒地方而我仍然为恶恶热热未亡人'
    	    },{
    	    	title: '犯得上士大夫士大夫犯得上犯得上发射点发',
    	    	like: 345,
    	    	reply: 342,
    	    	time: '2019-3-23',
    	    	content: 'ssd反对犯得上犯得上犯得上士大夫发的第三方法大师傅大师傅大师傅士大夫犯得上犯得上士大夫发大师傅大师傅但是副董事长的方式呈现出发射点发撒地方而我仍然为恶恶热热未亡人'
    	    },{
    	    	title: '犯得上士大夫士大夫犯得上犯得上发射点发',
    	    	like: 345,
    	    	reply: 342,
    	    	time: '2019-3-23',
    	    	content: 'ssd反对犯得上犯得上犯得上士大夫发的第三方法大师傅大师傅大师傅士大夫犯得上犯得上士大夫发大师傅大师傅但是副董事长的方式呈现出发射点发撒地方而我仍然为恶恶热热未亡人'
    	    },
    	]
    }
  },
  components: {
  	Header,
  	Footer,
  	Search,
  	PostMenu,
  	PostRange
  }
}
</script>

<style>
	body{
		background: #f7f9fb;
		margin:0;
	}
	#main{
		margin-top: 40px;
	}
	.mainleft{
		margin-left: 30px;
		width: 60%;
		display: inline-block;
	}
</style>
