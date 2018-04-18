<template>
    <div>
        <Header title="合租信息"></Header>
        <Search type="rent"></Search>
        <rent-table :table="table"></rent-table>
        <Footer></Footer>
    </div>
</template>
<script>
    import Search from '../../../components/search.vue';
    import Header from '../../../components/header.vue';
    import Footer from '../../../components/footer.vue';
    import RentTable from '../../../components/rentTable.vue';
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
            Header,
            Footer,
            Search,
            RentTable
        }
    }
</script>

<style>
    body{
        background: #f7f9fb;
        margin:0;
    }
</style>
