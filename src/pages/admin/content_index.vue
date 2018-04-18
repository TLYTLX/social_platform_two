<template>
    <section class="user_index">
        <breadcrumb path="文章管理"></breadcrumb>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-select v-model="filters.selected" :default-first-option=true>
                        <el-option label="按标题搜索" value="title"></el-option>
                        <el-option label="按分类搜索" value="category"></el-option>
                        <el-option label="按作者搜索" value="username"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="搜索" @keyup.enter.native="getList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  @selection-change="selsChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="80" label="序号">
            </el-table-column>
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="title" label="文章标题">
            </el-table-column>
            <el-table-column prop="category" label="所属分类">
            </el-table-column>
            <el-table-column prop="user.username" label="作者">
            </el-table-column>
            <el-table-column prop="addTime" label="发布时间">
            </el-table-column>
            <el-table-column prop="views" label="阅读量">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template scope="scope">
                    <el-button type="text" size="small" @click="handleStatus(scope.$index, scope.row)">{{getStatus(scope.row)}}</el-button>
                    <el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>


    import breadcrumb from '../../components/breadcrumb.vue';
    import UserIndex from './user_index.vue';

    export default {
        extends: UserIndex,
        mounted () {
        },
        data () {
            return {
                filters: {
                    selected: 'title',
                    name: ''
                },
                deleteUrl: 'http://localhost:8081/admin/content/delete?ids=',
                listUrl: 'http://localhost:8081/admin/content',
                modifyStatusUrl: 'http://localhost:8081/admin/content/modify/status'
            };
        },
        components: {
            breadcrumb
        },
        methods: {

            deleteContent (titles, ids) {
                this.$confirm(`确认删除帖子${titles}吗？`, '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$http.get(this.deleteUrl + ids).then(response => {
                        if (response.data.code !== 0) {
                            this.$message({
                                message: response.data.message,
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: response.data.message,
                                type: 'success'
                            });
                            this.getList();
                        }
                    }, response => {
                        console.log('error:' + response);
                    });
                });
            },

            //加载帖子列表
            getList () {
                this.$http.get(this.listUrl +
                    '?page='+ this.page +
                    '&type=' + this.filters.selected +
                    '&filter=' + this.filters.name).then(response => {
                    response.data.contents.forEach((content) => {
                        content.addTime = this.formatDate(content.addTime);
                    });
                    this.total = response.data.count;
                    this.tableData = response.data.contents;
                }, response => {
                    console.log('error:' + response);
                })
            },

            // 删除单个帖子
            handleDel (index, row) {
                this.deleteContent(row.title, row._id);
            },

            //批量删除帖子
            batchRemove () {
                var ids = this.sels.map(item => item._id).toString();
                var titles = this.sels.map(item => item.title).toString();
                this.deleteContent(titles, ids);
            }
        }
    }

</script>

<style lang="stylus">
</style>
