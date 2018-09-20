<template>
  <div class="yanzheng">
    <header>
    </header>
    <div class="main">	
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">身份证号<i>*</i></span>
          <yd-input ref="input1" slot="right" v-model="icrp_id_no" regex="/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/" placeholder="请输入身份证号码"></yd-input> 
        </yd-cell-item>
        <yd-cell-item arrow class="sfz">
          <span slot="left">身份证有效期<i>*</i></span>
          <yd-datetime :start-date="current" end-date="2099-12-31" v-model="crp_exp_dt_tmp"  type="date" slot="right" :init-emit='false'></yd-datetime>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">结算账号<i>*</i></span>
          <yd-input ref="input2" slot="right" v-model="stl_oac" regex="/^\d{16,21}$/" placeholder="请输入结算账号"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">账户户名<i>*</i></span>
          <yd-input ref="input3" slot="right" v-model="bnk_acnm" regex="^(?![0-9]*$)[\u4e00-\u9fa5a-zA-Z0-9_]{2,10}$" placeholder="请输入账户户名"></yd-input>
        </yd-cell-item>
        
        <yd-cell-item arrow @click.native="showpick">
          <span slot="left">开户支行<i>*</i></span>
          <span slot="right">{{lev3}}</span>
          <!-- <span slot="right">{{lev1}}{{lev2}}{{lev3}}</span> -->
        </yd-cell-item>
      </yd-cell-group>
      
      <div class="title">银行卡上传（至少上传1张，最多2张）<i>*</i></div>
      <uploader :srcUrl="`http://sandbox.starpos.com.cn/estmadp1/uploadPic`" :max="2" :flg='9' :type='[6,7]' ref="uploader1"></uploader>

      <div class="title" v-if="ME50_sdk=='Y'">结算人身份证件正反面上传（至少1张，最多2张）<i>*</i></div>
      <uploader :srcUrl="`http://sandbox.starpos.com.cn/estmadp1/uploadPic`" :max="2" :flg='5' :type='[4,5]' v-if="ME50_sdk=='Y'" ref="uploader5"></uploader>

      <div class="title" v-if="ME50_sdk=='Y'">结算人手持身份证，结算人与门店合照（至少1张，最多2张）<i>*</i></div>
      <div class="title" v-else>结算人身份证、手持身份证（至少1张，最多2张）<i>*</i></div>

      <uploader v-if="ME50_sdk=='Y'" :srcUrl="`http://sandbox.starpos.com.cn/estmadp1/uploadPic`" :max="2" :flg='5' :type='[8,9]' ref="uploader6"></uploader>
      <uploader v-else :srcUrl="`http://sandbox.starpos.com.cn/estmadp1/uploadPic`" :max="2" :flg='5' :type='[4,5]' ref="uploader2"></uploader>
    
    </div>
    <footer>
        <yd-button size="large" class="button" @click.native='submit'>验证</yd-button>
    </footer>
      <yd-actionsheet :items="myItems1" :v-model=false ref='actionsheet'></yd-actionsheet>
      <yd-popup v-model="show1" position="center" width="80%" :close-on-masker='false'>
          <div class="yz-pop">
            <p class="yz-tit">提示</p>
            <p style="text-align:left;">结算账号不可查，需要T+1日审核。<br/>点击“取消”返回上一步，点击“下一步”继续录入。</p>
            <div style="text-align:center;">
              <yd-button @click.native="show1 = false" type="hollow">取消</yd-button>
              <yd-button @click.native="show1 = false;goSubmit()" type="hollow" style="color:#fff;border:0;">下一步</yd-button>                 
            </div>
          </div>
      </yd-popup>
        
      <mu-bottom-sheet :open="show2">
        <div class="scroll-controls">
					<span class="scroll-cancel" @click="show2=false;step=1">取消</span>
					<span class="scroll-Middle">(部分地区暂未开放)</span>
					<span class="scroll-submit" @click="changediqu">确认</span>
				</div>
				<div class="demo-picker-container">
          <mu-picker :slots="addressSlots" :visible-item-count="5" @change="addressChange" />
        </div>
			</mu-bottom-sheet>       
  </div>
</template>

<script>
import uploader from "../../components/uploader3";
import axios from "axios";
import util from "../../utils/util";
import api from "../../api/api";
import $ from "jquery";
export default {
  data() {
    return {
      isUpdate: false, //此为修改标识
      current: "2027-11-11", //当前时间
      icrp_id_no: "", //身份证号 input1
      crp_exp_dt_tmp: "", //身份证号有效期
      stl_oac: "", //结算账户 input2
      bnk_acnm: "", //账户户名 input3
      wc_lbnk_no: "", //开户行 input4
      //公共参数
      token_id: "", //201710210000013868
      usr_no: "", //000000005028
      code1: "",
      code2: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      show1: false,
      show2: false,
      //一级菜单数据
      myItems1: [],
      lev1: "",
      //二级菜单数据
      myItems2: [],
      lev2: "",
      lbnk_cd_nm: "渤海银行",
      //三级菜单数据
      myItems3: [],
      lev3: "",
      opn_bnk_city: "", //城市代码
      //银行详细列表
      myItems4: [],
      //照片部分
      door_img: "", //	门头照 1
      foy_img: "", //	场景照 2
      choc_img: "", //	收银台照 3
      merc_bankcode_img: "", //	结算人身份证 4
      mer_con1_img: "", //ME50其他1 手持身份证
      mer_con2_img: "", //ME50其他2 人门合照
      hold_img: "", //	结算人手持身份证 5，ME50身份证反面5
      met_img: "", //	银行卡照 6
      merc_openbank_img: "", //,	开户行许可证照 7
      //sfz_img:"", //身份证正反面merc_bankcode_img
      arr: [],
      addressSlots: [
        {
          width: "100%",
          textAlign: "center",
          //values: Object.keys(address),
          values: {}
        },
        {
          width: "100%",
          textAlign: "center",
          values: []
        },
        {
          width: "100%",
          textAlign: "center",
          values: []
        }
      ],
      //address: ["", "", ""],
      province: "", //省
      city: "", //市
      region: "", //区县

      aaa: {
        // 北京: [
        //   {
        //     北京: ["东城区", "西城区", "崇文区"]
        //   }
        // ],
        // 上海: [
        //   {
        //     上海: ["黄浦区", "卢湾区"]
        //   }
        // ]
      }, //存地区
      bbb: {}, //存银行
      step: 1,
      snum: true,
      ME50_sdk:"" //ME50显示Y 身份证
    };
  },
  created() {
    document.title = "结算信息";
    let _this = this;
    _this.current = util.timeTrans(new Date(), "t4");

//alert(location.search);

    console.log("formObj:"+util.sesstionData("formObj"));
    // let obj = {};
    // if (util.sesstionData("formObj") != false) {
    //   obj = util.sesstionData("formObj");
    //   //清空照片
    //   obj.met_img = "";
    //   obj.foy_img = "";
    //   obj.choc_img = "";
    //   obj.merc_bankcode_img = "";
    //   obj.hold_img = "";
    //   obj.met_img = "";
    //   obj.merc_openbank_img = "";
    //   sessionStorage.setItem("formObj", JSON.stringify(obj));
    // }
        //获取表单参数
    if (util.sesstionData("formObj") != false) {
      var formObj = util.sesstionData("formObj");
      _this.ME50_sdk = formObj.ME50_sdk; //ME50身份证显示Y
    }
    //获取公共参数
    if (util.sesstionData("PublicParams") != false) {
      var paramsObj = util.sesstionData("PublicParams");
      this.token_id = paramsObj.token_id;
      this.usr_no = paramsObj.usr_no;
    }
    //判断是否为修改状态  是就获取数据
    if (util.sesstionData("UpdateParams") != false) {
      _this.isUpdate = true;
      var objData = util.sesstionData("UpdateParams");
      _this.icrp_id_no = objData.icrp_id_no;
      var arr = objData.crp_exp_dt_tmp.split("");
      arr.splice(4, 0, "-");
      arr.splice(7, 0, "-");
      _this.crp_exp_dt_tmp = arr.join("");
      _this.stl_oac = objData.stl_oac;
      _this.bnk_acnm = objData.bnk_acnm;
      _this.lev3 = objData.lbnk_nm;
      _this.wc_lbnk_no = objData.wc_lbnk_no;
      //将修改表单中的图片数据存入formObj
      var formObj = {};
      if (util.sesstionData("formObj") != false) {
        formObj = util.sesstionData("formObj");
      }
      formObj.met_img = objData.met_img;
      formObj.merc_openbank_img = objData.merc_openbank_img;
      formObj.merc_bankcode_img = objData.merc_bankcode_img;
      formObj.mer_con1_img = objData.mer_con1_img;
      formObj.mer_con2_img = objData.mer_con2_img;
      formObj.hold_img = objData.hold_img;
      //formObj.sfz_img = objData.sfz_img;
      sessionStorage.setItem("formObj", JSON.stringify(formObj));
    }
    //判断是否为页面跳转  是就获取数据
    if (util.sesstionData("jumpDataA") != false) {
      var objData = util.sesstionData("jumpDataA");

      _this.icrp_id_no = objData.icrp_id_no;
      _this.stl_oac = objData.stl_oac;
      _this.bnk_acnm = objData.bnk_acnm;
      _this.crp_exp_dt_tmp = objData.crp_exp_dt_tmp;
      _this.wc_lbnk_no = objData.wc_lbnk_no;
      _this.lev3 = objData.lev3;
      //_this.mailbox = objData.mailbox;
      //图片
      // _this.met_img = objData.met_img;
      // _this.merc_openbank_img = objData.merc_openbank_img;
      // _this.merc_bankcode_img = objData.merc_bankcode_img;
      // _this.hold_img = objData.hold_img;
    }
    //加载一级开户行
    var data = {
      token_id: this.token_id,
      opSys: "2",
      usr_no: this.usr_no
    };
    axios({
      method: "post",
      //url: `${api.api}mercQryBanknm.json`,
      url: `${api.api}mercQryOpnBnkProv.json`,
      data: data
    })
      .then(res => {
        console.log(res);
        console.log(res.data.REC);
        this.myItems1 = [];
        for (let i = 0; i < res.data.REC.length; i++) {
          this.myItems1.push({
            label: res.data.REC[i].prov_nm,
            opn_bnk_prov: res.data.REC[i].opn_bnk_prov,
            stay: true /* 不关闭 */,
            callback: res => {
              _this.load2levels(res);
            }
          });
          //console.log(res.data.REC[i].prov_nm);
          _this.aaa[res.data.REC[i].prov_nm] = [];
          // _this.addressSlots[0].values = Object.keys(_this.aaa);
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.load3levels();
  },
  mounted() {
    if (this.isUpdate || util.sesstionData("jumpDataA") != false) {
      var objData = {};
      this.isUpdate && (objData = util.sesstionData("UpdateParams"));
      util.sesstionData("jumpDataA") != false &&
        (objData = util.sesstionData("jumpDataA"));
      console.log(objData);
      //银行卡
      var list1 = [];
      objData.met_img != null &&
        objData.met_img != "" &&
        list1.push({
          srcUrl: `${api.imgApi}stmapp/${objData.met_img}`
        });
      objData.merc_openbank_img != null &&
        objData.merc_openbank_img != "" &&
        list1.push({
          srcUrl: `${api.imgApi}stmapp/${
            objData.merc_openbank_img
          }`
        });
      this.$refs.uploader1.files = list1;
      console.log(list1);

      //ME50身份证正反面
      var list3 = [];
      objData.merc_bankcode_img != null &&
        objData.merc_bankcode_img != "" &&
        list3.push({
          srcUrl: `${api.imgApi}stmapp/${objData.merc_bankcode_img}`
        });
      objData.hold_img != null &&
        objData.hold_img != "" &&
        list3.push({
          srcUrl: `${api.imgApi}stmapp/${objData.hold_img}`
        });
      this.$refs.uploader5.files = list3;
      console.log(list3);
      //ME50手持 人门店
      var list4 = [];
      objData.mer_con1_img != null &&
        objData.mer_con1_img != "" &&
        list4.push({
          srcUrl: `${api.imgApi}stmapp/${objData.mer_con1_img}`
        });
      objData.mer_con2_img != null &&
        objData.mer_con2_img != "" &&
        list4.push({
          srcUrl: `${api.imgApi}stmapp/${objData.mer_con2_img}`
        });
      this.$refs.uploader6.files = list4;
      console.log(list4);

      //台牌结算人身份证和手持4,5
      var list2 = [];
      objData.merc_bankcode_img != null &&
        objData.merc_bankcode_img != "" &&
        list2.push({
          srcUrl: `${api.imgApi}stmapp/${
            objData.merc_bankcode_img
          }`
        });
      objData.hold_img != null &&
        objData.hold_img != "" &&
        list2.push({
          srcUrl: `${api.imgApi}stmapp/${objData.hold_img}`
        });
      this.$refs.uploader2.files = list2;
      console.log(list2);

    }
    $(document).ready(function() {
      $("yd-mask").on("touchmove", function(event) {
        console.log("1221");
        event.stopPropagation(); //不会打印1，但是页面会跳转；
      });
    });

    //this.$refs.uploader2.files=[{srcUrl:'${api.imgApi}data/merc/201801/25/20180125000003083092/1516859394000.jpg'},{srcUrl:'${api.imgApi}data/merc/201801/25/20180125000003083092/1516859394000.jpg'}]
  },
  methods: {
    load2levels(t) {
      console.log(t);
      //alert("加载二级");
      let _this = this;
      _this.lev1 = `${t.label}/`;
      // let data = {
      //   token_id: this.token_id,
      //   opSys: "2",
      //   usr_no: this.usr_no,
      //   opn_bnk_prov: t.opn_bnk_prov
      // };
      let data = {
        token_id: this.token_id,
        opSys: "2",
        usr_no: this.usr_no,
        opn_bnk_prov: t
      };
      console.log(data);
      axios({
        method: "post",
        url: `${api.api}mercQryOpnBnkCity.json`,
        data: data
      })
        .then(res => {
          console.log(res);
          console.log(res.data.REC);
          let err = [];
          this.myItems2 = [];
          for (let i = 0; i < res.data.REC.length; i++) {
            this.myItems2.push({
              label: res.data.REC[i].city_nm,
              opn_bnk_city: res.data.REC[i].opn_bnk_city,
              stay: true /* 不关闭 */,
              callback: res => {
                _this.load3levels(res);
              }
            });

            err.push(res.data.REC[i].city_nm);

            _this.addressSlots[1].values = err;
          }
          //_this.$refs.actionsheet.items = _this.myItems2;
          _this.opn_bnk_city = _this.myItems2[0].label;
        })
        .catch(err => {
          console.log(err);
          this.errMassage(this);
        });
    },
    load3levels(t) {
      let _this = this;
      // this.lev2 = `${t.label}/`;
      // this.opn_bnk_city = t.label;
      var data = {
        token_id: this.token_id,
        opSys: "2",
        usr_no: this.usr_no
      };
      axios({
        method: "post",
        url: `${api.api}mercQryBanknm.json`,
        data: data
      })
        .then(res => {
          console.log(res);
          console.log(res.data.REC);
          this.myItems3 = [];
          for (let i = 0; i < res.data.REC.length; i++) {
            this.myItems3.push({
              label: res.data.REC[i].lbnk_cd_nm,
              stay: true /* 不关闭 */,
              callback: res => {
                this.getType(res);
              }
            });
            _this.bbb[res.data.REC[i].lbnk_cd_nm] = [];
          }
          //this.$refs.actionsheet.items = this.myItems3;
        })
        .catch(err => {
          console.log(err);
          this.errMassage(this);
        });
    },
    getType(t) {
      let _this = this;
      //_this.lev2 = `${t.label}/`;
      if (_this.opn_bnk_city == "") {
        _this.opn_bnk_city = _this.myItems2[0].label;
      }
      let data = {
        token_id: this.token_id,
        opSys: "2",
        usr_no: this.usr_no,
        lbnk_cd_nm: _this.lbnk_cd_nm,
        opn_bnk_city: _this.opn_bnk_city
      };

      console.log(data);
      axios({
        method: "post",
        url: `${api.api}mercQryBanks.json`,
        data: data
      })
        .then(res => {
          console.log(res);
          let err = [];
          if (res.data.repCode == "000000") {
            console.log(res.data.REC);
            this.myItems4 = [];
            for (let i = 0; i < res.data.REC.length; i++) {
              this.myItems4.push({
                label: res.data.REC[i].lbnk_nm,
                wc_lbnk_no: res.data.REC[i].wc_lbnk_no,
                callback: res => {
                  console.log(res);
                  _this.lev3 = res.label;
                  _this.wc_lbnk_no = res.wc_lbnk_no;
                }
              });
              err.push(res.data.REC[i].lbnk_nm);

              _this.addressSlots[1].values = err;
            }
            _this.$refs.actionsheet.items = _this.myItems4;
          } else {
             _this.show2 = false;
          _this.step = 1;
            _this.$dialog.toast({
              mes: res.data.repMsg,
              timeout: 2000,
              callback() {
                _this.show2 = false;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.errMassage(this);
        });
    },
    //页面跳转时候保存数据
    jumpData(obj) {
      console.log(obj);
      var formObj = {};
      //当前页面表单数据
      formObj.icrp_id_no = this.icrp_id_no; //身份证号
      formObj.stl_oac = this.stl_oac;
      formObj.bnk_acnm = this.bnk_acnm;
      formObj.crp_exp_dt_tmp = this.crp_exp_dt_tmp;
      formObj.wc_lbnk_no = this.wc_lbnk_no;
      formObj.lev3 = this.lev3;

      //图片
      formObj.met_img = obj.met_img;
      formObj.merc_openbank_img = obj.merc_openbank_img;
      formObj.merc_bankcode_img = obj.merc_bankcode_img;
      formObj.mer_con1_img = obj.mer_con1_img; //ME50其他1 手持
      formObj.mer_con2_img = obj.mer_con2_img; //ME50其他 合照
      formObj.hold_img = obj.hold_img; //手持，ME50身份证反面

      //formObj.sfz_img = obj.sfz_img; //merc_bankcode_img
      sessionStorage.setItem("jumpDataA", JSON.stringify(formObj));
    },
    check() {
      let _this = this;
      if (this.$refs.input1.valid && this.icrp_id_no != "") {
      } else {
        this.$dialog.toast({ mes: "请输入正确的身份证号信息", timeout: 2000 });
        return false;
      }
      if (this.crp_exp_dt_tmp == "") {
        this.$dialog.toast({ mes: "请选择身份证有效期", timeout: 2000 });
        return false;
      }
      if (this.crp_exp_dt_tmp == this.current) {
        this.$dialog.toast({ mes: "身份证有效期必须大于今天", timeout: 2000 });
        return false;
      }
      if (this.$refs.input2.valid && this.stl_oac != "") {
      } else {
        this.$dialog.toast({ mes: "请输入正确的结算账户信息", timeout: 2000 });
        return false;
      }
      if (this.$refs.input3.valid && this.bnk_acnm != "") {
        var re1 = /^\d+$/; //纯数字
        var re2 = /^[a-z]+$/; //纯字母
        if (re1.test(this.bnk_acnm)) {
          this.$dialog.toast({ mes: "账号户名不可为纯数字", timeout: 2000 });
          return false;
        }
        if (re2.test(this.bnk_acnm)) {
          this.$dialog.toast({ mes: "账号户名不可为纯字母", timeout: 2000 });
          return false;
        }
      } else {
        this.$dialog.toast({
          mes: "请正确输入账户户名",
          timeout: 2000
        });
        return false;
      }

      // if (this.$refs.input4.valid && this.wc_lbnk_no == "") {
      //   this.$dialog.toast({ mes: "请输入正确的开户行信息", timeout: 2000 });
      //   return false;
      // }
      if (this.wc_lbnk_no == "" || this.lev3 == "") {
        this.$dialog.toast({ mes: "请选择开户行信息", timeout: 2000 });
        return false;
      }
      var obj = util.sesstionData("formObj");

      if (
        (obj.met_img == "" || obj.met_img == undefined) &&
        (obj.merc_openbank_img == "" || obj.merc_openbank_img == undefined)
      ) {
        this.$dialog.toast({ mes: "请上传银行卡相关照片", timeout: 2000 });
        return false;
      }

      if(_this.ME50_sdk == "Y"){ //ME50
        if ((obj.merc_bankcode_img == "" || obj.merc_bankcode_img == undefined) && (obj.hold_img == "" || obj.hold_img == undefined)) {
          this.$dialog.toast({ mes: "请上传身份证正反面照片", timeout: 2000 });
          return false;
        }      
        if ((obj.mer_con1_img == "" || obj.mer_con1_img == undefined) && (obj.mer_con2_img == "" || obj.mer_con2_img == undefined)) {
            this.$dialog.toast({ mes: "请上传结算人相关照片", timeout: 2000 });
            return false;
        }
      }else if(_this.ME50_sdk == "N"){ //台牌验证
        if (
          (obj.merc_bankcode_img == "" || obj.merc_bankcode_img == undefined) &&
          (obj.hold_img == "" || obj.hold_img == undefined)          
        ) {
            this.$dialog.toast({ mes: "请上传结算人相关照片", timeout: 2000 });
            return false;
          }
      }

    },
    submit() {
      let _this = this;

      //存储数据
      if (_this.check() != false) {
        _this.$dialog.loading.open("正在验证...");
        let obj = {};
        if (util.sesstionData("formObj") != false) {
          obj = util.sesstionData("formObj");
        }

        obj.icrp_id_no = _this.icrp_id_no;
        obj.crp_exp_dt_tmp = _this.crp_exp_dt_tmp;
        obj.stl_oac = _this.stl_oac;
        obj.bnk_acnm = _this.bnk_acnm;
        obj.wc_lbnk_no = _this.wc_lbnk_no;
        obj.lev3 = _this.lev3;
        sessionStorage.setItem("formObj", JSON.stringify(obj));

        console.log(this.$refs.uploader);
        if (this.check() == false) {
        } else {
          let _this = this;
          let data = {
            token_id: this.token_id,
            opSys: "2",
            usr_no: this.usr_no,
            icrp_id_no: _this.icrp_id_no,
            stl_oac: _this.stl_oac,
            bnk_acnm: _this.bnk_acnm
          };
          console.log(data);
          axios({
            method: "post",
            url: `${api.api}thrInfoChk.json`,
            data: data

            // headers: {
            //   "Content-type": "application/json;charset=GBK"
            // }
          })
            .then(res => {
              _this.$dialog.loading.close();
              console.log(res);
              switch (res.data.repCode) {
                case "000000":
                  switch (res.data.resultCode) {
                    case "0000":
                      _this.jumpData(obj);
                      _this.$router.push({ name: "tijiao" });
                      break;
                    case "0001":
                      _this.$dialog.toast({
                        mes: `${res.data.resultMsg}`,
                        timeout: 2000
                      });
                      break;
                    case "0002":
                      _this.jumpData(obj);
                      _this.show1 = true;
                      break;

                    default:
                      break;
                  }
                  break;

                default:
                  this.$dialog.toast({
                    mes: `${res.data.repMsg}`,
                    timeout: 2000
                  });
                  break;
              }
            })
            .catch(err => {
              _this.$dialog.loading.close();
              this.$dialog.toast({
                mes: `验证失败,请重试`,
                timeout: 2000
              });
            });
        }
      }
    },
    goSubmit() {
      this.$router.push({ name: "tijiao" });
    },
    errMassage(that) {
      that.$dialog.toast({
        mes: `选择失败,请重试！`,
        timeout: 2000,
        callback() {
          that.show2 = false;
          that.step = 1;
        }
      });
    },
    addressChange(value, index) {
      switch (index) {
        case 0:
          this.check1(value);
          //this.check2(this.city);
          break;
        case 1:
          this.check2(value);
          break;
        case 2:
          this.lbnk_cd_nm = value;
          break;
      }
      // this.address = [this.province, this.city, this.region];
      //this.deadlineTime = `${this.province}  ${this.city}  ${this.region}`;
    },
    check1(value) {
      let _this = this;
      //console.log(value);
      for (let i = 0; i < this.myItems1.length; i++) {
        if (value == this.myItems1[i].label) {
          //alert(this.myItems1[i].opn_bnk_prov);
          _this.load2levels(_this.myItems1[i].opn_bnk_prov);
        }
      }

      //_this.province = value;
      _this.arr = _this.aaa[value];

      // const err = [];
      // for (let i = 0; i < _this.arr.length; i++) {
      //   for (var key in _this.arr[i]) {
      //     if (_this.arr[i].hasOwnProperty(key)) {
      //       err.push(key);
      //     }
      //   }
      // }
      // _this.addressSlots[1].values = err;
      // console.log(_this.arr[0]);
      // //_this.city = _this.arr[0][value][0];
      // for (var key in _this.arr[0]) {
      //   if (_this.arr[0].hasOwnProperty(key)) {
      //     _this.city = key;
      //     break;
      //     console.log(_this.city);
      //   }
      // }
    },
    check2(value) {
      var _this = this;
      switch (this.step) {
        case 1:
          console.log(this.myItems1);
          this.opn_bnk_city = value;
          //alert(value);
          // for (let i = 0; i < this.myItems2.length; i++) {
          //   if (value == this.myItems2[i].label) {
          //     alert(value);
          //     console.log(this.myItems2[i].label);

          //     this.opn_bnk_city = value;

          //     //alert(this.opn_bnk_city);
          //   }
          // }

          //_this.province = value;

          break;
        case 2:
          //console.log(this.myItems3);
          for (let i = 0; i < this.myItems4.length; i++) {
            if (value == this.myItems4[i].label) {
              _this.wc_lbnk_no = this.myItems4[i].wc_lbnk_no;
              _this.lev3 = value;
              //alert(this.myItems4[i].wc_lbnk_no);
              // console.log(this.myItems2[i].opn_bnk_city);

              // this.opn_bnk_city = this.myItems2[i].opn_bnk_city;

              //alert(this.opn_bnk_city);
            }
          }
          //_this.getType();
          // for (let i = 0; i < this.myItems3.length; i++) {
          //   if (value == this.myItems3[i].label) {
          //     // alert(this.myItems3[i].label);
          //     _this.lbnk_cd_nm = _this.myItems3[i].label;
          //     // _this.load2levels(_this.myItems1[i].opn_bnk_prov);
          //     _this.getType();
          //   }
          // }

          // //_this.province = value;
          // _this.arr = _this.aaa[value];
          break;
        default:
          break;
      }
      //_this.city = value;

      //console.log(value);
      //console.log(_this.arr);
      // for (let i = 0; i < _this.arr.length; i++) {
      //   for (var key in _this.arr[i]) {
      //     if (value == key) {
      //       //console.log(_this.arr[i][value]);
      //       _this.region = _this.arr[i][value][0];

      //       _this.addressSlots[2].values = _this.arr[i][value];

      //       break;
      //     }
      //   }
      // }
      //console.log(this.myItems2);
    },
    changediqu() {
      switch (this.step) {
        case 1:
          if (this.myItems2.length == 0) {
            this.$dialog.toast({
              mes: `请选择地区`,
              timeout: 2000,
            });
          } else {
            this.step = 2;
            this.addressSlots[0].values = {};
            this.addressSlots[0].width = "0%";
            this.addressSlots[1].values = {};
            this.addressSlots[2].values = {};
            this.addressSlots[2].width = "0%";
            if (this.lbnk_cd_nm == "") {
              this.lbnk_cd_nm = "渤海银行";
            }

            this.getType();
          }
          break;
        case 2:
          //this.wc_lbnk_no = this.myItems4[0].wc_lbnk_no;
          console.log(this.addressSlots[1]);
          if (this.lev3 == "") {
            this.lev3 = this.addressSlots[1].values[0];
            this.wc_lbnk_no = this.myItems4[0].wc_lbnk_no;
          }

          this.addressSlots[1].values = {};
          this.addressSlots[0].width = "100%";
          this.addressSlots[2].width = "100%";

          this.step = 1;
          this.show2 = false;
          break;
        default:
          break;
      }
    },
    showpick() {
      //alert(this.step);
      this.lbnk_cd_nm = "";
      this.lev3 = "";
      this.show2 = true;
      this.addressSlots[0].values = Object.keys(this.aaa);
      this.addressSlots[2].values = Object.keys(this.bbb);
      this.addressSlots[1].values = {};
      this.addressSlots[0].width = "100%";
      this.addressSlots[2].width = "100%";
    }
  },

  components: {
    uploader
  }
};
</script>

<style scoped>
.scroll-picker {
  display: none;
  z-index: 999;
  background-color: #fefefe;
  border-top: 1px solid #eeeeee;
  position: absolute;
  bottom: 0px;
  width: 100%;
}
.scroll-controls {
  background-color: #fff;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.scroll-Middle {
  padding: 10px;
  color: #a5a5a5;
}
.scroll-cancel {
  /* float: left; */
  padding: 10px;
  color: #25a2f2;
}
.scroll-submit {
  /* float: right; */
  padding: 10px;
  color: #25a2f2;
}
.demo-picker-container {
  width: 100%;
  background-color: #f9f9f9;
}
.yd-cell-item span i {color:#f00;}
</style>
