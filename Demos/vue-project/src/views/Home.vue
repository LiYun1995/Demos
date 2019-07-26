<template>
  <div class="home">
    <pre v-highlightjs>
    <code class="sql" v-html="testSQL">

    </code>
    </pre>
    <!-- <div v-html="testSQL" v-highlightjs>

    </div> -->
    <button @click="modal1 = !modal1">Modal</button>
    <LModal title="Hello LYGG" width="800" ref="modalChild" v-model="modal1">
      <h1>Sekiro</h1>
      <p>Shadows</p>
      <p>Die</p>
      <p>Twice</p>
    </LModal>
    <button @click="testStateChange">改变状态</button>
  </div>
</template>

<script>
// @ is an alias to /src
import LModal from "@/components/Modal.vue";
export default {
  name: "home",
  data() {
    return {
      modal1: false,
      str: "",
      testSQL:'-- 关键字上报疾病表\ncreate table tbl_key_report_dise\n(\nkrd_id               VARCHAR2(32 CHAR) not null,\nkrd_keyword       	VARCHAR2(225 CHAR),\nkrd_dic_id 			VARCHAR2(32 CHAR)\n)'
    };
  },
  components: {
    LModal
  },
  methods: {
    testStateChange() {
      let obj = {};
      obj.title = "凭啥子";
      this.$store.dispatch("addTabFun", obj);
      // console.log(this.$store.state.tabItems);
    }
  },
  mounted() {
    // gaoliang.hljs.initHighlightingOnLoad();
    // console.log(this.$store.state.tabItems);
  }
};
</script>
