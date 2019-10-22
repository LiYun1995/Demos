<template>
  <a href="javascript:;" onclick="easemobim.bind({tenantId: "8019"})">快联系我</a>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    window.easemobim = window.easemobim || {};
    easemobim.config = {
      //聊天窗口加载成功回调
      onready: function() {
        easemobim.sendExt({
          ext: {
            imageName: "mallImage3.png",
            //custom代表自定义消息，无需修改
            type: "custom",
            msgtype: {
              order: {
                img_url: "h\n.pn",
                title: "测试track1",
                desc: "端午节粽子四",
                order_title: "订单号：123456789012345678901234567890",
                price: "",
                item_url: "https://www.baidu.com?s=order_sn/123123"
              }
            }
          }
        });
      }
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
