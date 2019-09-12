<template>
  <div>
    <div class="test">
      <img src="../assets/photo1.jpg" alt />
    </div>
    <!-- <div class="wow shake">
      <img src="../assets/photo1.jpg" alt />
    </div>
    <div class="wow fadeInRight">
      <img src="../assets/photo1.jpg" alt />
    </div>
    <div class="wow fadeInRight">
      <img src="../assets/photo1.jpg" alt />
    </div>
    <div class="wow fadeInRight">
      <img src="../assets/photo1.jpg" alt />
    </div>
    <div class="wow fadeInRight">
      <img src="../assets/photo1.jpg" alt />
    </div>
    <div class="wow slideInUp">
      <img src="../assets/photo1.jpg" alt />
    </div>
    <div class="wow slideInUp">
      <img src="../assets/photo1.jpg" alt />
    </div>
    <div class="wow shake">
      <img src="../assets/photo1.jpg" alt />
    </div>
    <div class="wow fadeInRight">
      <img src="../assets/photo1.jpg" alt />
    </div>-->
  </div>
</template>

<script>
import { WOW } from "wowjs";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      activeClass: false
    };
  },
  mounted() {
    // var wow = new WOW({
    //   //   live: false
    // });
    // wow.init();
  },
  methods: {
    fade() {
      this.activeClass = true;
      setTimeout(() => {
        this.activeClass = false;
      }, 1000);
    },
    out() {
      this.activeClass = false;
    }
  }
};
</script>

<style>
.test {
  width: 300px;
  height: 300px;
  margin: 100px auto;
  /* background: url("../assets/photo1.jpg"); */
  position: relative;
  animation: mymove 0.5s ease-out;
  -webkit-animation: mymove 0.5s ease-out;
}
.test img {
  width: 100%;
  height: 100%;
}
@keyframes mymove {
  from {
    /* left: -500px; */
    width: 300px;
    height: 300px;
  }
  to {
    /* left: 200px; */
    width: 350px;
    height: 350px;
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  from {
    /* left: -500px; */
    width: 300px;
    height: 300px;
  }
  to {
    /* left: 200px; */
    width: 350px;
    height: 350px;
  }
}

@media only screen and (max-width: 1750px) {
  .test {
    animation: none;
    -webkit-animation: none;
  }
}
</style>