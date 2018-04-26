
<script>
    import Search from './search.vue';
    import ProfessIndex from '../profess/index.vue';
    export default {
        extends: ProfessIndex,
        methods: {
            getList (filterTitle = '') {
                this.$http.get(this.listUrl + '?page='+ this.page +
                    '&category=' + '匿名论坛' + '&value=' + filterTitle
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
                this.$http.get(this.likeListUrl + '?category=' + '匿名论坛').then(response => {
                    response.data.contents.forEach((content) => {
                        content.addTime = this.formatDate(content.addTime);
                    });
                    this.list = response.data.contents;
                }, response => {
                    console.log('error:' + response);
                })
            },
        },
        components: {
            Search
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
