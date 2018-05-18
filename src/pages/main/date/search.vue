<template>
    <div id="filter">

        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-select v-model="filters.type" :default-first-option=true class="short">
                    <el-option label="按标题搜索" value="title"></el-option>
                    <el-option label="按地点搜索" value="area"></el-option>
                    <el-option label="按类别搜索" value="type"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="filters.value" style="width:250px" placeholder="请输入内容" @keyup.enter.native="getList"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="getList">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-button class="add" @click="add=true">我要约</el-button>
        <el-form :model="formData"
                 class="form"
                 v-show="add==true"
                 :rules="addFormRules"
                 ref="addForm"
                 label-width="80px">
            <el-form-item class="row" label="标题" prop="title">
                <el-input v-model="formData.title"  placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item class="row">
                地点：
                <el-input v-model="formData.area"
                          placeholder="请输入地点"
                          class="short"></el-input>
                类别：
                <el-select v-model="formData.type" placeholder="请选择类别" class="short">
                    <el-option label="桌游" value="桌游"></el-option>
                    <el-option label="密室逃脱" value="密室逃脱"></el-option>
                    <el-option label="约饭" value="约饭"></el-option>
                    <el-option label="学习" value="学习"></el-option>
                    <el-option label="拼单" value="拼单"></el-option>
                </el-select>
                时间：
                <el-date-picker
                    v-model="formData.meetTime"
                    type="datetime"
                    placeholder="请选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                </el-date-picker>
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

    export default {
        mounted () {
        },
        data () {
            return {
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                add: false,
                filters: {
                    type: '',
                    value: '',
                    money:'',
                    sex:'',
                    area:''
                },
                formData: {
                    title: '',
                    area: '',
                    type: '',
                    meetTime: (new Date()).getTime(),
                    content: ''
                },
                addFormRules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择类型', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请选择地区', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                    money: [
                        { required: true, message: '请选择价位', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ]
                }
            };
        },
        components: {},
        methods: {
            getList () {
                this.$emit('getList',1,this.filters);
            },

            onSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        let params = Object.assign({
                            category: '相约华工'
                        }, this.formData);
                        this.$http.post('http://localhost:8081/content/add', params).then(response => {
                            if (response.data.code == 0) {
                                this.$message({
                                    message: response.data.message,
                                    type: 'success',
                                });
                                this.formData = {
                                    title: '',
                                    area: '',
                                    type: '',
                                    meetTime: (new Date()).getTime(),
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
    /*搜索一栏的样式*/
    #filter
        padding: 20px 10px;
        border-bottom: 1px solid #aaa;
        background: #fff;
        .add
            color: #73BAB2;
            margin: 20px 0;
        .form
            width: 60%;
            margin: 0 auto;
            .row
                margin: 20px 0;
            .column
                margin-left:14px;
                margin-bottom:0;
                display:inline-block;
    .short
        width: 120px!important;
</style>
