<template>
	<div>
		<div v-if="type=='rent'">
			地区：
		    <el-select v-model="search[0]" placeholder="请选择" class="short">
                <el-option
                    v-for="i in news"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
            </el-select>
            性别：
		    <el-select v-model="search[1]" placeholder="请选择" class="short">
                <el-option>男</el-option>
                <el-option>女</el-option>
            </el-select>
            价位：
		    <el-select v-model="search[2]" placeholder="请选择" class="short">
                <el-option
                    v-for="i in news"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
            </el-select>
            学院：
		    <el-select v-model="search[3]" placeholder="请选择" class="short">
                <el-option
                    v-for="i in news"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
            </el-select>
		</div>
		<div v-if="type=='sale'">
			类别：
		    <el-select v-model="search" placeholder="请选择">
                <el-option
                    v-for="i in news"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
            </el-select>
		</div>
		<div v-if="type=='news'">
			类别：
		    <el-select v-model="search" placeholder="请选择">
                <el-option
                    v-for="i in news"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
            </el-select>
		</div>
		<div v-if="type=='date'">
			地点：
		    <el-select v-model="search[0]" placeholder="请选择" class="short">
                <el-option
                    v-for="i in news"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
            </el-select>
            类别：
		    <el-select v-model="search[1]" placeholder="请选择" class="short">
                <el-option>男</el-option>
                <el-option>女</el-option>
            </el-select>
            时间：
		    <el-select v-model="search[2]" placeholder="请选择" class="short">
                <el-option
                    v-for="i in news"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
            </el-select>
		</div>
	</div>
</template>

<script>
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
        search: [],
        add:false
    }
  },
  components: {
  },
  created() {
  	console.log(this.type);
  }
}
</script>

<style>
	.short{
		width: 120px!important;
	}
</style>