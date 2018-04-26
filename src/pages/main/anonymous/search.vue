<template>
    <div id="filter">
        <el-form :inline="true" :model="filters" class="search">
            <el-form-item>
                <el-input v-model="filters.value" style="width:250px;"
                          placeholder="请输入内容"
                          @keyup.enter.native="getList"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="getList">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-button class="add" @click="add=true">悄悄吐槽</el-button>
        <el-form :model="formData"
                 class="form"
                 v-show="add==true"
                 :rules="addFormRules"
                 ref="addForm"
                 label-width="80px">
            <el-form-item class="row" label="标题" prop="title">
                <el-input v-model="formData.title"  placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item class="row" label="代号" prop="alias">
                <el-input v-model="formData.alias" placeholder="请输入内容"></el-input>
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

    import ProfessSearch from '../profess/search.vue';
    export default {
        extends: ProfessSearch,

        data () {
            return {
                addFormRules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                    alias: [
                        { required: true, message: '请输入代号', trigger: 'blur' }
                    ]
                },
                formData: {
                    title: '',
                    alias: '',
                    content: ''
                },
            };
        },
        methods: {
            onSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        let params = Object.assign({
                            category: '匿名论坛'
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
