<template>
	<el-form :rules="rules" label-width="150px" :model="form" class="form">
        <el-form-item label="原密码：">
            <el-input type="password" v-model="form.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
            <el-input type="password" v-model="form.newPass"></el-input>
        </el-form-item>
        <el-form-item label="重新输入：">
            <el-input type="password" v-model="form.again"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
            <el-button type="primary" @click="" style="width: 120px">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入原密码'));
        } else {
        }
    };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入新密码'));
        } else {
        }
    };
    var validateCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入新密码'));
        } else if (value !== this.form.newPass) {
            callback(new Error('两次输入密码不一致!'));
        } else {
        }
    };
    return {
        form: {
            oldPass: '',
            newPass: '',
            again: ''
        },
        rules: {
            oldPass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            newPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            again: [
                { validator: validateCheck, trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
    },
    created() {
    },
    components: {
    }
}
</script>

<style>
</style>