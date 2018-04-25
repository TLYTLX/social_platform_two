<template>
    <div style="width:100%">
        <search @getList="getList"></search>
        <grid :tableData="tableData" @getList="getList" :total="total"></grid>
    </div>
</template>
<script>
    import Search from './search.vue';
    import Grid from './grid.vue';
    export default {
        mounted () {
            this.getList();
        },

        data() {
            return {
                listUrl: 'http://localhost:8081/content',
                tableData:[],
                total: 0
            }
        },

        methods: {
            getList(page=1, filters={type:'',value: ''}) {
                this.$http.get(this.listUrl + '?page='+ page +
                    '&category=' + '相约华工' + '&type=' + filters.type
                    + '&value=' + filters.value
                ).then(response => {
                    response.data.contents.forEach((content) => {
                        content.meetTime = this.formatDate(content.meetTime);
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
    .rent-table{
        width:100%;
        margin:10px auto;
        border-top: 3px solid #73BAB2;
    }
    .el-table th{
        background: #fff;
    }
    .el-table th>.cell {
        background: #fff;
    }
</style>
