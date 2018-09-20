<template>
  <div class="login">
    <header>
      <img src="../../assets/woyaobangding_bg_logo@2x.png">
    </header>
    <div class="main">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left" class="left_Style">
            <img src="../../assets/woyaobangding_coin_yonghu@2x.png">
            <p></p>
          </span>
          <yd-input slot="right" type="text" v-model='mobile_no' placeholder="请输入用户名或手机号"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left" class="left_Style">
            <img src="../../assets/woyaobangding_icon_mima@2x.png">
            <p></p>
          </span>
          <input slot="right" type="password" v-model='passwd' placeholder="请输入密码">
        </yd-cell-item>
        <yd-button size="large" class="button" @click.native="submit">登录</yd-button>
        <p>
          <router-link :to="{ name: 'register',params: { 'openid': openid }}">前往注册</router-link>
        </p>
      </yd-cell-group>

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
      mobile_no: "", //账号
      passwd: "", //密码
      device_id: "", //设备id
      openid: "",//openid
      in_mercTyp:'',//权限 N 没有进件权限，Y 有权限
    };
  },
  created() {
    document.title = "终端开户";
    this.openid = this.$route.params.openid;
    window.localStorage.setItem("reload", true);
    //alert(`openid为${this.openid}`)
  },
  methods: {
    submit() {
      let _this = this;
      if (this.mobile_no == "" || this.passwd == "") {
        this.$dialog.toast({ mes: "账号或密码不能为空", timeout: 2000 });
      } else {
        let data = {
          opSys: "2",
          mobile_no: _this.mobile_no, //账号
          passwd: sha256(_this.passwd), //密码
          device_id: "", //设备id
          openid: _this.openid
          //openid:'o6RXPwBVtlhrpJR3rjioVY6Tj-FQ'
        };
        console.log(data);
        axios({
          method: "post",
          url: `${api.api}login.json`,
          data: data
        })
          .then(res => {
            console.log(res);
            if (res.data.repCode == "000000") {
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
              sessionStorage.setItem("PublicParams", JSON.stringify(obj));
              // if (res.data.mobile == null) {
              //   this.$dialog.toast({ mes: "该账号无进件权限", timeout: 2000 });
              // } else {
                switch (res.data.merc_usr) {
                  case "0":
                    //跳转列表页面
                    _this.$router.push({ name: "state" });
                    break;
                  case "1":
                    //跳转进件页面
                    _this.$router.push({ name: "saoma" });
                    break;
                  default:
                    break;
                }
              //}
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
              mes: `登陆失败`,
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
