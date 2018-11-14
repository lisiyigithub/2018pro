<template>
  <div class="register">
    <header>
      <img src="../../assets/woyaobangding_bg_logo@2x.png">
    </header>
    <div class="main">
      <yd-cell-group>

        <yd-cell-item>
          <span slot="left">账号</span>
          <yd-input ref="input1" type="text" slot="right" v-model='user_name' placeholder="请输入用户名(6-20位字母、数字组合)" regex="^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">手机号</span>
          <yd-input ref="input2" type="number" slot="right" v-model='mobile_no' placeholder="请输入手机号" regex="/^(0|86|17951)?(13[0-9]|15[012356789]|17[5678]|18[0-9]|14[57])[0-9]{8}$/"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">验证码</span>
          <input type="number" slot="right" v-model='verify_code' placeholder="请输入手机验证码">
          <span slot="right" class="yzmbox">
            <p v-if="codeOk==true" @click="queryCode()">获取验证码</p>
            <p class="yzmStyle" v-else>&nbsp;&nbsp;{{code_s}}秒后重新获取&nbsp;&nbsp;</p>
          </span>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">新密码</span>
          <input :type="hide1?'text':'password'" v-model='usr_pwd' slot="right" placeholder="新密码(6～20位数字、字母组合)">
          <span slot="right" @click='hide1 = !hide1'>
            <img v-show="hide1" src="../../assets/yanjing1.png">
            <img v-show="!hide1" src="../../assets/yanjing2.png">
          </span>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">确认密码</span>
          <input :type="hide2?'text':'password'" v-model='usr_pwd2' slot="right" placeholder="确认密码(6～20位数字、字母组合)">
          <span slot="right" @click='hide2 = !hide2'>
            <img v-show="hide2" src="../../assets/yanjing1.png">
            <img v-show="!hide2" src="../../assets/yanjing2.png">
          </span>
        </yd-cell-item>

      </yd-cell-group>
      <yd-button size="large" class="button" @click.native="submit()">注册</yd-button>
      <p class="p1">
        <router-link :to="{ name: 'superLogin',params: { 'openid': openid , 'invitation_code' : invitation_code }}">已有账号，立即登陆</router-link>
      </p>
    </div>
    <footer></footer>
  </div>
</template>

<script>
  import axios from "axios";
  import util from "../../utils/util";
  import sha256 from "sha256";
  import api from "../../api/api";
  export default {
    data() {
      return {
        hide1: true,
        hide2: true,
        codeOk: true,

        //openid: "",//openid
        user_name: "", //用户名
        mobile_no: "", //手机号码
        verify_code: "", //验证码
        usr_pwd: "", //密码
        usr_pwd2: "", //旧密码
        device_id: "1234", //设备id
        openid: "", //openid
        in_mercTyp: '', //权限 N 没有进件权限，Y 有权限
        //验证码
        code_s: "60",
        isok: false,
        invitation_code: '' //邀请码
      };
    },
    created() {
      document.title = "终端开户";
      var url = location.search;
      //alert(url);

      if (this.$route.params.openid != undefined) {
        this.openid = this.$route.params.openid;
      } else {
        this.openid = util.getUrlParams("openid");
      }
      if (this.$route.params.invitation_code != undefined) {
        this.invitation_code = this.$route.params.invitation_code;
      } else {
        this.invitation_code = util.getUrlParams("invitation_code");
      }
      // //获取订单号
      //this.orderId = util.getUrlParams("orderId"); //订单号
      // this.openId = util.getUrlParams("openId"); //微信openId
    },
    methods: {
      //获取验证码
      queryCode() {
        let _this = this;
        if (this.$refs.input2.valid && this.mobile_no == "") {
          this.$dialog.toast({
            mes: "请输入正确的手机号码",
            timeout: 2000
          });
          return false;
        } else {
          let data = {
            mobile_no: _this.mobile_no, //手机号码
            reset_flag: "3",
            opSys: "2"
          };
          console.log(data);
          axios({
              method: "post",
              url: `${api.api}verification.json`,
              data: data
            })
            .then(res => {
              console.log(res);
              if (res.data.repCode == "000000") {} else {
                this.$dialog.toast({
                  mes: `${res.data.repMsg}`,
                  timeout: 2000
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
          _this.codeOk = false;
          let num = 60;
          let int = self.setInterval(function () {
            num--;
            _this.code_s = num < 10 ? `0${num}` : `${num.toString()}`;
            if (num < 0) {
              clearInterval(int);
              _this.codeOk = true;
              _this.code_s = "60";
            }
          }, 1000);
        }
      },
      check() {
        if (this.$refs.input1.valid && this.user_name != "") {} else {
          this.$dialog.toast({
            mes: "请输入正确的用户名",
            timeout: 2000
          });
          return false;
        }
        if (this.$refs.input2.valid && this.mobile_no != "") {} else {
          this.$dialog.toast({
            mes: "请输入正确的手机号码",
            timeout: 2000
          });
          return false;
        }
        if (this.verify_code == "") {
          this.$dialog.toast({
            mes: "验证码不能为空",
            timeout: 2000
          });
          return false;
        }
        let re = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/;
        if (re.test(this.usr_pwd) && re.test(this.usr_pwd2)) {} else {
          this.$dialog.toast({
            mes: "密码格式不正确",
            timeout: 2000
          });
          return false;
        }
        if (this.usr_pwd != this.usr_pwd2) {
          this.$dialog.toast({
            mes: "两次密码不一致",
            timeout: 2000
          });
          return false;
        }
      },
      submit() {
        let _this = this;
        if (this.check() == false) {
          console.log("不成功");
        } else {
          console.log("成功");
          let data = {
            opSys: "2",
            user_name: _this.user_name, //用户名
            mobile_no: _this.mobile_no, //手机号码
            verify_code: _this.verify_code, //验证码
            usr_pwd: sha256(_this.usr_pwd), //密码
            device_id: "1234", //设备id
            openid: _this.openid
          };
          console.log(data);
          axios({
              method: "post",
              url: `${api.api}estmapp/wxregiste.json`,
              data: data
            })
            .then(res => {
              console.log(res);
              if (res.data.repCode == "000000") {
                //跳转进件页面
                // _this.$router.push({
                //   name: "superyanzheng",
                //   params: {
                //     invitation_code: _this.invitation_code
                //   }
                // });

                window.location.href = api.myApi + "/panasonic/supercode/superyanzheng?invitation_code=" +
                  _this.invitation_code + "&openid=" + _this.openid;
                //存储公共参数
                let obj = {};
                if (util.sesstionData("PublicParams") != false) {
                  obj = util.sesstionData("PublicParams");
                }
                obj.token_id = res.data.token_id;
                obj.usr_nm = res.data.usr_nm;
                obj.usr_no = res.data.usr_no;
                obj.usr_typ = res.data.usr_typ;
                obj.in_mercTyp = res.data.in_mercTyp;
                obj.mbl_no = _this.mobile_no
                sessionStorage.setItem("PublicParams", JSON.stringify(obj));
              } else {
                this.$dialog.toast({
                  mes: `注册失败,失败原因：${res.data.repMsg}`,
                  timeout: 2000
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.$dialog.toast({
                mes: `注册失败`,
                timeout: 2000
              });
            });
        }
      }
    }
  };
</script>

<style scoped>

</style>