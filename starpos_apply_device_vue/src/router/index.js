import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
    //台盘进件
const yanzheng = r => require.ensure([], () => r(require('../page/add/yanzheng.vue')), 'yanzheng');


export default new Router({
    base: '/applydevice/',
    mode: 'history',
    routes: [{
        path: '/yanzheng',
        name: 'yanzheng',
        component: yanzheng
    }, ]
})