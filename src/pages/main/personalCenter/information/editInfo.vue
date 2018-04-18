<template>
	<el-form label-width="120px" :model="form" class="form">
        <el-form-item label="头像：">
            <upload-picture></upload-picture>
        </el-form-item>
        <el-form-item label="性别：">
            <el-radio-group v-model="form.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
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
            <el-button type="primary" @click="" style="width: 120px">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import UploadPicture from '../../../../components/uploadPicture.vue';
export default {
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
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    created() {
        let d = new Date();
        let y = d.getFullYear();
        for(let i=1990;i<y+5;i++){
            this.option.push(i);
        }
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
