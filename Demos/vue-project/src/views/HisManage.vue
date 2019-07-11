<template>
  <div class="manage-main" style="width:100%;height:100%">
    <!-- <LeftTree></LeftTree> -->
    <div class="first">
      <router-link to="/manage/test1">test1</router-link>
      <router-link to="/manage/testy">tesy</router-link>
    </div>
    <div class="second">
      <router-link to="/manage/test2/test222">test222</router-link>
      <router-link to="/manage/test2/test2-2">test2-2</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import LeftTree from "@/components/manage/LeftTree";
import Content from "@/components/manage/Content";
import Layout from "@/views/Layout";
const routerTable = require("../mockTree.json");
const formatRoutes = require("../getRouter");
export default {
  name: "HisManage",
  components: { LeftTree, Content, Layout },
  data() {
    return {};
  },
  mounted() {
    // let myrouter = formatRoutes.formatRoutes(routerTable.data.router);
    // console.log(myrouter);
    // this.$router.addRoutes([
    //   {
    //     path: "/manage",
    //     component: require("@/views/HisManage").default,
    //     children: myrouter
    //   }
    // ]);
    // console.log(this.$router.options.routes);
  },

  watch: {
    $route(to, from) {
      //   console.log(this.$route.path);
    }
  }
};
</script>