<template>
    <div id="filter">
        <el-form :inline="true" :model="filters" class="search">
            <el-form-item label="类别">
                <el-select v-model="filters.type" placeholder="请选择" class="short">
                    <el-option
                        v-for="i in type"
                        :value="i">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="filters.value" style="width:250px;"
                          placeholder="请输入内容"
                          @keyup.enter.native="getList"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-on:click="getList">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-button class="add" @click="add=true">发布商品</el-button>
        <el-form :model="formData"
                 class="form"
                 v-show="add==true"
                 :rules="addFormRules"
                 ref="addForm"
                 label-width="80px">
            <el-form-item class="row" label="标题" prop="title">
                <el-input v-model="formData.title"  placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item class="row" label="类别" prop="type">
                <el-select v-model="formData.type" placeholder="请选择" class="short">
                    <el-option
                        v-for="i in type"
                        :value="i">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="row" label="图片">
                <upload-picture @getUrl="getUrl"></upload-picture>
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
    import uploadPicture from '../../../components/uploadPicture.vue';
    export default {
        extends: dateSearch,
        data () {
            return {
                formData: {
                    title: '',
                    content: '',
                    type: '',
                    image: '',
                },
                type:['衣服','鞋子','饰品','生活用品','彩妆','体育用品'],
            };
        },
        components: {
            uploadPicture
        },
        methods: {
            getList () {
                this.$emit('getList',1,this.filters);
            },
            getUrl(data){
                this.formData.image = data;
            },
            onSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        console.log(this.formData);
                        let params = Object.assign({
                            category: '二手市场'
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
