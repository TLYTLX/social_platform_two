<template>
    <div id="filter">
        <div class="search">
            <Select :type="type"></Select>
            <div>
                <el-input v-model="input"
                          style="width:250px"
                          placeholder="请输入内容"
                          @keyup.enter.native="getList"></el-input>
                <el-button icon="el-icon-search" @click="getList">搜索</el-button>
            </div>
        </div>
        <el-button class="add" @click="add=true">{{button}}</el-button>
        <el-form :model="formData"
                 class="form"
                 v-show="add==true"
                 :rules="addFormRules"
                 ref="addForm"
                 label-width="80px">
            <el-form-item class="row" label="标题" prop="title">
                <el-input v-model="formData.title"  placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item class="row" label="图片" v-if="type=='sale'">
                <upload-picture></upload-picture>
            </el-form-item>
            <el-form-item class="row" v-if="type=='anonymous'" label="代号" prop="name">
                <el-input v-model="formData.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item class="row">
                <Select :type="type"></Select>
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
    import Select from './select.vue';
    import UploadPicture from './uploadPicture.vue';
    export default {
        props: ['type'],
        data() {
            return {
                add:false,
                button:'发现新鲜事',
                input: '',
                formData: {
                    title: '',
                    name: '',
                    content: ''
                },
                addFormRules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {
            Select,
            UploadPicture
        },
        created(){
            if(this.type=='sale') this.button = '发布商品';
            if(this.type=='rent') this.button = '我要室友';
            if(this.type=='date') this.button = '我要约';
            if(this.type=='profess') this.button = '我要表白';
            if(this.type=='anonymous') this.button = '悄悄吐槽';
        },
        methods: {
            onSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        var categoryName = '新鲜事';
                        if(this.type=='sale') categoryName= '二手市场';
                        if(this.type=='rent') categoryName = '合租信息';
                        if(this.type=='date') categoryName = '相约华工';
                        if(this.type=='profess') categoryName = '表白墙';
                        if(this.type=='anonymous') categoryName = '匿名论坛';
                        this.$http.post('http://localhost:8081/content/add', {
                            category: categoryName,
                            title: this.formData.title,
                            content: this.formData.content,
                        }).then(response => {
                            if (response.data.code == 0) {
                                this.$message({
                                    message: response.data.message,
                                    type: 'success',
                                });
                                this.formData = {
                                    title: '',
                                    name: '',
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

            getList () {
                this.$emit('getList',this.input);
            }
        }
    }
</script>

<style>
    #filter {
        padding: 20px 10px;
        border-bottom: 1px solid #aaa;
        background: #fff;
    }
    .search{
        display: flex;
        justify-content: space-between;
    }
    .add {
        color: #73BAB2;
        margin: 20px 0;
    }
    .row {
        margin: 20px 0;
    }
    .form {
        width: 60%;
        margin: 0 auto;
    }
</style>
