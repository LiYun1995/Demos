import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: '/manage',
      name: 'HisManage',
      component: require('@/views/HisManage').default,
      children: [
        {
          path: "testy",
          component: require('@/components/test2/testy').default,
        },
        {
          path: "test2",
          name: "test2",
          component: require('@/views/Layout').default,
          children: [
            {
              path: "test222",
              name: "test2-1",
              component: require('@/components/test2/test222').default,
            },
            {
              path: "test2-2",
              name: "test2-2",
              component: require('@/components/test2/test2-2').default,
            }
          ]
        }
      ]
    }
  ]
});
