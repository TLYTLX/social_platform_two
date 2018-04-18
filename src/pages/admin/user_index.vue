<template>
    <section class="user_index">
        <breadcrumb :path=pathName></breadcrumb>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名" @keyup.enter.native="getList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
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
            <el-table-column prop="_id"
                             label="ID"></el-table-column>
            <el-table-column prop="username"
                             label="用户名"></el-table-column>
            <el-table-column label="操作" width="250">
                <template scope="scope">
                    <el-button type="danger" size="small" @click="handleStatus(scope.$index, scope.row)">{{getStatus(scope.row)}}</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    <el-button type="danger" size="small" @click="handleModifyPwd(scope.$index, scope.row)">修改密码</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--修改密码界面-->
        <el-dialog title="修改密码" v-model="modifyFormVisible" :close-on-click-modal="false" width="30%">
            <el-form label-width="80px" :model="modifyForm" :rules="modifyFormRules" ref="modifyForm">
                <el-form-item label="修改密码" prop="password">
                    <el-input v-model="modifyForm.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="modifyFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="modifySubmit">提交</el-button>
            </div>
        </el-dialog>


        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" width="30%">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="addForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script type="es6">

    import breadcrumb from '../../components/breadcrumb.vue'
    export default {
        mounted () {
            this.getList();
        },
        data() {
            return {
                pathName: "用户管理",
                page: 1,
                tableData: [],
                listUrl: 'http://localhost:8081/admin/user',
                deleteUrl: 'http://localhost:8081/admin/user/delete?ids=',
                modifyStatusUrl: 'http://localhost:8081/admin/user/modify/status',
                modifyPwdUrl: 'http://localhost:8081/admin/user/modify/password',
                //查询名字
                filters: {
                    name: ''
                },
                sels: [],//列表选中列
                total: 0,
                modifyFormRules: {
                    password: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ]
                },
                //修改密码界面数据
                modifyForm: {
                    password: ''
                },
                modifyUserID: '',
                modifyFormVisible: false, //修改密码界面是否显示
                addFormVisible: false,//新增界面是否显示
                addFormRules: {
                    username: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },

                //新增界面数据
                addForm: {
                    username: '',
                    password: ''
                }
            }
        },
        created() {

        },
        methods: {

            deleteUser (users, ids) {
                this.$confirm(`确认删除用户${users}吗？`, '提示', {
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

            //加载用户数据
            getList () {
                this.$http.get(this.listUrl + '?page='+ this.page + '&username=' + this.filters.name,{
                    params: {
                        filter: 'user'
                    }
                }).then(response => {
                    this.total = response.data.count;
                    this.tableData = response.data.users;
                }, response => {
                    console.log('error:' + response);
                })
            },

            selsChange: function (sels) {
                this.sels = sels;
            },

            //批量删除用户
            batchRemove () {
                var ids = this.sels.map(item => item._id).toString();
                var users = this.sels.map(item => item.username).toString();
                this.deleteUser(users, ids);
            },

            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },

            getStatus (row) {
                if (row.isActive) {
                    return '冰冻';
                } else {
                    return '解冻';
                }
            },

            // 修改状态（冰冻/解冻）
            handleStatus (index, row) {
                let msg = row.isActive ? '冰冻' : '解冻';
                this.$confirm(`确认${msg}该用户吗?`, '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.modifyStatusUrl,{
                        id: row._id,
                        isActive: !row.isActive
                    }).then(response => {
                        if (response.data.code !== 0) {
                            this.$message({
                                message: msg + '失败',
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: msg + '成功',
                                type: 'success'
                            });
                            this.getList();
                        }
                    }, response => {
                        console.log('error:' + response);
                    })
                });
            },

            // 删除单个用户
            handleDel (index, row) {
                this.deleteUser(row.username, row._id);
            },

            // 修改密码
            handleModifyPwd (index, row) {
                this.modifyUserID = row._id;
                this.modifyFormVisible = true;
            },

            //修改密码弹窗
            modifySubmit: function () {
                this.$refs.modifyForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认修改吗？', '提示', {}).then(() => {
                            let para = Object.assign({
                                id: this.modifyUserID
                            }, this.modifyForm);
                            this.$http.post(this.modifyPwdUrl,para).then(response => {
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
                                    this.$refs['modifyForm'].resetFields();
                                    this.modifyFormVisible = false;
                                    this.getList();
                                }
                            }, response => {
                                console.log('error:' + response);
                            });
                        });
                    }
                });
            },

            //新增用户
            handleAdd () {
                this.addFormVisible = true;
            },

            // 新增用户弹窗
            addSubmit () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let para = Object.assign({}, this.addForm);
                            this.$http.post('http://localhost:8081/api/user/register', para).then(response => {
                                if (response.data.code !== 0) {
                                    this.$message({
                                        message: response.data.message,
                                        type: 'error'
                                    });
                                } else {
                                    this.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.getList();
                                }
                            }, response => {
                                console.log('error:' + response);
                            });
                        });
                    }
                });
            }
         },
        components: {
            breadcrumb
        }
    }
</script>

<style lang="stylus">
</style>
