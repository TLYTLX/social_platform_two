<template>
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
</template>

<script>
export default {
    props:['table'],
    data() {
        return {
        }
    },
    created() {
    }
}
</script>

<style>
    .rent-table{
        width:1100px;
        margin:10px auto;
        border-top: 3px solid #73BAB2;
    }
</style>