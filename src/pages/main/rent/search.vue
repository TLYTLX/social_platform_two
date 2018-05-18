<template>
    <div id="filter">
        <el-form :inline="true" :model="filters" class="search">
            <el-form-item label="地区：">
                <el-select v-model="filters.area" placeholder="请选择" class="short">
                    <el-option
                        v-for="i in area"
                        :value="i">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价位：">
                <el-select v-model="filters.money" placeholder="请选择" class="short">
                    <el-option
                        v-for="i in money"
                        :label="i">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别：">
                <el-radio-group v-model="filters.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
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
        <el-button class="add" @click="add=true">我要室友</el-button>
        <el-form :model="formData"
                 class="form"
                 v-show="add==true"
                 :rules="addFormRules"
                 ref="addForm"
                 label-width="80px">
            <el-form-item class="row" label="标题" prop="title">
                <el-input v-model="formData.title"  placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item class="column" label="地区：" prop="area">
                <el-select v-model="formData.area" placeholder="请选择" class="short">
                    <el-option
                        v-for="i in area"
                        :value="i">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="column" label="价位：" prop="money">
                <el-select v-model="formData.money" placeholder="请选择" class="short">
                    <el-option
                        v-for="i in money"
                        :value="i">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="column" label="性别：" prop="sex">
                <el-radio-group v-model="formData.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
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
                    content: '',
                    type: '',
                    sex: '',
                    money: '',
                    area: ''
                },
                money:['1000以下','1000-1500','1500-2000',
                       '2000-2500','2500-3000','3000-3500',
                       '3500-4000','4000以上'],
                area:['大学城南','大学城北','体育西路'],
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
                            category: '合租'
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
                                window.location.reload();
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
