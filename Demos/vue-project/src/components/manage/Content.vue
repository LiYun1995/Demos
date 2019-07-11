<template>
  <div :class="[classNames + '-container']">
    <router-link to="/manage/test1">test1</router-link>
    <router-link to="/manage/test2">test2</router-link>
    <router-link to="/manage/testy">tesy</router-link>
    <router-link to="/manage/test2/test222">test222</router-link>
    <router-link to="/manage/test2/test2-2">test2-2</router-link>
    <router-view />
  </div>
</template>

<script>
const classNames = "his-manage-content";
export default {
  data() {
    return {
      classNames: classNames
    };
  },
  methods: {},

  watch: {
    $route(to, from) {
      console.log(this.$route.path);
      console.log(this.$route.name);
    }
  }
};
</script>
