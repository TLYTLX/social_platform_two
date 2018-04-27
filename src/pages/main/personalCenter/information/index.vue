<template>
    <div>
        <div class="info-form" v-if="edit==0">
            <el-row>
                <el-col :span="6" class="form-label" style="line-height: 140px">头像：</el-col>
                <el-col :span="16" :offset="2">
                    <img class="avatar" style="margin:0" :src="info.avatar">
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="form-label">性别：</el-col>
                <el-col :span="16" :offset="2">{{info.sex}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="form-label">年级：</el-col>
                <el-col :span="16" :offset="2">{{info.year}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="form-label">学院：</el-col>
                <el-col :span="16" :offset="2">{{info.college}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="form-label">个人简介：</el-col>
                <el-col :span="16" :offset="2">{{info.introduce}}</el-col>
            </el-row>
            <el-row style="text-align: center">
                <el-button style="margin: 20px" @click="edit=1">修改资料</el-button>
                <el-button style="margin: 20px" @click="edit=2">修改密码</el-button>
            </el-row>
        </div>
        <edit-info v-if="edit==1" :info="info"></edit-info>
        <change-pass v-if="edit==2" :id="info._id"></change-pass>
    </div>
</template>
<script>
import EditInfo from './editInfo.vue';
import ChangePass from './changePass.vue';
export default {
    props:['info'],
    data() {
        return {
            edit: 0,
        }
    },
    components: {
        EditInfo,
        ChangePass
    }
}
</script>

<style>
    .info-form {
        line-height: 40px;
        width: 500px;
        margin: 50px auto;
        vertical-align: middle;
        overflow-y: auto;
    }
    .form-label{
        text-align: right;
        color: #606266;
    }
</style>