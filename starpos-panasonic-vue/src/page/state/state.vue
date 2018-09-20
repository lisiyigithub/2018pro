<template>
  <div class="state">
    <header>
      <span>已进件商户</span>
      <span @click='gokaihu()'>终端开户</span>
    </header>
    <div class="main">

      <ul>
        <li v-for='(item,index) in list' :key='index' @click='Jump(item.merc_auth_sts,item.merc_id,item.log_no)'>
          <img src="../../assets/pic_shop_zong.png">
          <div>
            <h1>{{item.merc_nm}}</h1>
            <h2>商户号:{{item.merc_id}}</h2>
          </div>
          <p v-show="item.merc_auth_sts==1" class="styleA">审核中</p>
          <p v-show="item.merc_auth_sts==2" class="styleB">待修改</p>
          <img src="../../assets/shenqingdaili_icon_back@3x.png" class="you" v-show="item.merc_auth_sts==0 || item.merc_auth_sts==3 || item.merc_auth_sts==5 || item.merc_auth_sts==7">
        </li>
      </ul>
    </div>
    <footer>

    </footer>
  </div>
</template>

<script>
import axios from "axios";
import util from "../../utils/util";
import api from "../../api/api";
import $ from "jquery";
export default {
  data() {
    return {
      //公共参数部分
      token_id: "", //201710210000013868
      usr_no: "", //000000005028
      usr_typ: "",

      in_mercTyp: "", //权限 N 没有进件权限，Y 有权限
      list: [
        // {
        //   merc_nm: "新大陆测试商户1", //商户名称
        //   merc_id: "13454", //商户编号
        //   merc_auth_sts: 1 //1审核中；2待修改；0、3、6、7 正常；5不处理。
        // },
        // {
        //   merc_nm: "新大陆测试商户1",
        //   merc_id: "13454",
        //   merc_auth_sts: 2
        // },
        // {
        //   merc_nm: "新大陆测试商户1",
        //   merc_id: "13454",
        //   merc_auth_sts: 5
        // }
      ],
      log_no: "" //流水号
    };
  },
  created() {
    document.title = "终端开户";
    window.localStorage.setItem("reload", true);
    let _this = this;
    var url = location.search;
    //alert(url);
    //获取公共参数
    if (util.sesstionData("PublicParams") != false) {
      //从sesstion里取
      var paramsObj = util.sesstionData("PublicParams");
      this.token_id = paramsObj.token_id;
      this.usr_no = paramsObj.usr_no;
      this.usr_typ = paramsObj.usr_typ;
      this.in_mercTyp = paramsObj.in_mercTyp;
    } else {
      //从url里取
      this.token_id = util.getUrlParams("token_id");
      this.usr_no = util.getUrlParams("usr_no");
      this.usr_typ = util.getUrlParams("usr_typ");
      this.in_mercTyp = util.getUrlParams("in_mercTyp");
      //将从url里获取的参数存储到sesstion里面
      let obj = {};
      obj.token_id = this.token_id;
      obj.usr_no = this.usr_no;
      obj.usr_typ = this.usr_typ;
      obj.in_mercTyp = this.in_mercTyp;
      sessionStorage.setItem("PublicParams", JSON.stringify(obj));
    }

    var data = {
      token_id: this.token_id,
      opSys: "2",
      usr_no: this.usr_no,
      usr_typ: this.usr_typ
    };
    console.log(data);

    axios({
      method: "post",
      url: `${api.api}checkmer1.json`,
      data: data
    })
      .then(res => {
        console.log(res);
        if (res.data.repCode == "000000") {
          _this.list = res.data.mercList;
          _this.log_no = res.data.log_no;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    let _this=this;
    //关闭退出监听
    $(document).ready(function(e) {
      $(window).off();
      
      if (_this.$route.params.out == true) {
       
        if (window.history && window.history.pushState) {
         
          $(window).on("popstate", function() {
            wx.closeWindow();
          });
        }
        window.history.pushState("forward", null, "#"); //在IE中必须得有这两行
        window.history.forward(1);
      }
    });
  },
  methods: {
    Jump(type, merc_id, log_no) {
      console.log(type);
      switch (type) {
        case "2": //待修改
          var data = {
            token_id: this.token_id,
            opSys: "2",
            usr_no: this.usr_no,
            merc_id: merc_id,
            log_no: log_no
          };
          console.log(data);
          axios({
            method: "post",
            url: `${api.api}mercDetails.json`,
            data: data
          })
            .then(res => {
              console.log(res);
              if (res.data.repCode == "000000") {
                //将需要修改的商户详细信息存入sesstion
                sessionStorage.setItem(
                  "UpdateParams",
                  JSON.stringify(res.data)
                );
                this.$router.push({ name: "saoma" });
              }
            })
            .catch(err => {
              console.log(err);
            });
          break;
        case "0":
        case "3":
        case "5":
        case "7":
          this.$router.push({ name: "showCode" });

          break;
        default:
          break;
      }
    },
    gokaihu() {
      if (this.in_mercTyp == "N") {
        this.$dialog.toast({ mes: "该账号无进件权限", timeout: 2000 });
      } else {
        sessionStorage.removeItem("UpdateParams");
        this.$router.push({ name: "saoma" });
      }
    }
  }
};
</script>

<style scoped>
.yd-cell-item {
  border-top: 1px dashed #e9e9e9;
}

::-webkit-input-placeholder {
  /* color: red;
     font-size: 20px;
     line-height: 50px; */
  text-align: right;
}

input {
  text-align: right !important;
}

.styleA {
  color: #f6a311;
}

.styleB {
  color: #419bf9;
}
</style>
