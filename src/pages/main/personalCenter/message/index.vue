<template>
	<div>
        <div class="message" v-for="i in 5">
            <div class="msg-avatar"></div>
            <div class="msg-content">
                <div class="msg-title">
                    <a href>酒店附近</a>
                    回复
                    <a href>【新鲜事】dfdfdsdsfsdd对方收到收到</a>
                </div>
                发的数据库的分量接口发的收款付款链接发甲方的时刻监督司法会计发射点士大夫艰苦空间发的是艰苦大师傅大师傅艰苦8
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