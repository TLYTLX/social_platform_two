<template>
    <section>
        <el-table
            :border="false"
            :data="table" class="rent-table">
            <el-table-column type="index" width="80" label="序号">
            </el-table-column>
            <el-table-column
                label="标题"
                width="500">
                <template slot-scope="scope">
                    <router-link :to="{path:'/post', query: {id: scope.row._id}}">
                        {{ scope.row.title }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column
                prop="user.username"
                label="发布人">
            </el-table-column>
            <el-table-column
                prop="addTime"
                label="发布时间">
            </el-table-column>
            <el-table-column
                prop="views"
                label="阅读量">
            </el-table-column>
            <el-table-column
                prop="like"
                label="点赞数">
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next"
                           @current-change="handleCurrentChange"
                           :page-size="10"
                           :total="total"
                           style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    export default {
        props:['table'],
        data() {
            return {
                total: 0,
                page: 1
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
//                this.getList();
            }
        },
        created() {
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
