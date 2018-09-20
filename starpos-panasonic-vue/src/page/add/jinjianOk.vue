<template>
  <div class="showCode">

<img src="../../assets/129446268171591622.jpg">
<p>提交成功<br />需要T+1人工审核</p>
<p>请长按上方二维码，关注</p>
<p>“星POS管家”公众号，接收进件审核通知！</p>

<!--  <yd-button size="large" class="button" @click.native='gostate'>确定</yd-button> -->
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {};
  },
  created() {
    document.title = "终端开户";
  },
  methods: {
    gostate() {
      let _this=this;
      _this.$router.push({name:"state"});
    }

  },
  mounted() {
    let _this=this;
    $(document).ready(function(e) {
      if (window.history && window.history.pushState) {
        $(window).on("popstate", function() {
          _this.$router.push({name:'state', params: { out: true }})
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

