<template>
	<div>
		<Header title="合租信息"></Header>
        <Search type="rent"></Search>
        	<el-table
                :data="table" class="rent-table">
                <el-table-column
                    prop="title"
                    label="标题"
                    width="500">
                </el-table-column>
                <el-table-column
                    prop="announcer"
                    label="发布人"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="发布时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="lastDate"
                    label="最新回复"
                    width="200">
                </el-table-column>
            </el-table>
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
    	table:[
    	{
    		title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
    		announcer:'大多都是',
    		createDate:'2018-04-23',
    		lastDate:'2018-04-29'
    	},{
    		title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
    		announcer:'大多都是',
    		createDate:'2018-04-23',
    		lastDate:'2018-04-29'
    	},{
    		title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
    		announcer:'大多都是',
    		createDate:'2018-04-23',
    		lastDate:'2018-04-29'
    	},{
    		title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
    		announcer:'大多都是',
    		createDate:'2018-04-23',
    		lastDate:'2018-04-29'
    	},{
    		title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
    		announcer:'大多都是',
    		createDate:'2018-04-23',
    		lastDate:'2018-04-29'
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
	.rent-table{
		width:1100px;
		margin:10px auto;
		border-top: 3px solid #73BAB2;
	}
</style>
