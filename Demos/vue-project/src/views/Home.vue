<template>
  <div class="home">
    <!-- <pre v-highlightjs>
    <code class="sql" v-html="testSQL">

    </code>
    </pre>-->
    <!-- <div v-html="testSQL" v-highlightjs>

    </div>-->
    <sl-table
      :tableKey="tableKey"
      :tablep="tablep"
      :tableData="data1"
      v-on:listenTochildEvent="showMessageFromChild"
      @configSearch="handleSearch"
      @contrlChange="contrlChange"
      ref="child"
    ></sl-table>
    <!-- <button @click="modal1 = !modal1">Modal</button>
    <LModal title="Hello LYGG" width="800" ref="modalChild" v-model="modal1">
      <h1>Sekiro</h1>
      <p>Shadows</p>
      <p>Die</p>
      <p>Twice</p>
    </LModal>
    <button @click="testStateChange">改变状态</button>-->
  </div>
</template>

<script>
// @ is an alias to /src
import MTable from "@/components/Table.vue";
import LModal from "@/components/Modal.vue";
export default {
  name: "home",
  data() {
    return {
      data1: [
        {
          name: "myName",
          test: "test"
        }
      ],
      //设置列名，字段名
      tableKey: [
        {
          name: "列名",
          value: "name"
        },
        {
          name: "test",
          value: "test"
        }
      ],
      tablep: {
        search: true,
        pageShow: false,
        searchHead: "编号",
        operation: {
          show: true,
          contrl: [
            {
              title: "修改",
              event: "contrlChange"
            },
            {
              title: "删除",
              event: "contrlDelete"
            }
          ]
        } //操作列是否显示
      },
      removeArr: [], //缓存删除code
      modal1: false,
      str: "",
      testSQL:
        "-- 关键字上报疾病表\ncreate table tbl_key_report_dise\n(\nkrd_id               VARCHAR2(32 CHAR) not null,\nkrd_keyword       	VARCHAR2(225 CHAR),\nkrd_dic_id 			VARCHAR2(32 CHAR)\n)"
    };
  },
  components: {
    LModal,
    "sl-table": MTable //定义sl-table
  },
  methods: {
    testStateChange() {
      let obj = {};
      obj.title = "凭啥子";
      this.$store.dispatch("addTabFun", obj);
      // console.log(this.$store.state.tabItems);
    },
    //页面跳转方法
    newartic() {
      this.$router.push({
        name: ""
      });
    },
    //监听子页面传参并缓存本地
    showMessageFromChild(data) {
      this.removeArr = data;
    },
    remove() {
      if (this.removeArr.length > 0) {
        this.$confirm("此操作将永久删除该条活动, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$get("", {
              id: this.removeArr.join()
            }).then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                setTimeout(() => {
                  //重新请求数据
                  this.$refs.child.tableChang();
                }, 0);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          message: "请选择需要删除的内容！",
          type: "warning"
        });
      }
    },
    handleSearch(data) {
      console.log(data);
    },
    contrlChange() {
      console.log("change");
    }
  },
  mounted() {
    // gaoliang.hljs.initHighlightingOnLoad();
    // console.log(this.$store.state.tabItems);
  }
};
</script>
