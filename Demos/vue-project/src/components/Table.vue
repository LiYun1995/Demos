<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{prop:tableProp , order: tableOrder}"
      @sort-change="changes"
      border
      @selection-change="changeFun"
    >
      <!--监听选择事件-->
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 搜索 -->
      <el-table-column :label="tablep.searchHead" width="90" v-if="tablep.search">
        <template slot-scope="scope">
          <div class="info_btn">
            <el-input v-model="input" @input="handleEmit" placeholder="请输入内容"></el-input>
            <!-- <input type="text" @change="handleEmit" /> -->
          </div>
        </template>
      </el-table-column>
      <!--添加复选框列-->
      <el-table-column
        v-for="(item,key) in tableKey"
        :key="key"
        :prop="item.value"
        :label="item.name"
      ></el-table-column>
      <!--添加操作列-->
      <el-table-column fixed="right" label="操作" v-if="tablep.operation.show">
        <template slot-scope="scope">
          <div class="info_btn">
            <!-- <span @click="change(scope.row.id)">修改</span> -->
            <span
              style="display:inline-block;cursor:pointer;margin-right:10px"
              v-for="item in tablep.operation.contrl"
              @click="contrlEmit(item.event)"
            >{{item.title}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--整合分页插件-->
    <el-pagination
      name="fenye"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "mytable",
  data() {
    return {
      input: "",
      currentPage: 1,
      pageSize: 10,
      tableProp: this.tablep.prop,
      tableOrder: this.tablep.order,
      sort: 1,
      total: 0,
      removeArr: []
    };
  },
  //获取父页面传参
  props: ["tableKey", "tablep", "tableData"],
  methods: {
    //排序监听方法
    changes({ column, prop, order }) {
      this.tableProp = prop;
      this.tableOrder = order;
      if (order !== "descending") {
        this.sort = 0;
      } else {
        this.sort = 1;
      }
      this.tableChang();
      return false;
    },
    //监听页面个数更改事件
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.tableChang();
    },
    //监听翻页事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableChang();
    },
    //通用更新table数据
    tableChang() {
      //   this.$post(this.tablep.url, {
      //     pageSize: this.pageSize,
      //     current: this.currentPage,
      //     orderBy: this.tableProp,
      //     sort: this.sort
      //   }).then(res => {
      //     this.total = res.data.total;
      //     let arr = res.data.list;
      //     this.tableData = JSON.parse(JSON.stringify(arr));
      //   });
    },
    //修改方法
    change(id) {
      this.$router.push({
        name: this.tablep.update,
        query: {
          id: id
        }
      });
    },
    //监听选择事件通过$emit()将更改数值传送到父页面
    changeFun(val) {
      this.removeArr = [];
      for (let va of val) {
        this.removeArr.push(va.id);
      }
      this.$emit("listenTochildEvent", this.removeArr);
    },
    handleEmit(val) {
      //   console.log(val);
      this.$emit("configSearch", val);
    },
    contrlEmit(event) {
      this.$emit(event);
    }
  }
};
</script>