<template>
    <div style="width:100%">
        <Search type="date"></Search>
        <grid :table="table"></grid>
    </div>
</template>
<script>
    import Search from '../../../components/search.vue';
    import Grid from '../../../components/grid.vue';
    export default {
        data() {
            return {
                table:[
                    {
                        title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
                        announcer:'大多都是',
                        createDate:'2018-04-23',
                        lastDate:'2018-04-29'
                    },{
                        title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
                        announcer:'大多都是',
                        createDate:'2018-04-23',
                        lastDate:'2018-04-29'
                    },{
                        title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
                        announcer:'大多都是',
                        createDate:'2018-04-23',
                        lastDate:'2018-04-29'
                    },{
                        title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
                        announcer:'大多都是',
                        createDate:'2018-04-23',
                        lastDate:'2018-04-29'
                    },{
                        title:'dsfsdfsd发电方式考了多少分了尽快反馈附件两份的数据库',
                        announcer:'大多都是',
                        createDate:'2018-04-23',
                        lastDate:'2018-04-29'
                    },
                ]
            }
        },
        components: {
            Search,
            Grid
        }
    }
</script>

<style>
    body{
        background: #f7f9fb;
        margin:0;
    }
</style>
