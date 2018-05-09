<template>
	<el-form label-width="120px" :model="form" class="form">
        <el-form-item label="头像：">
            <upload-picture @getUrl="getUrl"></upload-picture>
        </el-form-item>
        <el-form-item label="性别：">
            <el-radio-group v-model="form.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="年级：">
            <el-select v-model="form.year" placeholder="请选择">
                <el-option
                    v-for="i in option"
                    :key="i"
                    :label="i"
                    :value="i">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学院：">
            <el-input v-model="form.college"></el-input>
        </el-form-item>
        <el-form-item label="个人简介：">
            <el-input type="textarea" :row="8" v-model="form.introduce"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
            <el-button type="primary" @click="handleSubmit" style="width: 120px">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import UploadPicture from '../../../../components/uploadPicture.vue';
export default {
    props:['info'],
    data() {
        return {
            form: {
                avatar: '',
                year: '',
                sex: '',
                college: '',
                introduce: '',
            },
            option: [],
            imageUrl: ''
          };
    },
    methods: {
        getUrl(data){
            this.form.avatar = data;
        },
        handleSubmit() {
            this.$http.post('http://localhost:8081/my/modify/info',{
                id: this.info._id,
                avatar: this.form.avatar,
                year: this.form.year,
                introduce: this.form.introduce,
                college: this.form.college,
                sex: this.form.sex,
            }).then(response => {
                if (response.data.code !== 0) {
                    this.$message({
                        message: '编辑个人信息失败',
                        type: 'error'
                    });
                } else {
                    this.$message({
                        message: '编辑个人信息成功',
                        type: 'success'
                    });
                    location.reload();
                }
            }, response => {
                console.log('error:' + response);
            })
        }
    },
    created() {
        let d = new Date();
        let y = d.getFullYear();
        for(let i=1990;i<y+5;i++){
            this.option.push(i);
        }
        this.form.year = this.info.year;
        this.form.college = this.info.college;
        this.form.sex = this.info.sex;
        this.form.introduce = this.info.introduce;
    },
    components: {
        UploadPicture
    }
}
</script>

<style>
	.form {
		line-height: 40px;
		width: 500px;
		margin: 10px auto;
		vertical-align: middle;
	}
	.form-label{
		text-align: right;
		color: #606266;
	}
</style>
