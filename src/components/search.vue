<template>
	<div id="filter">
    	<div class="search">
            <Select :type="type"></Select>
            <div>
            	<el-input v-model="input" style="width:250px" placeholder="请输入内容"></el-input>
            	<el-button icon="el-icon-search">搜索</el-button>
            </div>
        </div>
        <el-button class="add" @click="add=true">{{button}}</el-button>
        <div v-show="add==true" class="form">
        	<el-row class="row">
        		<el-col :span="2">标题：</el-col>
    		    <el-col :span="22"><el-input v-model="title" placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row class="row" v-if="type=='sale'">
                <el-col :span="2">图片：</el-col>
                <el-col :span="22">
                    <upload-picture></upload-picture>
                </el-col>
            </el-row>
            <el-row class="row" v-if="type=='anonymous'">
                <el-col :span="2">代号：</el-col>
                <el-col :span="22"><el-input v-model="name" placeholder="请输入内容"></el-input></el-col>
            </el-row>
        	<el-row class="row">
        	    <Select :type="type"></Select>
            </el-row>
            <el-row class="row">
            	<el-col :span="2">描述：</el-col>
            	<el-col :span="22">
            		<el-input type="textarea" :rows="8"></el-input>
            	</el-col>
            </el-row>
            <el-row class="row" style="text-align: right">
            	<el-button type="primary" style="width: 120px">发布</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import Select from './select.vue';
import UploadPicture from './uploadPicture.vue';
export default {
  props: ['type'],
  data() {
    return {
    	news: [{
            value: '选项1',
            label: '黄金糕'
        }, {
            value: '选项2',
            label: '双皮奶'
        }, {
            value: '选项3',
            label: '蚵仔煎'
        }, {
            value: '选项4',
            label: '龙须面'
        }, {
            value: '选项5',
            label: '北京烤鸭'
        }],
        add:false,
        button:'发现新鲜事',
    }
  },
  components: {
    Select,
    UploadPicture
  },
  created(){
    if(this.type=='sale') this.button = '发布商品';
    if(this.type=='rent') this.button = '我要室友';
    if(this.type=='date') this.button = '我要约';
    if(this.type=='profess') this.button = '我要表白';
    if(this.type=='anonymous') this.button = '悄悄吐槽';
  }
}
</script>

<style>
#filter {
	padding: 20px 40px;
	border-bottom: 1px solid #aaa;
    background: #fff;
}
.search{
    display: flex;
    justify-content: space-between;
}
.add {
	color: #73BAB2;
	margin: 20px 0;
}
.row {
	margin: 20px 0;
}
.form {
	width: 60%;
	margin: 0 auto;
}
</style>