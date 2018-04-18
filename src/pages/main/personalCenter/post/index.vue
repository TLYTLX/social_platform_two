<template>
	<el-table
        :data="table">
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
    data() {
        return {
            table:[
            {
                title: '单价多少积分多少积分多少发多少交付时间',
                type_model: '二手交易',
                date: '2018-03-04 08:03:34',
                state: '冻结'
            },{
                title: '单价多少积分多少积分多少发多少交付时间',
                type_model: '二手交易',
                date: '2018-03-04 08:03:34',
                state: '冻结'
            },{
                title: '单价多少积分多少积分多少发多少交付时间',
                type_model: '二手交易',
                date: '2018-03-04 08:03:34',
                state: '冻结'
            },{
                title: '单价多少积分多少积分多少发多少交付时间',
                type_model: '二手交易',
                date: '2018-03-04 08:03:34',
                state: '冻结'
            },
            ]
        }
    },
    components: {
    }
}
</script>

<style>
</style>