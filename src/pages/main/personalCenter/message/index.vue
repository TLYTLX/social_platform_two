<template>
    <div>
        <div class="message" v-for="i in message">
            <div class="msg-avatar"></div>
            <div class="msg-content">
                <div class="msg-title">
                    <a href>{{i.username}}</a>
                    回复
                    <a href>【{{i.type}}】{{i.title}}</a>
                </div>
                {{i/content}}
            </div>
        </div>
        <div class="pagination">
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props:['message'],
    data() {
        return {
        }
    },
    components: {
    }
}
</script>

<style>
    .message{
        height: 150px;
        border-bottom: 1px solid #DCDFE6;
        color: #606266;
    }
    .msg-avatar{
        height: 120px;
        width: 120px;
        margin:10px;
        border-radius: 50%;
        background: #aaa;
        display: inline-block;
        vertical-align: middle;
    }
    .msg-content{
        display: inline-block;
        width: calc(100% - 150px);
        vertical-align: middle;
    }
    .msg-title{
        font-size: 18px;
    }
    .pagination{
        text-align: center;
        margin: 30px 0;
    }
</style>