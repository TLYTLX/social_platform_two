import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/main/index.vue';
import home from '../pages/main/home/index.vue';
// import view from '../pages/main/view.vue';
import admin_index from '../pages/admin/index.vue';
import index_welcome from '../pages/admin/index_welcome.vue';
import user_index from '../pages/admin/user_index.vue';
import user_admin_index from '../pages/admin/admin_index.vue';
import content_index from '../pages/admin/content_index.vue';
import content_add from '../pages/admin/content_add.vue';
import content_edit from '../pages/admin/content_edit.vue';

import personal from '../pages/main/personalCenter/index.vue';
import post from '../pages/main/post/index.vue';
// import profile from '../pages/main/personalCenter/index.vue';
import news from '../pages/main/news/index.vue';
import sale from '../pages/main/sale/index.vue';
import rent from '../pages/main/rent/index.vue';
import profess from '../pages/main/profess/index.vue';
import date from '../pages/main/date/index.vue';
import anonymous from '../pages/main/anonymous/index.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: index,
            children: [
                {
                    path: '/',
                    component: home
                },
                {
                    name: 'news',
                    path: '/news',
                    component: news
                },
                {
                    name: 'personal',
                    path: '/personal',
                    component: personal
                },
                {
                    name: 'post',
                    path: '/post',
                    component: post
                },
                // {
                //     name: 'profile',
                //     path: '/profile',
                //     component: profile
                // },
                {
                    name: 'sale',
                    path: '/sale',
                    component: sale
                },
                {
                    name: 'profess',
                    path: '/profess',
                    component: profess
                },
                {
                    name: 'date',
                    path: '/date',
                    component: date
                },
                {
                    name: 'anonymous',
                    path: '/anonymous',
                    component: anonymous
                },
                {
                    name: 'rent',
                    path: '/rent',
                    component: rent
                }
                // {
                //     path: '/category',
                //     component: index_list
                // },
                // {
                //     path: '/view',
                //     component: view
                // },
            ]
        },
        {
            path: '/admin',
            component: admin_index,
            children: [
                {
                    path: '/admin',
                    component: index_welcome
                },
                {
                    path: '/admin/user',
                    component: user_index
                },
                {
                    path: '/admin/admin',
                    component: user_admin_index
                },
                {
                    path: '/admin/content',
                    component: content_index
                },
                {
                    path: '/admin/content/add',
                    component: content_add
                },
                {
                    path: '/admin/content/edit',
                    component: content_edit
                },
            ]
        }
    ]
})
