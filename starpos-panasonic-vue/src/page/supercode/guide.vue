<!--  -->
<template>
  <div class="guide">
    <img id="img_title" src="../../assets/title_parts.png" alt="">
    <img id="img_frist" src="../../assets/frist_parts.png" alt="">
    <img id="img_second" src="../../assets/second_parts.png" alt="">
    <img id="img_third" src="../../assets/third_parts.png" alt="">
    <div id="buttom_div">
      <yd-button shape="circle" size="large" type="hollow" color="#F2F2F2" bgcolor="#FC7A5F" @click.native="goToLogin">点我开始</yd-button>
    </div>
  </div>
</template>

<script>
  import util from "../../utils/util";
  import api from "../../api/api";
  import $ from "jquery";
  import axios from "axios";
  export default {
    name: "",
    data() {
      return {
        code: "1",
        state: "",
        url: "https://api.weixin.qq.com/sns/oauth2/access_token",
        str: "",
        authorization_code: "authorization_code",
        access_token: "",
        openid: "",
        zh_CN: "zh_CN",
        invitation_code: '', //邀请码
        is_logining: '',
        openid: ""
      };
    },

    created() {
      document.title = "开通超级码";
      this.code = util.getUrlParams("code");
      this.state = util.getUrlParams("state");
      if (this.$route.params.invitation_code != undefined) {
        this.invitation_code = this.$route.params.invitation_code;
      } else {
        this.invitation_code = util.getUrlParams("invitation_code");
      }
      this.getOpenid();
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
      getOpenid() {
        let _this = this
        _this.url = _this.url + "?appid=" + api.appId + "&secret=" + api.appSecret + "&code=" + _this.code +
          "&grant_type=" + _this.authorization_code
        // $.ajax({
        //   url: 'http://query.yahooapis.com/v1/public/yql',
        //   dataType: 'jsonp',
        //   data: {
        //     q: "select*from json where url=\'" + URL + "'",
        //     format: 'json'
        //   },
        //   success: function (data) {
        //     console.log(data)
        //     _this.access_token = data.query.results.json.access_token
        //     _this.openid = data.query.results.json.openid
        //   }
        // })
        let data = {
          sendurl: _this.url
        };
        console.log(data);
        axios({
            method: "post",
            url: `${api.api}getwxopenid.json`,
            data: data
          })
          .then(res => {
            console.log(res);
            if (res.data.repCode == "000000") {
              if (res.data.openid != null && res.data.openid != "") {
                _this.openid = res.data.openid
              } else {
                if (util.sesstionData("PublicParams") != false) {
                  let obj_openid = util.sesstionData("PublicParams");
                  _this.openid = obj_openid.openid
                }
              }
              let obj = {};
              if (res.data.binds == "1") {
                _this.is_logining = true;
                
                if (util.sesstionData("PublicParams") != false) {
                  obj = util.sesstionData("PublicParams");
                }
                obj.token_id = res.data.token_id;
                obj.usr_no = res.data.usr_no;
                obj.usr_typ = res.data.usr_typ;
                obj.openid = res.data.openid;
                obj.mbl_no = res.data.mbl_no;
                sessionStorage.setItem("PublicParams", JSON.stringify(obj));
              } else if (res.data.binds == "0") {
                _this.is_logining = false;
                if (util.sesstionData("PublicParams") != false) {
                  obj = util.sesstionData("PublicParams");
                }
                obj.openid = res.data.openid;
                sessionStorage.setItem("PublicParams", JSON.stringify(obj));
              } else {
                this.$dialog.toast({
                  mes: `${res.data.repMsg}`,
                  timeout: 2000
                });
              }
            } else {
              this.$dialog.toast({
                mes: `${res.data.repMsg}`,
                timeout: 2000
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$dialog.toast({
              mes: `${err}`,
              timeout: 2000
            });
          });
      },
      goToLogin() {
        let _this = this
        if (_this.openid != null && _this.openid != "") {
          if (_this.is_logining) {
            // _this.$router.push({
            //   name: "superyanzheng",
            //   params: {
            //     invitation_code: _this.invitation_code,
            //     openid: _this.openid
            //   }
            // });
            location.replace(api.myApi + "/panasonic/supercode/superyanzheng?invitation_code=" +
              _this.invitation_code + "&openid=" + _this.openid)
          } else {
            // _this.$router.push({
            //   name: "superRegister",
            //   params: {
            //     invitation_code: _this.invitation_code,
            //     openid: _this.openid
            //   }
            // });
             location.replace(api.myApi + "/panasonic/supercode/superRegister?invitation_code=" +
              _this.invitation_code + "&openid=" + _this.openid)
          }
        } else {
          this.$dialog.toast({
            mes: `${"用户信息获取失败，请重新点击"}`,
            timeout: 2000
          });
        }

      }
    }
  }
</script>
<style>
</style>