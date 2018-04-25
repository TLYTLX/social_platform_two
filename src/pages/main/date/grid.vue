<template>
    <section>
        <el-table
            :border="false"
            :data="tableData" class="rent-table">
            <el-table-column type="index" width="80" label="序号">
            </el-table-column>
            <el-table-column
                label="标题"
                width="250">
                <template slot-scope="scope">
                    <router-link :to="{path:'/post', query: {id: scope.row._id}}" class="router-link">
                        {{ scope.row.title }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column
                prop="user.username"
                label="发布人">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型">
            </el-table-column>
            <el-table-column
                prop="meetTime"
                label="时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="area"
                label="地点">
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
        mounted () {
        },
        props: ['tableData', 'total'],
        data () {
            return {
                page: 1
            };
        },
        components: {},
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.$emit('getList', this.page);
            }
        }
    }

</script>

<style lang="stylus">
</style>
