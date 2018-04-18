<script>

    import UserIndex from './user_index.vue';
    export default {
        extends: UserIndex,
        data () {
          return {
              pathName: "管理员管理"
          }
        },
        methods: {
            //加载用户数据
            getList () {
                this.$http.get(this.listUrl + '?page='+ this.page + '&username=' + this.filters.name,{
                    params: {
                        filter: 'admin'
                    }
                }).then(response => {
                    this.total = response.data.count;
                    this.tableData = response.data.users;
                }, response => {
                    console.log('error:' + response);
                })
            },

            // 新增用户弹窗
            addSubmit () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let para = Object.assign({
                                identity: 'admin'
                            }, this.addForm);
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
        }
    }

</script>

<style lang="stylus">
</style>
