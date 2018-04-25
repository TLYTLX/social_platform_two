<template>
	<el-form ref="form" :rules="rules" label-width="150px" :model="form" class="form">
        <el-form-item label="原密码：" prop="oldPass">
            <el-input type="password" v-model="form.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPass">
            <el-input type="password" v-model="form.newPass"></el-input>
        </el-form-item>
        <el-form-item label="重新输入：" prop="again">
            <el-input type="password" v-model="form.again"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
            <el-button type="primary" @click="handleChange('form')" style="width: 120px">保存</el-button>
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
            callback();
        }
    };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入新密码'));
        } else if (value === this.form.oldPass) {
            callback(new Error('新密码不能与旧密码一致'));
        } else {
            callback();
        }
    };
    var validateCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入新密码'));
        } else if (value !== this.form.newPass) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
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
        handleChange(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = JSON.parse(document.cookie.substring(9));
                    let id = obj._id;
                    this.$http.post('http://localhost:8081/my/modify/password',{
                        id: id,
                        pass: this.form.oldPass,
                        newPass: this.form.newPass
                    }).then(response => {
                        if (response.data.code == 0) {
                            this.$message({
                                message: '修改密码成功',
                                type: 'success'
                            });
                            location.reload();
                        } else if (response.data.code == 2) {
                            this.$message({
                                message: '原密码错误',
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                message: '修改密码失败',
                                type: 'error'
                            });
                        }
                    }, response => {
                        console.log('error:' + response);
                    })
                } else {
                  console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    created() {
    },
    components: {
    }
}
</script>

<style>
</style>