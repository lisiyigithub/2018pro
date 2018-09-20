import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const index = r => require.ensure([], () => r(require('../page/index.vue')), 'index');
const index2 = r => require.ensure([], () => r(require('../page/index2.vue')), 'index2');
//星管家登陆注册
const login = r => require.ensure([], () => r(require('../page/login/login.vue')), 'login');
const register = r => require.ensure([], () => r(require('../page/login/register.vue')), 'register');
//台盘进件
const yanzheng = r => require.ensure([], () => r(require('../page/add/yanzheng.vue')), 'yanzheng');
const tijiao = r => require.ensure([], () => r(require('../page/add/tijiao.vue')), 'tijiao');
const saoma = r => require.ensure([], () => r(require('../page/add/saoma.vue')), 'saoma');
const yaoqing = r => require.ensure([], () => r(require('../page/add/yaoqing.vue')), 'yaoqing');

const jinjianOk = r => require.ensure([], () => r(require('../page/add/jinjianOk.vue')), 'jinjianOk');
const newyanzheng = r => require.ensure([], () => r(require('../page/add/newyanzheng.vue')), 'newyanzheng');

//进件状态
const state = r => require.ensure([], () => r(require('../page/state/state.vue')), 'state');
const showCode = r => require.ensure([], () => r(require('../page/state/showCode.vue')), 'showCode');
const skip = r => require.ensure([], () => r(require('../page/state/skip.vue')), 'skip');

const text = r => require.ensure([], () => r(require('../components/text.vue')), 'text');

export default new Router({
    base: '/panasonic',
    mode: 'history',
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/index1',
            name: 'index',
            component: index
        },
        {
            path: '/index2',
            name: 'index2',
            component: index2
        },
        {
            path: '/login/login',
            name: 'login',
            component: login
        },
        {
            path: '/login/register',
            name: 'register',
            component: register
        },
        {
            path: '/add/yanzheng',
            name: 'yanzheng',
            component: yanzheng
        },
        {
            path: '/add/tijiao',
            name: 'tijiao',
            component: tijiao
        },
        {
            path: '/add/saoma',
            name: 'saoma',
            component: saoma
        },
        {
            path: '/add/yaoqing',
            name: 'yaoqing',
            component: yaoqing
        },
        {
            path: '/add/jinjianOk',
            name: 'jinjianOk',
            component: jinjianOk
        },
        {
            path: '/state/state',
            name: 'state',
            component: state
        },
        {
            path: '/state/showCode',
            name: 'showCode',
            component: showCode
        },
        {
            path: '/state/skip',
            name: 'skip',
            component: skip
        },
        {
            path: '/text',
            name: 'text',
            component: text
        },
        {
            path: '/add/newyanzheng',
            name: 'newyanzheng',
            component: newyanzheng,
            meta: {
                keepAlive: true
            }
        },
    ]
})