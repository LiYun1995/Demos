<template>
 <router-view></router-view>
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
