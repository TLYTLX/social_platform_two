<template>
    <div id="filter">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-input v-model="filters.value" style="width:250px;"
                          placeholder="请输入内容"
                          @keyup.enter.native="getList"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="getList">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-button class="add" @click="add=true">我要表白</el-button>
        <el-form :model="formData"
                 class="form"
                 v-show="add==true"
                 :rules="addFormRules"
                 ref="addForm"
                 label-width="80px">
            <el-form-item class="row" label="标题" prop="title">
                <el-input v-model="formData.title"  placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item class="row" label="描述" prop="content">
                <el-input v-model="formData.content"
                          type="textarea"
                          :autosize="{ minRows: 10}"
                          placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item class="row" style="text-align: right">
                <el-button type="primary" @click="onSubmit">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import dateSearch from '../date/search.vue';
    export default {
        extends: dateSearch,
        data () {
            return {
                formData: {
                    title: '',
                    content: ''
                },
            };
        },
        components: {},
        methods: {
            getList () {
                this.$emit('getList',this.filters.value);
            },

            onSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        let params = Object.assign({
                            category: '表白墙'
                        }, this.formData);
                        this.$http.post('http://localhost:8081/content/add', params).then(response => {
                            if (response.data.code == 0) {
                                this.$message({
                                    message: response.data.message,
                                    type: 'success',
                                });
                                this.formData = {
                                    title: '',
                                    content: ''
                                };
                                this.$emit('getList');
                            } else {
                                this.$message({
                                    message: response.data.message,
                                    type: 'error'
                                });
                            }
                        })
                    }
                });
            },
        }
    }

</script>

<style lang="stylus">
</style>
