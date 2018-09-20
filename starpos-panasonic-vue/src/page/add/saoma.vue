<template>
  <div class="saoma">
    <header>
      <h1 v-show="show" @click='show=!show'>
        <span>未通过审核原因：{{merc_remark}}</span>
        <span>×</span>
      </h1>
    </header>
    <div class="main">
      <div class="box">
        <h1>终端</h1>
        <img src="../../assets/erweima.png" @click="saoma()">
        <p>请扫描设备上的二维码<br/>（可扫描多台同时开通）</p>
        <input type="hidden" class="shebei" name="shebei" value="0" style="display: none;" />
      </div>
      <ul class="shebei_block">
        <li v-for='(item,index) in list' :key='index'>
          <span>{{item}}</span>
          <img src="../../assets/cha.png" @click='remove(index)'>
        </li>
      </ul>
        <yd-cell-item v-show="yqm5" class="yqm">
          <span slot="left">邀请码<i>*</i></span>
          <input slot="right" type="text" placeholder="请输入邀请码" v-model="invite_no">
        </yd-cell-item>
    </div>
    <footer>
      <yd-button size="large" class="button" @click.native="goYanzheng" :disabled='!(list.length!=0)'>下一步</yd-button>
    </footer>
  </div>
</template>

<script>
import $ from "jquery";
import util from "../../utils/util";
import axios from "axios";
import api from "../../api/api";

export default {
  data() {
    return {
      timestamp: "", // 必填，生成签名的时间戳
      nonceStr: "ds121221ds", // 必填，生成签名的随机串
      signature: "", // 必填，签名，见附录1
      //公共参数
      token_id: "", //201710210000013868
      usr_no: "", //000000005028
      usr_typ: "", //
      in_mercTyp: "", //权限 N 没有进件权限，Y 有权限
      show: false,
      merc_remark: "", //拒绝原因
      invite_no: "", //邀请码
      terminl_num: "", //终端数量
      jflag: "1", //1 进件  2进件修改
      merc_id: "", //商户号 进件修改才传进来
      list: [],
      ME50_sdk:"",
      yqm5: true, //台牌邀请码显示
      menum5: false //ME50数量隐藏

    };
  },
  created() {
    let _this = this;
    document.title = "终端开户";
    var url = location.search;
    //alert(url);
    //获取公共参数
    if (util.sesstionData("PublicParams") != false) {
      var paramsObj = util.sesstionData("PublicParams");
      _this.token_id = paramsObj.token_id;
      _this.usr_no = paramsObj.usr_no;
      _this.usr_typ = paramsObj.usr_typ;
      _this.in_mercTyp = paramsObj.in_mercTyp;
    } else {
      this.token_id = util.getUrlParams("token_id");
      this.usr_no = util.getUrlParams("usr_no");
      this.usr_typ = util.getUrlParams("usr_typ");
      //将从url里获取的参数存储到sesstion里面
      let obj = {};
      obj.token_id = this.token_id;
      obj.usr_no = this.usr_no;
      obj.usr_typ = this.usr_typ;
      obj.menum5 = this.menum5; //存me50
      sessionStorage.setItem("PublicParams", JSON.stringify(obj));
    }
    //从修改页面获取到的信息  有此代表是修改
    if (util.sesstionData("UpdateParams") != false) {
      var obj = util.sesstionData("UpdateParams");
      _this.jflag = "2";
      _this.show = true;
      _this.merc_id = obj.merc_id;
      _this.merc_remark = obj.merc_remark;
      _this.invite_no = obj.invite_no;
      //_this.list = obj.sn_no.split(",");
      if(obj.sn_no){ //台牌有设备列表
        _this.list = obj.sn_no.split(",");
      }
      if(obj.ME50_sdk){ //ME50_sdk Y
        _this.ME50_sdk = obj.ME50_sdk;
      }
      
    }

    this.$nextTick(function(){
        if(_this.ME50_sdk == "Y"){
          $(".shebei").val("50");
          _this.$dialog.toast({ mes: `请扫ME50同一类型设备进件`,timeout: 2000 });
        }else if(_this.ME50_sdk == "N"){
          $(".shebei").val("1");
        }else{
          $(".shebei").val("0");
        }
    });

    _this.lody();
  },
  mounted() {
  },
  methods: {
    lody() {
      let _this = this;
      // 必填，生成签名的时间戳
      _this.timestamp = Date.parse(new Date()) / 100;
      //_this.timestamp ='15172967190'
      //alert(`时间戳为${_this.timestamp}`);
      console.log(`时间戳为${_this.timestamp}`);

      let data = {
        // requrl: "http://bystages-test.starpos.com.cn/add/saoma",
        requrl: encodeURIComponent(location.href.split("#")[0]),
        token_id: _this.token_id,
        timestamp: _this.timestamp,
        nonceStr: _this.nonceStr,
        usr_no: _this.usr_no
      };
      console.log(data);
      axios({
        method: "post",
        url: `${api.api}addSignature.json`,
        data: data
      })
        .then(res => {
          console.log(res);

          _this.signature = res.data.signature;
          // alert("获取到了签名" + _this.signature);
          console.log("获取到了签名" + _this.signature);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: `${api.appId}`, // 必填，公众号的唯一标识
            timestamp: _this.timestamp, // 必填，生成签名的时间戳
            nonceStr: _this.nonceStr, // 必填，生成签名的随机串
            signature: _this.signature, // 必填，签名，见附录1
            jsApiList: ["scanQRCode","chooseImage", "getLocalImgData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.error(function(res) {
            window.location.href =
              window.location.href.split("#")[0].split("?")[0] +
              "?id=" +
              10000 * Math.random();
            //alert("出错了：" + res.errMsg)
            //window.location.href=window.location.href+"?id="+10000*Math.random();
            //alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          });
          // wx.ready(function() {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          // wx.scanQRCode({
          //   needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          //   scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          //   success: function(res) {
          //     var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          //     alert(res);
          //   }
          // });
          // });
        })
        .catch(err => {
          console.log(err);
        });
    },
    remove(index) {
      this.list.splice(index, 1);
      if(this.list.length <= 0){
          if (util.sesstionData("UpdateParams") != false) {
              var obj = util.sesstionData("UpdateParams");
              if(obj.ME50_sdk){ //ME50_sdk Y
                  _this.ME50_sdk = obj.ME50_sdk;
                  if(_this.ME50_sdk == "Y"){
                      $(".shebei").val("50");
                  }else{
                      $(".shebei").val("0");
                  }
              }

          }else{
              $(".shebei").val("0"); //设备初始化
          }

      }
    },
    saoma() {
      //alert($(".shebei").val());
      let _this = this;
      if (this.in_mercTyp == "N") {
        this.$dialog.toast({ mes: "该账号无进件权限", timeout: 2000 });
      } else {
        wx.ready(function() {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
              //alert(JSON.stringify(res));
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              var sn = result.split("sn_no=")[1]; //台牌参数
              //alert(sn);
              var shebei = $(".shebei").val();
              //ME50
              if(result.indexOf("sn_no=NL")>=0){              
                if(shebei=="0" || shebei=="50"){
                  _this.yqm5 = true; //ME50用邀请码
                  _this.ME50_sdk = "Y";
                  //input设备赋值
                  $(".shebei").val("50"); //ME50

                  //_this.checkSN(sn); ME50不用验证sn设备号，要验邀请码
                  _this.checkME(sn);

                  //_this.$dialog.toast({ mes: `扫码成功`,timeout: 2000 });

                  // if (_this.list.length>=1 && result.indexOf("sn_no=N")<0) {
                  //   //_this.$dialog.toast({ mes: `不用重复扫码`,timeout: 2000 });
                  // }else{
                  //   _this.list.push("ME50已扫码成功，请点击下一步");
                  // }
                
                }else{
                  _this.$dialog.toast({ mes: `请扫同一类型设备进件`,timeout: 2000 });
                }
                //alert(shebei);
              }else if(result.indexOf("sn_no=SP")>=0){
                if(shebei=="0" || shebei=="1"){
                  _this.yqm5 = true;
                  _this.ME50_sdk = "N";
                  $(".shebei").val("1"); //台牌1
                  _this.checkSN(sn);
                }else{
                  _this.$dialog.toast({ mes: `请扫同一类型设备进件`,timeout: 2000 });
                }
                //alert(shebei);
              }else{
                _this.$dialog.toast({ mes: `设备不匹配`,timeout: 2000 });
              }
              

            }
          });
        });
      }
    },
    checkME(sn) {
      let _this = this;
      for (let i = 0; i < _this.list.length; i++) {
        if (sn == _this.list[i]) {
          _that.$dialog.toast({
            mes: `不用重复扫码`,
            timeout: 2000,
            callback: () => {
              return false;
            }
          });
        }
      }
      _this.list.push(sn); //添加设备ME50
    },
    checkSN(sn) {
      let _this = this;
      for (let i = 0; i < _this.list.length; i++) {
        if (sn == _this.list[i]) {
          _that.$dialog.toast({
            mes: `不可以重复扫码`,
            timeout: 2000,
            callback: () => {
              return false;
            }
          });
        }
      }
      let data = {
        sn_no: sn,
        jflag: this.jflag,
        merc_id: this.merc_id,
        usr_no: _this.usr_no,
        token_id: _this.token_id
      };
      axios({
        method: "post",
        url: `${api.api}checkSn.json`,
        data: data
      })
        .then(res => {
          console.log(res);
          //alert(JSON.stringify(res.data));
          if (res.data.repCode == "000000") {
            switch (res.data.trm_sts) {
              case "1":
                _that.$dialog.toast({
                  mes: `该二维码已绑定商户，请直接关联。`,
                  timeout: 2000
                });
                break;
              case "0":
                _this.list.push(sn); //添加设备
                break;
              default:
                break;
            }
          } else {
            _this.$dialog.toast({
              mes: `验证sn号失败,${res.data.repMsg}`,
              timeout: 2000
            });
          }
        })
        .catch(err => {
          console.log(err);
          _this.$dialog.toast({
            mes: `验证sn号失败，请重试`,
            timeout: 2000
          });
        });
    },
    goYanzheng() {
      let _this = this;
      var sn_no = _this.list.join(",");
      let data = {
        sn_no: sn_no,
        invite_no: this.invite_no,
        jflag: this.jflag,
        merc_id: this.merc_id,
        usr_no: _this.usr_no,
        token_id: _this.token_id,
        ME50_sdk:_this.ME50_sdk
      };
      
      console.log(data);
//alert(shebei);//台牌

      axios({
        method: "post",
        url: `${api.api}qrySnSts.json`,
        data: data
      })
        .then(res => {
          console.log(res);
          let obj = {};
          //alert(JSON.stringify(res.data));
          if (res.data.repCode == "000000") {
            if (util.sesstionData("formObj") != false) {
              obj = util.sesstionData("formObj");
            }
            var shebei = $(".shebei").val();

            obj.sn_no = _this.list.join(",");
            //alert(_this.list.join(","))

            obj.terminl_num = _this.list.length;
            obj.invite_no = _this.invite_no;

            if(shebei == 1){ //台牌
              obj.ME50_sdk = "N";
              obj.terminl_num = _this.list.length;
              sessionStorage.setItem("formObj", JSON.stringify(obj));
            this.$router.push({ name: "yanzheng" });
            }else if(shebei == 50){ //ME50
              obj.ME50_sdk = "Y";
              obj.ME50_num = _this.list.length;
              sessionStorage.setItem("formObj", JSON.stringify(obj));
            this.$router.push({ name: "newyanzheng" });
            }
            
          } else {
            _this.$dialog.toast({
              mes: `验证失败,${res.data.repMsg}`,
              timeout: 2000
            });
          }
        })
        .catch(err => {
          console.log(err);
          _this.$dialog.toast({
            mes: `验证失败，请重试`,
            timeout: 2000
          });
        });

        //axios end
      // }else if(shebei == "50"){
      //   let obj = {};
      //   obj.menum5 = true;
      //   sessionStorage.setItem("formObj", JSON.stringify(obj));
      //   this.$router.push({ name: "yanzheng" });
      // }
    }
  }
};
</script>

<style scoped>
.yd-cell-item {
    width: 9.2rem;
    border-top: 0px dashed #e9e9e9;
}
.yqm {
      margin: .3rem auto;
      border-radius: 4px;
      background: #FFFFFF;
      padding: 0 .3rem;
      padding-right: .6rem;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
      }
.yqm span i {color:#f00;}
.shebei_block li:last-child {
      border-bottom:0px;
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
</style>
