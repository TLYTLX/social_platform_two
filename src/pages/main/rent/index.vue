<template>
	<div style="width:100%">
        <Search @getList="getList"></Search>
        <grid :tableData="tableData" @getList="getList" :total="total"></grid>
    </div>
</template>
<script>
import Search from './search.vue';
import Grid from './grid.vue';
export default {
    data() {
        return {
        	tableData:[],
            listUrl: 'http://localhost:8081/content',
            total: 0
        }
    },
    mounted () {
        this.getList();
    },
    methods: {
        getList(page=1, filters={money:'',sex:'',area:'',value: ''}) {
            this.$http.get(this.listUrl + '?page='+ page +
                '&category=' + '合租' + '&area=' + filters.area
                + '&value=' + filters.value + '&money='+filters.money
                + '&sex=' + filters.sex
            ).then(response => {
                response.data.contents.forEach((content) => {
                    content.addTime = this.formatDate(content.addTime);
                });
                this.total = response.data.count;
                this.tableData = response.data.contents;
            }, response => {
                console.log('error:' + response);
            })
        }
    },
    components: {
    	Search,
        Grid
    }
}
</script>

<style>
</style>
