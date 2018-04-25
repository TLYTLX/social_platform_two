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
    .point:hover
        cursor: pointer;
    body
        background: #f7f9fb;
        margin:0;
    .router-link
        display: block;
        color: #73bab2;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 10px;
        font-size: 17px;
    .router-link:hover
        cursor: pointer;
        font-size: 18px;
</style>
