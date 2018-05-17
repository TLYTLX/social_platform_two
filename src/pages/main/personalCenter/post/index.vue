<template>
    <div style="text-align:center">
        <el-table :data="post" class="mypost">
            <el-table-column
                prop="title"
                label="标题"
                width="250">
            </el-table-column>
            <el-table-column
                prop="category"
                label="所属模块"
                width="120">
            </el-table-column>
            <el-table-column
                prop="addTime"
                label="发布时间"
                width="195">
            </el-table-column>
            <el-table-column
                prop="views"
                label="浏览量"
                width="80">
            </el-table-column>
            <el-table-column
                prop="like"
                label="点赞数"
                width="80">
            </el-table-column>
            <el-table-column
                prop="isActive"
                label="状态"
                width="80">
            </el-table-column>
            <el-table-column
                prop="option"
                label="操作"
                width="150">
                <template scope="scope">
                    <router-link :to="{path:'/post', query: {id: scope.row._id}}" class="show-btn">查看</router-link>
                    <el-button type="text" @click="handleStatus(scope.row)">{{getStatus(scope.row)}}</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="my-page">
            <el-pagination
                @current-change="handleCurrentChange" 
                :page-size="10" 
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props:['user'],
    data() {
        return {
            post: [],
            total: 0,
            deleteUrl: 'http://localhost:8081/my/contents/delete?id=',
            getListUrl: 'http://localhost:8081/my/contents?id=',
            editStatusUrl: 'http://localhost:8081/my/contents/modify/status'
        }
    },
    components: {
    },
    mounted() {
        this.getPost(1);
    },
    methods:{
        handleCurrentChange(page) {
            this.getPost(page);
        },
        getPost (page) {
            this.$http.get(this.getListUrl + this.user._id + '&page=' + page).then(response => {
                //console.log(response);
                response.data.contents.forEach((content) => {
                    content.addTime = this.formatDate(content.addTime);
                    if(content.isActive === true) content.isActive = '激活';
                    else content.isActive = '冻结';
                });
                this.post = response.data.contents;
                this.total = response.data.count;
            }, response => {
                console.log('error:' + response);
            })
        },
        getStatus (row) {
            if (row.isActive=='激活') {
                return '冻结';
            } else {
                return '解冻';
            }
        },
        handleDelete (row) {
            this.$confirm(`确认删除帖子${row.title}吗？`, '提示', {
                type: 'warning'
            }).then(() => {
                this.$http.get(this.deleteUrl + row._id).then(response => {
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
                        this.getPost(1);
                    }
                }, response => {
                    console.log('error:' + response);
                });
            });
        },
        handleStatus (row) {
            let status;
            if (row.isActive=='激活') status = '冻结';
            else status = '激活';
            this.$confirm(`确认${status}`+`帖子${row.title}吗？`, '提示', {
                type: 'warning'
            }).then(() => {
                this.$http.post(this.editStatusUrl,{
                    id: row._id,
                    isActive: status == '冻结' ? false : true
                }).then(response => {
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
                        this.getPost(1);
                    }
                }, response => {
                    console.log('error:' + response);
                });
            });
        },
    }
}
</script>

<style>
    .mypost{
        margin:20px auto;
        width: 957px;
    }
    .my-page{
        text-align: right;
        margin-top: 20px;
    }
    .show-btn{
        color: #20a0ff;
        margin-right:10px;
    }
    .el-table th>.cell {
        text-align: center;
    }
</style>