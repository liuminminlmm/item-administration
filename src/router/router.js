import Vue from 'vue/dist/vue.esm.js';
import VueRouter from 'vue-router';
import Login from './../pages/login/index';
import Home from './../pages/home/home.vue';
import Subdata from './../subdata/subdata.vue';
import Work from './../work/work.vue';
import Menu from './../menu/menu.vue';
import Organization from './../organization/organization.vue';
Vue.use(VueRouter);
let router = new VueRouter({
    routes: [{
        name: 'login',
        path: '/login',
        component: Login
    }, {
        name: 'home',
        path: '/home',
        component: Home,
        children: [{
            name: 'subdata',
            path: 'subdata',
            component: Subdata
        }, {
            name: 'work',
            path: 'work',
            component: Work
        }, {
            name: 'menu',
            path: 'menu',
            component: Menu,
            children: [{
                name: 'organization',
                path: 'organization',
                component: Organization
            }]
        }]
    }]
})
router.beforeEach((to, from, next) => {
    // console.log(next())
    if (to.name === 'login') {
        next();
    } else {
        if (sessionStorage.getItem('token')) {
            next();
        } else {
            next('/login')
        }
    }
})
export default router;
