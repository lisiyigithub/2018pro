<template>
  <div class="jinjianOk">
    <img src="../../assets/icon_succes.png">
    <p id="text1">提交成功</p>
    <p id="text2">请关注推送消息接收审核通知</p>
    <div id="buttom_div">
      <yd-button size="large" type="hollow" color="#25A2F2" @click.native="goToFollow">关注星POS管家</yd-button>
      <p id="text2">关注公众号，接收进件审核通知</p>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    data() {
      return {
        url : "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIzNDc5NzAzMw==#wechat_redirect"
      };
    },
    created() {
      document.title = "进件完成";
    },
    methods: {
      gostate() {
        let _this = this;
        _this.$router.push({
          name: "state"
        });
      },
      goToFollow(){
         window.location.href=this.url
      }

    },
    mounted() {
      let _this = this;
      $(document).ready(function (e) {
        if (window.history && window.history.pushState) {
          $(window).on("popstate", function () {
            _this.$router.push({
              name: 'state',
              params: {
                out: true
              }
            })
          });
        }
        window.history.pushState("forward", null, "#"); //在IE中必须得有这两行
        window.history.forward(1);
      });
    }
  };
</script>
<style>

</style>