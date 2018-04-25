<template>
    <div style="width:100%">
        <search type="profess" @getList="getList"></search>
        <div id="main">
            <div class="mainleft">
                <div v-for="i in data">
                    <post-menu :post="i" @likeClick="addLike"></post-menu>
                </div>
                <!--工具条-->
                <el-pagination layout="prev, pager, next"
                               @current-change="handleCurrentChange"
                               :page-size="10"
                               :total="total">
                </el-pagination>
            </div>
            <post-range :list="list"></post-range>
        </div>
    </div>
</template>
<script>
    import Search from './search.vue';
    import PostMenu from '../../../components/postMenu.vue';
    import PostRange from '../../../components/postRange.vue';
    export default {
        data() {
            return {
                data: [],
                list: [],
                listUrl: 'http://localhost:8081/content',
                likeListUrl: 'http://localhost:8081/content/like',
                page: 1,
                total: 0,
            }
        },

        created () {
            this.getList();
            this.getLikeList();
        },


        methods: {
            getList (filterTitle = '') {
                this.$http.get(this.listUrl + '?page='+ this.page +
                    '&category=' + '表白墙' + '&value=' + filterTitle
                ).then(response => {
                    response.data.contents.forEach((content) => {
                        content.addTime = this.formatDate(content.addTime);
                    });
                    this.total = response.data.count;
                    this.data = response.data.contents;
                }, response => {
                    console.log('error:' + response);
                })
            },

            getLikeList () {
                this.$http.get(this.likeListUrl + '?category=' + '表白墙').then(response => {
                    response.data.contents.forEach((content) => {
                        content.addTime = this.formatDate(content.addTime);
                    });
                    this.list = response.data.contents;
                }, response => {
                    console.log('error:' + response);
                })
            },

            addLike (id) {
                this.$http.post('http://localhost:8081/like?contentid='+id).then(response => {
                    if (response.data.code !== 0) {
                        this.$message({
                            message: response.data.message,
                            type: 'error'
                        });
                    } else {
                        this.$message({
                            message: response.data.message,
                            type: 'success'
                        });
                        this.getList();
                        this.getLikeList();
                    }
                }, response => {
                    console.log('error:' + response);
                })
            },

            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
        },
        components: {
            Search,
            PostMenu,
            PostRange
        }
    }
</script>

<style>
    body{
        background: #f7f9fb;
        margin:0;
    }
    #main{
        margin-top: 40px;
    }
    .mainleft{
        margin-left: 30px;
        width: 60%;
        display: inline-block;
    }
</style>
