<template>
    <div>
        <div class="message" v-for="i in message">
            <div class="msg-title">
                <a href>{{i.user}}</a>
                回复
                <span @click="goView(i)">【{{i.category}}】{{i.title}}</span>
                <span v-if="i.type>1">中你的回复:</span>
            </div>
            <div class="msg-content">{{i.content}}</div>
            <div class="msg-time">{{i.postTime}}</div>
        </div>
        <div class="pagination" v-if="total>5">
            <el-pagination
                @current-change="handleCurrentChange" 
                :page-size="5"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props:['user'],
    data() {
        return {
            message: [],
            list: [],
            total: 0,
        }
    },
    components: {
    },
    created(){
        this.getMessage(1);
    },
    methods:{
        handleCurrentChange(val){
            this.getMessage(val);
        },
        goView(i) {
            this.$http.post('http://localhost:8081/my/contents/modify/readTime',
                {id:i.id,time:new Date()}).then(response => {
                    console.log(response);
                    window.location.href = '/#/post?id=' + i.id;
                }, response => {
                console.log('error:' + response);
            })
        },
        getMessage(page){
            this.$http.get('http://localhost:8081/my/message?id=' + this.user._id + '&user=' + this.user.username + '&page='+page).then(response => {
                this.message = response.data.contents;
                this.message.forEach(i => {
                    i.postTime = this.formatDate(i.postTime);
                });
                this.total = response.data.count;
                console.log(response.data.contents);
            }, response => {
                console.log('error:' + response);
            })
        }
    }
}
</script>

<style>
    .message{
        border-bottom: 1px solid #DCDFE6;
        color: #606266;
        padding: 10px;
    }
    .msg-time{
        text-align: right;
    }
    .msg-title{
        font-size: 18px;
        margin-bottom:10px;
        cursor: pointer;
    }
    .msg-content{
        line-height: 1.2rem;
        height: 3.6rem;
        -webkit-box-orient: vertical;
        text-indent:30px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    .pagination{
        text-align: center;
        margin: 30px 0;
    }
</style>