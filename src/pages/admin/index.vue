<template>
    <div class="admin_index">
        <el-menu router>
            <el-menu-item index="/admin">后台主页</el-menu-item>
            <el-menu-item index="/admin/user">用户管理</el-menu-item>
            <el-menu-item index="/admin/admin" v-if="identity === 'superAdmin'">管理员管理</el-menu-item>
            <el-submenu index="4">
              <template slot="title">文章管理</template>
              <el-menu-item index="/admin/content">文章首页</el-menu-item>
              <el-menu-item index="/admin/content/add">新建文章</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">{{ adminName }}</template>
              <el-menu-item index="/">退出</el-menu-item>
            </el-submenu>
        </el-menu>

        <router-view id="levelTwo"></router-view>
    </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
          adminName: '',
          identity: 'admin'
      }
    },
    created() {
        this.$http.get('http://localhost:8081/admin').then(response => {
            this.identity = response.data.userInfo.identity;
            if (response.data.code != 0) {
                window.location.href = "http://localhost:8080"
                return;
            } else {
                this.adminName = response.data.userInfo.username;
                return;
            };
        }, response => {
            console.log('error:' + response);
        })
    },
  }
</script>

<style lang="stylus">
.admin_index
  display:flex;
  .el-menu
    background-color:#2b2d31;
    width:200px;
  #levelTwo
    position: relative;
    display:flex;
    align-items:center;
    justify-contents:center;
    flex-direction:column;
    padding-top:50px;
    min-height:100vh;
    flex:1;
    padding-left:20px;
    padding-right: 20px;
</style>
