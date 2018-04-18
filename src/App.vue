<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="es6">
    export default {
        name: 'app',
        data() {
            return {

            };
        }
    }
</script>

<style lang="stylus">
    #app
	    background-color:white;
    .toolbar
        background: #f2f2f2;
        padding: 10px;
        //border:1px solid #dfe6ec;
        .el-form-item
            margin-bottom: 10px;
</style>
