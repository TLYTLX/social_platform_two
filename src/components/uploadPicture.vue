<template>
	<el-upload
        class="avatar-uploader"
        action="http://localhost:8081/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar-img">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
export default {
    data() {
        return {
            option: [],
            imageUrl: ''
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            var path = res.data.file.path.substring(14);
            var url = 'http://localhost:8081/static/avatar/'+path;
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$emit('getUrl',url);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;  
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    created() {
    },
    components: {
    }
}
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar-img {
        width: 120px;
        height: 120px;
    }
</style>