<!--  -->
<template>
  <div></div>
</template>

<script>
  import api from "../../api/api";
  import util from "../../utils/util";
  export default {
    name: "授权",
    data() {
      return {
        url: "https://open.weixin.qq.com/connect/oauth2/authorize",
        redirect_uri: api.redirect_uri,
        scope: "snsapi_userinfo", //snsapi_base   静默 snsapi_userinfo 非静默
        invitation_code: '' //邀请码
      };
    },

    created() {
      document.title = "开通超级码";
      if (this.$route.params.invitation_code != undefined) {
        this.invitation_code = this.$route.params.invitation_code;
      } else {
        this.invitation_code = util.getUrlParams("invitation_code");
      }
      let _this = this;
      _this.getauthorize()
    },

    components: {},

    computed: {},

    mounted() {

    },

    methods: {
      getauthorize() {
        let _this = this;
        _this.redirect_uri = _this.redirect_uri +"?invitation_code="+_this.invitation_code
        _this.url = _this.url + "?appid=" + api.appId + "&redirect_uri=" + _this.redirect_uri +
          "&response_type=code&scope=" +
          _this.scope + "#wechat_redirect"
        console.log(_this.url)
        window.location.href = _this.url;
      }
    }
  }
</script>
<style>
</style>