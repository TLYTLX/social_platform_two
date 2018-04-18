<template>
    <el-table
        :data="post">
        <el-table-column
            prop="title"
            label="标题"
            width="250">
        </el-table-column>
        <el-table-column
            prop="type_model"
            label="所属模块"
            width="150">
        </el-table-column>
        <el-table-column
            prop="date"
            label="发布时间"
            width="195">
        </el-table-column>
        <el-table-column
            prop="state"
            label="状态"
            width="80">
        </el-table-column>
        <el-table-column
            prop="option"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    props:['post'],
    data() {
        return {
        }
    },
    components: {
    }
}
</script>

<style>
</style>