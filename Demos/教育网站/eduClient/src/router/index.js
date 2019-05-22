import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/views/index'], resolve),
    },
    {
      path: '/newsList',
      name: 'newsList',
      component: resolve => require(['@/views/newsList'], resolve),
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: resolve => require(['@/views/newsDetail'], resolve),
    },
    {
      path: '/learnNotesList',
      name: 'learnNotesList',
      component: resolve => require(['@/views/learnNotesList'], resolve),
    },
    {
      path: '/learnNotesDetail',
      name: 'learnNotesDetail',
      component: resolve => require(['@/views/learnNotesDetail'], resolve),
    },
    {
      path: '/classList',
      name: 'classList',
      component: resolve => require(['@/views/classList'], resolve),
    },
    {
      path: '/classDetail',
      name: 'classDetail',
      component: resolve => require(['@/views/classDetail'], resolve),
    },
    {
      path: '/serviceList',
      name: 'serviceList',
      component: resolve => require(['@/views/serviceList'], resolve),
    },
    {
      path: '/download',
      name: 'download',
      component: resolve => require(['@/views/download'], resolve),
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: resolve => require(['@/views/aboutUs'], resolve),
    },
    {
      path: '/registerPerson',
      name: 'registerPerson',
      component: resolve => require(['@/views/registerPerson'], resolve),
    },
    {
      path: '/registerCompany',
      name: 'registerCompany',
      component: resolve => require(['@/views/registerCompany'], resolve),
    },
    {
      path: '/rule',
      name: 'rule',
      component: resolve => require(['@/views/rule'], resolve),
    },
    {
      path: '/personBaseInfo',
      name: 'personBaseInfo',
      component: resolve => require(['@/views/personBaseInfo'], resolve),
    },
    {
      path: '/personAddress',
      name: 'personAddress',
      component: resolve => require(['@/views/personAddress'], resolve),
    },
    {
      path: '/personChangePassword',
      name: 'personChangePassword',
      component: resolve => require(['@/views/personChangePassword'], resolve),
    },
    {
      path: '/personCenter',
      name: 'personCenter',
      component: resolve => require(['@/views/personCenter'], resolve),
    },
    {
      path: '/applyClass',
      name: 'applyClass',
      component: resolve => require(['@/views/applyClass'], resolve),
    },
    {
      path: '/applyClassC',
      name: 'applyClassC',
      component: resolve => require(['@/views/applyClassC'], resolve),
    },
    {
      path: '/companyCenter',
      name: 'companyCenter',
      component: resolve => require(['@/views/companyCenter'], resolve),
    },
    {
      path: '/companyBaseInfo',
      name: 'companyBaseInfo',
      component: resolve => require(['@/views/companyBaseInfo'], resolve),
    },
    {
      path: '/companyChangePassword',
      name: 'companyChangePassword',
      component: resolve => require(['@/views/companyChangePassword'], resolve),
    },
    {
      path: '/addPerson',
      name: 'addPerson',
      component: resolve => require(['@/views/addPerson'], resolve),
    },
    {
      path: '/myCLassDetail',
      name: 'myCLassDetail',
      component: resolve => require(['@/views/myCLassDetail'], resolve),
    },
    {
      path: '/videoList',
      name: 'videoList',
      component: resolve => require(['@/views/videoList'], resolve),
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resolve => require(['@/views/resetPassword'], resolve),
    }
  ]
})
