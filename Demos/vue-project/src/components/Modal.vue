<template>
    <div :class="[myComponentsName + '_container']" :style="configStyles" v-if="visible">
        <div :class="[myComponentsName + '_header']">
            <h1 :class="[myComponentsName + '_title']">{{title}}</h1>
            <span :class="[myComponentsName + '_close']" @click="toggleModal">×</span>
        </div>
        <div :class="[myComponentsName + '_content']">
            <slot></slot>
        </div>
    </div>
</template>

<script>
const myComponentsName = "l_modal";
export default {
  name: "Lmodal",
  props: {
    title: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 50
    },
    value:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      myComponentsName: myComponentsName,
      visible:this.value
    };
  },
  mounted() {console.log(this.value)},
  watch:{
    value(val){
      this.visible = val;
    }
  },
  computed: {
    configStyles() {
      return {
        width: this.width + "px"
      };
    }
  },
  methods: {
    toggleModal() {
      this.visible = false;
      this.$emit('input',false);
    }
  }
};
</script>

<style>
.l_modal_container {
  z-index: 9999;
  width: 520px;
}
.l_modal_header {
  width: 100%;
  height: 30px;
  background: #9f79ee;
}
.l_modal_header .l_modal_title {
  height: 30px;
  font-size: 30px;
  display: inline-block;
  float: left;
}
.l_modal_header .l_modal_close {
  width: 30px;
  height: 30px;
  font-size: 30px;
  display: inline-block;
  float: right;
  cursor: pointer;
}
.l_modal_content {
  width: 100%;
  background: #e5e5e5;
}
</style>


