<template>
  <div class="yanzheng">
    <header>
    </header>
    <div class="main">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">身份证号
            <i>*</i>
          </span>
          <yd-input ref="icrp_id_no" slot="right" v-model="icrp_id_no" regex="/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/"
            placeholder="请输入身份证号码" required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow class="sfz">
          <span slot="left">身份证有效期
            <i>*</i>
          </span>
          <yd-datetime :start-date="current" end-date="2099-12-31" v-model="crp_exp_dt_tmp" type="date" slot="right" :init-emit='false'></yd-datetime>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">结算账号
            <i>*</i>
          </span>
          <yd-input ref="stl_oac" slot="right" v-model="stl_oac" regex="/^\d{16,21}$/" placeholder="只支持储蓄卡" required :show-success-icon="false"
            :show-error-icon="false" :show-clear-icon="false"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">账户户名
            <i>*</i>
          </span>
          <yd-input ref="bnk_acnm" slot="right" v-model="bnk_acnm" regex="^(?![0-9]*$)[\u4e00-\u9fa5a-zA-Z0-9_]{2,10}$" placeholder="请输入账户户名"
            required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow @click.native="showpick1">
          <span slot="left">开户支行
            <i>*</i>
          </span>
          <span slot="right">{{lev3}}</span>
          <!-- <span slot="right">{{lev1}}{{lev2}}{{lev3}}</span> -->
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">商户名称
            <i>*</i>
          </span>
          <yd-input ref="stoe_nm" slot="right" v-model="stoe_nm" regex="^(?![0-9]*$)[\u4e00-\u9fa5a-zA-Z0-9_]{8,20}$" placeholder="请输入商户名称"
            required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">联系人
            <i>*</i>
          </span>
          <yd-input ref="stoe_cnt_nm" slot="right" v-model="stoe_cnt_nm" regex="^(?![0-9]*$)[\u4e00-\u9fa5a-zA-Z0-9_]{2,10}$" placeholder="请输入联系人"
            required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">手机号码
            <i>*</i>
          </span>
          <yd-input ref="stoe_cnt_tel" slot="right" v-model="stoe_cnt_tel" regex="/^(0|86|17951)?1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/"
            placeholder="请输入手机号码" required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow @click.native="showpick2">
          <span slot="left">商户类型
            <i>*</i>
          </span>
          <span slot="right">{{merTypeLev1}}{{merTypeLev2}}{{merTypeLev3}}</span>
        </yd-cell-item>

        <yd-cell-item arrow @click.native="showpick3">
          <span slot="left">商户地址
            <i>*</i>
          </span>
          <span slot="right">{{merLev1}}{{merLev2}}{{merLev3}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <yd-input ref="stoe_adds" slot="right" v-model="stoe_adds" placeholder="详细地址" regex="^(?![0-9]*$)[\u4e00-\u9fa5a-zA-Z0-9_]{4,30}$"
            required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <!-- <div class="title">银行卡上传
         <i>*</i>
      </div>
      <uploader :srcUrl="imgApi" :max="2" :flg='6' :type='[6,7]' ref="uploader1"></uploader>

      <div class="title">证件上传
         <i>*</i>
      </div>
      <uploaderTwo :srcUrl="imgApi" :max="2" :flg='5' :type='[5,4]' ref="uploader5"></uploaderTwo>-->
    </div> 
    <p class="bott">
      <yd-checkbox v-model="checkbox" color="#419BF9" size="15" shape="circle">确认已阅读并同意签订</yd-checkbox>
      <a href="javascript:void(0)" @click="jump">《星POS扫码支付商户注册服务协议》</a>
    </p>
    <footer>
      <yd-button size="large" class="button" @click.native='submit' :disabled='!checkbox'>验证</yd-button>
    </footer>
    <yd-actionsheet :items="myItems1" :v-model=false ref='actionsheet'></yd-actionsheet>
    <yd-popup class="dialog-t-1" v-model="show1" position="center" width="80%" :close-on-masker='false'>
      <div class="yz-pop">
        <p class="yz-tit">提示</p>
        <p style="text-align:left;">结算账号不可查，需要T+1日审核。
          <br/>点击“取消”返回上一步，点击“下一步”继续录入。</p>
        <div style="text-align:center;">
          <yd-button @click.native="show1 = false" type="hollow">取消</yd-button>
          <yd-button @click.native="show1 = false;checkMerc()" type="hollow" style="color:#fff;border:0;">下一步</yd-button>
        </div>
      </div>
    </yd-popup>

    <mu-bottom-sheet :open="show_sheet1">
      <div class="scroll-controls">
        <span class="scroll-cancel" @click="show_sheet1=false;step=1">取消</span>
        <span class="scroll-Middle">(部分地区暂未开放)</span>
        <span class="scroll-submit" @click="changediqu1">确认</span>
      </div>
      <div class="demo-picker-container">
        <mu-picker :slots="addressSlots1" :visible-item-count="5" @change="addressChange1" />
      </div>
    </mu-bottom-sheet>
    <yd-actionsheet :items="merTypeItems1" :v-model="false"></yd-actionsheet>
    <mu-bottom-sheet :open="show_sheet2">
      <div class="scroll-controls">
        <span class="scroll-cancel" @click="show_sheet2=false;merTypeLev1='';merTypeLev2='';merTypeLev3='';">取消</span>
        <span class="scroll-Middle"></span>
        <span class="scroll-submit" @click="changediqu2">确认</span>
      </div>
      <div class="demo-picker-container">
        <mu-picker :slots="addressSlots2" :visible-item-count="5" @change="addressChange2" />
      </div>
    </mu-bottom-sheet>
    <yd-actionsheet :items="merItems1" :v-model="false"></yd-actionsheet>
    <mu-bottom-sheet :open="show_sheet3">
      <div class="scroll-controls">
        <span class="scroll-cancel" @click="show_sheet3=false;merLev1='';merLev2='';merLev3='';">取消</span>
        <span class="scroll-Middle"></span>
        <span class="scroll-submit" @click="changediqu3">确认</span>
      </div>
      <div class="demo-picker-container">
        <mu-picker :slots="addressSlots3" :visible-item-count="5" @change="addressChange3" />
      </div>
    </mu-bottom-sheet>

    <yd-popup class="verification-code" v-model="show" position="center" width="75%" :close-on-masker='false'>
      <div style="background-color:#f8f8f8;border-radius: 12px;padding:10px;">
        <!-- 正在发送验证码{{phoneNumBefor}}****{{phoneNumAfter}} -->
        <p>正在发送验证码{{anXinSignMobilePhone}}</p>
        <p> 即将为您签署电子合同协议</p>
        <p>请输入短信验证码确认</p>
        <yd-cell-item>
          <input type="text" slot="right" placeholder="请输入手机验证码" v-model="checkCode">
          <span slot="right" class="yzmbox">
            <!-- <p v-if="codeOk==true" @click="anxinqian('3')">验证码</p> -->
            <p v-if="codeOk==true" @click="anxinqian('3')">验证码</p>
            <p class="yzmStyle" v-else>&nbsp;&nbsp;{{code_s}}秒&nbsp;&nbsp;</p>
          </span>
        </yd-cell-item>
        <p class="errStyle" v-show="false">
          验证码错误请重新填写
        </p>
        <yd-button size="large" class="button" @click.native='anxinqian("4")'>验证</yd-button>
      </div>
    </yd-popup>
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
        isUpdate: false, //此为修改标识
        current: "2027-11-11", //当前时间
        icrp_id_no: "", //身份证号 input1
        crp_exp_dt_tmp: "", //身份证号有效期
        stl_oac: "", //结算账户 input2
        bnk_acnm: "", //账户户名 input3
        wc_lbnk_no: "", //开户行 input4
        //当前页面表单数据
        stoe_nm: "", //商户名称
        stoe_cnt_nm: "", //联系人名称
        stoe_cnt_tel: "", //手机号码
        mailbox: "", //邮箱
        mcc_cd: "", //商户类型
        stoe_area_cod: "", //地区码
        stoe_adds: "", //详细地址
        checkbox: false, //协议
        ip: "", //当前ip
        sn_no: "", //sn号
        terminl_num: "", //终端数量
        invite_no: "", //邀请码
        log_no: "",     //流水号
        merc_id: "",    //商户id
        //公共参数
        token_id: "201710210000013868", //201710210000013868
        usr_no: "", //000000005028
        code1: "",
        code2: "",
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        show1: false,
        show_sheet1: false,
        show_sheet2: false,
        show_sheet3: false,
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
        addressSlots1: [{
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
        ccc: {}, //一级商户类型
        ddd: {}, //一级商户地址
        snum: true,
        ME50_sdk: "", //ME50显示Y 身份证
        //一级菜单数据
        merTypeItems1: [],
        merTypeLev1: "",
        //二级菜单数据
        merTypeItems2: [],
        merTypeLev2: "",
        //三级菜单数据
        merTypeItems3: [],
        merTypeLev3: "",
        code1: "",
        code2: "",

        show2: false,
        merItems1: [],
        merLev1: "",
        merItems2: [],
        merLev2: "",
        merItems3: [],
        merLev3: "",
        input6: "",
        show: false,
        codeOk: true,
        shebei5: ['1'], //默认选择 mu-picker :values
        menums: "1", //ME50设备数量
        menum5: false, //me50默认显示
        ME50_sdk: "", //传后端me50 = Y
        ME50_num: "",
        //验证码
        code_s: "60",
        addrs: "",
        userId: "", //安心签userId
        projectCode: "", //安心签projectCode项目编号
        checkCode: "", //验证码
        imgApi : "",
        arr: [],
        addressSlots2: [{
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

        addressSlots3: [{
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
        step: 1
      };
    },
    created() {
      document.title = "商户基本信息";
      let _this = this;
      _this.current = util.timeTrans(new Date(), "t4");

      //alert(location.search);
      _this.imgApi = api.imgApi;
      console.log("formObj:" + util.sesstionData("formObj"));
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
        _this.sn_no = formObj.sn_no; //sn号
        _this.invite_no = formObj.invite_no; //邀请码
        _this.terminl_num = formObj.terminl_num; //终端数量
        _this.ME50_num = formObj.ME50_num; //ME50数量
        _this.ME50_sdk = formObj.ME50_sdk; //设备Y判断
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
        //第二页
        _this.stoe_nm = objData.stoe_nm;
        _this.stoe_cnt_nm = objData.stoe_cnt_nm;
        _this.stoe_cnt_tel = objData.stoe_cnt_tel;

        _this.merTypeLev1 = `${objData.sup_mcc_nm}/`;
        _this.merTypeLev2 = `${objData.mcc_typ_nm}/`;
        _this.merTypeLev3 = objData.mcc_nm;
        _this.mcc_cd = objData.mcc_cd;

        _this.merLev1 = `${objData.prov_nm}/`;
        _this.merLev2 = `${objData.city_nm}/`;
        _this.merLev3 = objData.area_nm;
        _this.stoe_area_cod = objData.stoe_area_cod;

        _this.stoe_adds = objData.stoe_adds;

        _this.log_no = objData.log_no;
        _this.merc_id = objData.merc_id;

        _this.merc_bankcode_img = objData.merc_bankcode_img; //	结算人身份证 4
        _this.hold_img = objData.hold_img; //	结算人手持身份证 5
        _this.met_img = objData.met_img; //	银行卡照 6
        //将修改表单中的图片数据存入formObj
        var formObj = {};
        if (util.sesstionData("formObj") != false) {
          formObj = util.sesstionData("formObj");
        }
        console.log("formObj"+formObj);
        formObj.met_img = objData.met_img;
        formObj.merc_openbank_img = objData.merc_openbank_img;
        formObj.merc_bankcode_img = objData.merc_bankcode_img;
        formObj.hold_img = objData.hold_img;
        //formObj.sfz_img = objData.sfz_img;
        sessionStorage.setItem("formObj", JSON.stringify(formObj));
      }
      //判断是否为页面跳转  是就获取数据
      if (util.sesstionData("jumpDataNew") != false) {
        var objData = util.sesstionData("jumpDataNew");

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
              stay: true /* 不关闭 */ ,
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
      //加载一级商户类型
      var data = {
        token_id: this.token_id,
        opSys: "2",
        usr_no: this.usr_no
      };
      axios({
          method: "post",
          url: `${api.api}mercQryMccMajor.json`,
          data: data
        })
        .then(res => {
          console.log(res);
          console.log(res.data.REC);
          this.merTypeItems1 = [];
          for (let i = 0; i < res.data.REC.length; i++) {
            this.merTypeItems1.push({
              label: res.data.REC[i].sup_mcc_nm,
              sup_mcc_cd: res.data.REC[i].sup_mcc_cd,
              stay: true /* 不关闭 */ ,
              callback: res => {
                _this.load2levels(res);
              }
            });
            _this.ccc[res.data.REC[i].sup_mcc_nm] = [];
          }
        })
        .catch(err => {
          console.log(err);
        });

      //加载一级商户地址
      var data = {
        token_id: this.token_id,
        opSys: "2",
        usr_no: this.usr_no
      };
      axios({
          method: "post",
          url: `${api.api}mercQryProv.json`,
          data: data
        })
        .then(res => {
          console.log(res);
          console.log(res.data.REC);
          this.merItems1 = [];
          for (let i = 0; i < res.data.REC.length; i++) {
            this.merItems1.push({
              label: res.data.REC[i].prov_nm,
              merc_prov: res.data.REC[i].merc_prov,
              stay: true /* 不关闭 */ ,
              callback: res => {
                _this.load2levelsMer(res);
              }
            });
            _this.ddd[res.data.REC[i].prov_nm] = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.load3levels();
    },
    mounted() {
      if (this.isUpdate || util.sesstionData("jumpDataNew") != false) {
        var objData = {};
        this.isUpdate && (objData = util.sesstionData("UpdateParams"));
        util.sesstionData("jumpDataNew") != false &&
          (objData = util.sesstionData("jumpDataNew"));
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
      $(document).ready(function () {
        $("yd-mask").on("touchmove", function (event) {
          console.log("1221");
          event.stopPropagation(); //不会打印1，但是页面会跳转；
        });
      });

      //this.$refs.uploader2.files=[{srcUrl:'${api.imgApi}data/merc/201801/25/20180125000003083092/1516859394000.jpg'},{srcUrl:'${api.imgApi}data/merc/201801/25/20180125000003083092/1516859394000.jpg'}]
    },
    methods: {

      //页面跳转时候保存数据
      jumpData(obj) {
        console.log(obj);
        var formObj = {};
        //当前页面表单数据
        formObj.icrp_id_no = this.icrp_id_no; //身份证号
        formObj.stl_oac = this.stl_oac; //结算账户   
        formObj.bnk_acnm = this.bnk_acnm; //账户户名
        formObj.crp_exp_dt_tmp = this.crp_exp_dt_tmp; //身份证号有效期
        formObj.wc_lbnk_no = this.wc_lbnk_no; //开户银行
        formObj.lev3 = this.lev3; //开户支行

        formObj.stoe_nm = this.stoe_nm; //商户名称
        formObj.stoe_cnt_nm = this.stoe_cnt_nm; //联系人名称
        formObj.stoe_cnt_tel = this.stoe_cnt_tel; //手机号码

        formObj.merTypeLev1 = this.merTypeLev1; //商户类型名字
        formObj.merTypeLev2 = this.merTypeLev2;
        formObj.merTypeLev3 = this.merTypeLev3;
        formObj.mcc_cd = this.mcc_cd; //商户类型mcc

        formObj.merLev1 = this.merLev1; //商户地区
        formObj.merLev2 = this.merLev2;
        formObj.merLev3 = this.merLev3;
        formObj.stoe_area_cod = this.stoe_area_cod; //地区码

        formObj.stoe_adds = this.stoe_adds; //详细地址

        //图片
        formObj.met_img = obj.met_img; //银行卡
        formObj.merc_bankcode_img = obj.merc_bankcode_img; //正面身份证
        formObj.hold_img = obj.hold_img; //手持，ME50身份证反面

        //formObj.sfz_img = obj.sfz_img; //merc_bankcode_img
        sessionStorage.setItem("jumpDataNew", JSON.stringify(formObj));
      },
      check() {
        let _this = this;
        if (this.$refs.icrp_id_no.valid && this.icrp_id_no != "") {} else {
          this.$dialog.toast({
            mes: "请输入正确的身份证号信息",
            timeout: 2000
          });
          return false;
        }
        if (this.crp_exp_dt_tmp == "") {
          this.$dialog.toast({
            mes: "请选择身份证有效期",
            timeout: 2000
          });
          return false;
        }
        if (this.crp_exp_dt_tmp == this.current) {
          this.$dialog.toast({
            mes: "身份证有效期必须大于今天",
            timeout: 2000
          });
          return false;
        }
        if (this.$refs.stl_oac.valid && this.stl_oac != "") {} else {
          this.$dialog.toast({
            mes: "请输入正确的结算账户信息",
            timeout: 2000
          });
          return false;
        }
        if (this.$refs.bnk_acnm.valid && this.bnk_acnm != "") {
          var re1 = /^\d+$/; //纯数字
          var re2 = /^[a-z]+$/; //纯字母
          if (re1.test(this.bnk_acnm)) {
            this.$dialog.toast({
              mes: "账号户名不可为纯数字",
              timeout: 2000
            });
            return false;
          }
          if (re2.test(this.bnk_acnm)) {
            this.$dialog.toast({
              mes: "账号户名不可为纯字母",
              timeout: 2000
            });
            return false;
          }
        } else {
          this.$dialog.toast({
            mes: "请正确输入账户户名",
            timeout: 2000
          });
          return false;
        }
        if (this.wc_lbnk_no == "" || this.lev3 == "") {
          this.$dialog.toast({
            mes: "请选择开户行信息",
            timeout: 2000
          });
          return false;
        }
        var re = /^[0-9]*$/g;

        if (this.$refs.stoe_nm.valid && this.stoe_nm != "") {} else {
          this.$dialog.toast({
            mes: "请输入正确的签购单名称（8-20数字、字母、汉字）",
            timeout: 2000
          });
          return false;
        }
        if (re.test(this.stoe_nm)) {
          this.$dialog.toast({
            mes: "商户名称不能为纯数字",
            timeout: 2000
          });
          return false;
        }
        if (this.$refs.stoe_cnt_nm.valid && this.stoe_cnt_nm != "") {} else {
          this.$dialog.toast({
            mes: "请输入正确的联系人名称",
            timeout: 2000
          });
          return false;
        }
        if (re.test(this.stoe_cnt_nm)) {
          this.$dialog.toast({
            mes: "联系人不能为纯数字",
            timeout: 2000
          });
          return false;
        }
        if (this.$refs.stoe_cnt_tel.valid && this.stoe_cnt_tel != "") {} else {
          this.$dialog.toast({
            mes: "请输入正确的手机号码",
            timeout: 2000
          });
          return false;
        }
        if (this.mcc_cd == "") {
          this.$dialog.toast({
            mes: "请选择商户类型",
            timeout: 2000
          });
          return false;
        }
        if (this.stoe_area_cod == "") {
          this.$dialog.toast({
            mes: "请选择商户地区",
            timeout: 2000
          });
          return false;
        }
        if (this.$refs.stoe_adds.valid && this.stoe_adds != "") {} else {
          this.$dialog.toast({
            mes: "请输入正确的详细地址信息",
            timeout: 2000
          });
          return false;
        }
        var obj = util.sesstionData("formObj");
        if (
          (obj.met_img == "" || obj.met_img == undefined)
        ) {
          this.$dialog.toast({
            mes: "请上传银行卡相关照片",
            timeout: 2000
          });
          return false;
        }

        if ((obj.merc_bankcode_img == "" || obj.merc_bankcode_img == undefined) || (obj.hold_img == "" || obj.hold_img ==
            undefined)) {
          this.$dialog.toast({
            mes: "请上传身份证正反面照片",
            timeout: 2000
          });
          return false;
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
          obj.stoe_nm = this.stoe_nm; //商户名称
          obj.stoe_cnt_nm = this.stoe_cnt_nm; //联系人名称
          obj.stoe_cnt_tel = this.stoe_cnt_tel; //手机号码

          obj.merTypeLev1 = this.merTypeLev1; //商户类型名字
          obj.merTypeLev2 = this.merTypeLev2;
          obj.merTypeLev3 = this.merTypeLev3;
          obj.mcc_cd = this.mcc_cd; //商户类型mcc

          obj.merLev1 = this.merLev1; //商户地区
          obj.merLev2 = this.merLev2;
          obj.merLev3 = this.merLev3;
          obj.stoe_area_cod = this.stoe_area_cod; //地区码

          obj.stoe_adds = this.stoe_adds; //详细地址

          //图片
          obj.met_img = obj.met_img; //银行卡
          obj.merc_bankcode_img = obj.merc_bankcode_img; //正面身份证
          obj.hold_img = obj.hold_img; //手持，ME50身份证反面
          sessionStorage.setItem("formObj", JSON.stringify(obj));

          console.log(this.$refs.uploader);
          _this.thrInfoChk();
        }
      },
      //三要素验证
      thrInfoChk() {
        //三要素验证
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
          })
          .then(res => {

            console.log(res);
            _this.$dialog.loading.close();
            switch (res.data.repCode) {
              case "000000":
                switch (res.data.resultCode) {
                  case "0000":
                    //_this.jumpData(obj);
                    //验证签购单
                    _this.checkMerc();
                    break;
                  case "0001":
                    _this.$dialog.toast({
                      mes: `${res.data.resultMsg}`,
                      timeout: 2000
                    });
                    break;
                  case "0002":
                    //_this.jumpData(obj);
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
      },
      //验证签购单
      checkMerc() {
        let _this = this;
        _this.$dialog.loading.open("正在验证...");
        let data2 = {
          token_id: this.token_id,
          opSys: "2",
          usr_no: this.usr_no,
          //当前页面表单数据
          stoe_nm: this.stoe_nm, //商户名称
          stoe_cnt_nm: this.stoe_cnt_nm, //联系人名称
          stoe_cnt_tel: this.stoe_cnt_tel, //手机号码
          mcc_cd: this.mcc_cd, //商户类型
          stoe_area_cod: this.stoe_area_cod, //地区码
          stoe_adds: this.stoe_adds, //详细地址
          ME50_sdk: this.ME50_sdk, //设备Y
          ME50_num: this.ME50_num, //数量
          //表单参数部分
          icrp_id_no: this.icrp_id_no, //身份证号
          crp_exp_dt_tmp: this.crp_exp_dt_tmp, //身份证号有效期
          stl_oac: this.stl_oac, //结算账户
          bnk_acnm: this.bnk_acnm, //账户户名
          wc_lbnk_no: this.wc_lbnk_no, //开户行
          sn_no: this.sn_no, //sn号
          terminl_num: _this.terminl_num, //终端数量
          invite_no: this.invite_no, //邀请码
          //照片
          merc_bankcode_img: _this.merc_bankcode_img, //	结算人身份证 4
          hold_img: _this.hold_img, //	结算人手持身份证 5
          met_img: _this.met_img //	银行卡照 6
        };
        if (this.mcc_cd == "") {
          this.$dialog.toast({
            mes: "请选择商户类型",
            timeout: 2000
          });
          return false;
        }
        if (this.stoe_area_cod == "") {
          this.$dialog.toast({
            mes: "请选择商户地区",
            timeout: 2000
          });
          return false;
        }
        //先校验
        axios({
            method: "post",
            url: `${api.api}checkMerc.json`,
            data: data2
          })
          .then(res => {
            _this.$dialog.loading.close();
            if (res.data.repCode == "000000") {
              console.log(res);
              console.log("成功");
              if (_this.isUpdate) {
                _this.mercRegister();
              } else {
                _this.anxinqian("1");
              }
            } else {
              _this.$dialog.toast({
                mes: `${res.data.repMsg}`,
                timeout: 2000
              });
            }

          })
          .catch(err => {
            console.log(err);
            _this.$dialog.toast({
              mes: err,
              timeout: 2000
            });
            _this.$dialog.loading.close();
            // _this.$dialog.toast({
            //   mes: `开户校验失败,请重试`,
            //   timeout: 2000
            // });
          });
      },
      //商户进件
      mercRegister() {
        let _this = this;
        _this.$dialog.loading.open("正在提交...");
        let data = {
          token_id: _this.token_id,
          opSys: "2",
          usr_no: _this.usr_no,
          //当前页面表单数据
          stoe_nm: _this.stoe_nm, //商户名称
          stoe_cnt_nm: _this.stoe_cnt_nm, //联系人名称
          stoe_cnt_tel: _this.stoe_cnt_tel, //手机号码
          mcc_cd: _this.mcc_cd, //商户类型
          stoe_area_cod: _this.stoe_area_cod, //地区码
          stoe_adds: _this.stoe_adds, //详细地址
          ME50_sdk: _this.ME50_sdk, //设备Y
          ME50_num: _this.ME50_num, //数量
          //表单参数部分
          icrp_id_no: _this.icrp_id_no, //身份证号
          crp_exp_dt_tmp: _this.crp_exp_dt_tmp, //身份证号有效期
          stl_oac: _this.stl_oac, //结算账户
          bnk_acnm: _this.bnk_acnm, //账户户名
          wc_lbnk_no: _this.wc_lbnk_no, //开户行
          sn_no: _this.sn_no, //sn号
          terminl_num: _this.terminl_num, //终端数量
          invite_no: _this.invite_no, //邀请码
          //照片
          merc_bankcode_img: _this.merc_bankcode_img, //	结算人身份证 4
          hold_img: _this.hold_img, //	结算人手持身份证 5
          met_img: _this.met_img, //	银行卡照 6
        };

        console.log(data);
        var url = `${api.api}mercRegister.json`;
        if (_this.isUpdate) {
          url = `${api.api}mercUpdate.json`;
          data.log_no = _this.log_no;
          data.merc_id = _this.merc_id;
        }
        axios({
            method: "post",
            url: url,
            data: data
          })
          .then(res => {
            console.log(res);
            _this.$dialog.loading.close();
            if (res.data.repCode == "000000") {
              _this.$router.push({
                name: "jinjianOk"
              });
            } else {
              _this.$dialog.toast({
                mes: `${res.data.repMsg}`,
                timeout: 2000
              });
            }
          })
          .catch(err => {
            console.log(err);
            _this.$dialog.loading.close();
            _this.$dialog.toast({
              mes: `开户失败,请重试`,
              timeout: 2000
            });
          });
      },
      //安心签流程1安心签注册2获取编号3发送短信4验证验证码
      anxinqian(num) {
        let _this = this;
        var data = {};
        switch (num) {
          case "1":
            _this.$dialog.loading.open("正在注册...");
            console.log("1安心签注册");
            data = {
              opSys: "2",
              serviceId: "4830001",
              bnk_acnm: this.bnk_acnm,
              icrp_id_no: this.icrp_id_no,
              stoe_cnt_tel: this.stoe_cnt_tel,
              mailbox: this.mailbox
            };
            break;
          case "2":
            console.log("2获取编号");
            data = {
              opSys: "2",
              serviceId: "4830011" //
            };
            break;
          case "3":
            console.log("3发送短信");
            _this.codeOk = false;
            let numBer = 60;
            let int = self.setInterval(function () {
              numBer--;
              _this.code_s = numBer < 10 ? `0${numBer}` : `${numBer.toString()}`;
              if (numBer < 0) {
                clearInterval(int);
                _this.codeOk = true;
                _this.code_s = "60";
              }
            }, 1000);
            data = {
              opSys: "2",
              serviceId: "4830101",
              userId: _this.userId, //安心签userId
              projectCode: _this.projectCode //安心签projectCode项目编号
            };
            break;
          case "4":
            console.log("4验证验证码");
            _this.$dialog.loading.open("正在注册...");
            data = {
              yhkpay_flg: "N",
              opSys: "2",
              serviceId: "4830102",
              location: "",
              userId: _this.userId, //安心签userId
              projectCode: _this.projectCode, //安心签projectCode项目编号
              checkCode: _this.checkCode, //安心签checkCode验证码
              location: _this.ip,
              text1: "",
              text5: "",
              text6: "",
              text8: "",
              text10: "",
              text12: "",
              text13: _this.bnk_acnm, //结算人账户名称
              text14: _this.stl_oac, //结算人账户
              text15: "", //开户名称
              text16: "",
              text23: ""
            };
            if (data.location == "") {
              data.location = "172.16.8.192";
            }
            break;
          default:
            break;
        }
        console.log(data);
        axios({
            method: "post",
            url: `${api.AxqApi}`,
            data: data,
            withCredentials: false
          })
          .then(res => {
            console.log(res);
            if (res.data.ramake == "1") {
              switch (num) {
                case "1":
                  //获取编号
                  _this.userId = res.data.userId;
                  _this.anXinSignMobilePhone = res.data.anXinSignMobilePhone;
                  _this.anxinqian("2");
                  break;
                case "2":
                  //发送短信
                  _this.projectCode = res.data.projectCode;
                  _this.$dialog.loading.close();
                  _this.show = true;
                  _this.checkCode = "";
                  _this.anxinqian("3");
                  break;
                case "3":
                  break;
                case "4":
                  _this.$dialog.loading.close();
                  _this.show = false;
                  _this.mercRegister();
                  break;
                default:
                  break;
              }
            } else {
              _this.$dialog.loading.close();
              _this.$dialog.toast({
                mes: `${res.data.retMessage}`,
                timeout: 2000
              });
            }
          })
          .catch(err => {
            _this.$dialog.loading.close();
            console.log(err);
            _this.$dialog.toast({
              mes: `注册失败,请重试`,
              timeout: 2000
            });
          });
      },
      //跳转协议页面
      jump() {
        // this.jumpData();
        // var formObj = util.sesstionData("formObj");
        // location.href = `/static/posProtocolShow.html?yi_name=${
        //   this.stoe_cnt_nm
        // }&yi_adress=${this.stoe_adds}&yi_phone=${this.stoe_cnt_tel}&yi_email=${
        //   this.mailbox
        // }&td_2s=0.38&td_3s=0.38&span1=${this.bnk_acnm}&span2=${
        //   this.stl_oac
        // }&span3=${formObj.lev3}`;
        if (this.check() != false) {
          this.$router.push({
            path: `/text?yi_name=${this.stoe_cnt_nm}&yi_adress=${
          this.stoe_adds
        }&yi_phone=${this.stoe_cnt_tel}&yi_email=${
          this.mailbox
        }&td_2s=0.38&td_3s=0.38&span1=${this.bnk_acnm}&span2=${
          this.stl_oac
        }&span3=${this.lev3}`
          });
        }

      },
      goSubmit() {
        this.$router.push({
          name: "tijiao"
        });
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
      load2levels(t) {
        console.log(t);
        //alert("加载二级");
        var _this = this;
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
            _this.myItems2 = [];
            for (let i = 0; i < res.data.REC.length; i++) {
              _this.myItems2.push({
                label: res.data.REC[i].city_nm,
                opn_bnk_city: res.data.REC[i].opn_bnk_city,
                stay: true /* 不关闭 */ ,
                callback: res => {
                  _this.load3levels(res);
                }
              });

              err.push(res.data.REC[i].city_nm);

              _this.addressSlots1[1].values = err;
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
                stay: true /* 不关闭 */ ,
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

                _this.addressSlots1[1].values = err;
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
      load2levelsMerType(t) {
        console.log(t);
        //alert("加载二级");
        let _this = this;
        _this.merTypeLev1 = `${t.label}/`;
        let data = {
          token_id: this.token_id,
          opSys: "2",
          usr_no: this.usr_no,
          sup_mcc_cd: t.sup_mcc_cd
        };
        _this.code1 = data.sup_mcc_cd;
        console.log(data);
        axios({
            method: "post",
            url: `${api.api}mercQryMccSmall.json`,
            data: data
          })
          .then(res => {
            console.log(res);
            console.log(res.data.REC);
            _this.merTypeItems2 = [];
            var err = [];
            for (let i = 0; i < res.data.REC.length; i++) {
              _this.merTypeItems2.push({
                label: res.data.REC[i].mcc_typ_nm,
                mcc_typ: res.data.REC[i].mcc_typ,
                stay: true /* 不关闭 */ ,
                callback: res => {
                  _this.getMerType(res);
                }
              });
              err.push(res.data.REC[i].mcc_typ_nm);
            }
            _this.$refs.actionsheet.items = _this.merTypeItems2;
            _this.addressSlots2[1].values = err;
            //_this.$refs.actionsheet2.items = _this.merItems2;
            _this.merTypeLev2 = `${_this.merTypeItems2[0].label}/`;
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 加载二级地址
      load2levelsMer(t) {
        console.log(t);
        var _this = this;
        _this.merLev1 = `${t.label}/`;
        let data = {
          token_id: this.token_id,
          opSys: "2",
          usr_no: this.usr_no,
          merc_prov: t.merc_prov
        };
        _this.code3 = data.merc_prov;
        console.log(data);
        axios({
            method: "post",
            url: `${api.api}mercQryCity.json`,
            data: data
          })
          .then(res => {
            console.log(res);
            console.log(res.data.REC);
            _this.merItems2 = [];
            var err3 = [];
            for (let i = 0; i < res.data.REC.length; i++) {
              _this.merItems2.push({
                label: res.data.REC[i].city_nm,
                merc_city: res.data.REC[i].merc_city,
                stay: true /* 不关闭 */ ,
                callback: res => {
                  _this.getMerAdds(res);
                }
              });
              err3.push(res.data.REC[i].city_nm);

              //  console.log(err)
              //_this.addressSlots[1].values = err;
            }
            console.log(_this.merItems2)
            _this.addressSlots3[1].values = err3;
            //_this.$refs.actionsheet2.items = _this.merItems2;
            _this.merLev2 = _this.merItems2[0].label;
          })
          .catch(err => {
            console.log(err3);
          });
      },
      getMerType(t) {
        console.log(t);

        let _this = this;
        _this.merTypeLev2 = `${t.label}/`;
        let data = {
          token_id: this.token_id,
          opSys: "2",
          usr_no: this.usr_no,
          sup_mcc_cd: _this.code1,
          mcc_typ: t.mcc_typ
        };

        console.log(data);
        axios({
            method: "post",
            url: `${api.api}mercQryMccs.json`,
            data: data
          })
          .then(res => {
            var err = [];
            console.log(res);
            console.log(res.data.REC);
            this.merTypeItems3 = [];
            for (let i = 0; i < res.data.REC.length; i++) {
              this.merTypeItems3.push({
                label: res.data.REC[i].mcc_nm,
                mcc_cd: res.data.REC[i].mcc_cd,
                callback: res => {
                  console.log(res);
                  _this.merTypeLev3 = res.label;
                  _this.mcc_cd = res.mcc_cd;
                }
              });
              err.push(res.data.REC[i].mcc_nm);
            }
            _this.addressSlots2[2].values = err;
            //_this.$refs.actionsheet.items = _this.myItems3;
            _this.merTypeLev3 = _this.merTypeItems3[0].label;
            _this.mcc_cd = _this.merTypeItems3[0].mcc_cd;
          })
          .catch(err => {
            console.log(err);
          });
      },
      getMerAdds(t) {
        console.log(t);

        let _this = this;
        _this.merLev2 = `${t.label}/`;
        let data = {
          token_id: this.token_id,
          opSys: "2",
          usr_no: this.usr_no,
          merc_prov: _this.code3,
          merc_city: t.merc_city
        };

        console.log(data);
        axios({
            method: "post",
            url: `${api.api}mercQryReae.json`,
            data: data
          })
          .then(res => {
            var err = [];
            console.log(res);
            console.log(res.data.REC);
            this.merItems3 = [];
            // _this.merLev3 = value;
            // _this.stoe_area_cod = this.merItems3[i].merc_area;
            for (let i = 0; i < res.data.REC.length; i++) {
              this.merItems3.push({
                label: res.data.REC[i].area_nm,
                merc_area: res.data.REC[i].merc_area,
                callback: res => {
                  console.log(res);
                  _this.merLev3 = res.label;
                  _this.stoe_area_cod = res.merc_area;
                }
              });
              err.push(res.data.REC[i].area_nm);
            }
            _this.addressSlots3[2].values = err;
            //_this.$refs.actionsheet2.items = _this.merItems3;
            _this.merLev3 = _this.merItems3[0].label;
            _this.stoe_area_cod = _this.merItems3[0].merc_area;
          })
          .catch(err => {
            console.log(err);
          });
      },
      addressChange1(value, index) {
        switch (index) {
          case 0:
            this.check1(value);
            break;
          case 1:
            this.check2(value);
            break;
          case 2:
            this.lbnk_cd_nm = value;
            break;
        }
      },
      check1(value) {
        let _this = this;
        //console.log(value);
        for (let i = 0; i < this.myItems1.length; i++) {
          if (value == this.myItems1[i].label) {
            _this.load2levels(_this.myItems1[i].opn_bnk_prov);
          }
        }
        _this.arr = _this.aaa[value];
      },
      check2(value) {
        var _this = this;
        switch (this.step) {
          case 1:
            console.log(this.myItems1);
            this.opn_bnk_city = value;

            break;
          case 2:
            for (let i = 0; i < this.myItems4.length; i++) {
              if (value == this.myItems4[i].label) {
                _this.wc_lbnk_no = this.myItems4[i].wc_lbnk_no;
                _this.lev3 = value;
              }
            }
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
      addressChange2(value, index) {
        switch (index) {
          case 0:
            this.checkMerType1(value);
            break;
          case 1:
            this.checkMerType2(value);
            break;
          case 2:
            this.checkMerType3(value);
            break;
        }
      },
      checkMerType1(value) {
        let _this = this;
        //console.log(value);

        for (let i = 0; i < this.merTypeItems1.length; i++) {
          if (value == this.merTypeItems1[i].label) {
            //alert(this.merItems1[i].merc_prov);
            console.log(_this.merTypeItems1[i]);
            _this.load2levelsMerType(_this.merTypeItems1[i]);
          }
        }
        //_this.lev3 = "";
        _this.mcc_cd = "";
      },
      checkMerType2(value) {
        var _this = this;
        for (let i = 0; i < this.merTypeItems2.length; i++) {
          if (value == this.merTypeItems2[i].label) {
            //alert(this.merItems1[i].merc_prov);
            console.log(_this.merTypeItems2[i]);

            _this.getMerType(_this.merTypeItems2[i]);
          }
        }
      },
      checkMerType3(value) {
        var _this = this;
        for (let i = 0; i < this.merTypeItems3.length; i++) {
          if (value == this.merTypeItems3[i].label) {
            _this.merTypeLev3 = value;
            _this.mcc_cd = _this.merTypeItems3[i].mcc_cd;
            // console.log(_this.merItems3[i])
          }
        }
      },
      addressChange3(value, index) {
        switch (index) {
          case 0:
            this.checkMer1(value);
            console.log(this.merItems1);
            break;
          case 1:
            this.checkMer2(value);
            console.log(this.merItems2);
            break;
          case 2:
            this.checkMer3(value);
            break;
        }
        // this.address = [this.province, this.city, this.region];
        //this.deadlineTime = `${this.province}  ${this.city}  ${this.region}`;
      },
      checkMer1(value) {
        let _this = this;
        //console.log(value);
        for (let i = 0; i < this.merItems1.length; i++) {
          if (value == this.merItems1[i].label) {
            //alert(this.merItems1[i].merc_prov);
            console.log(_this.merItems1[i]);
            _this.load2levelsMer(_this.merItems1[i]);
          }
        }
        _this.merLev3 = "";
        _this.stoe_area_cod = "";

        this.addressSlots3[2].values = [];
      },
      checkMer2(value) {
        var _this = this;
        for (let i = 0; i < this.merItems2.length; i++) {
          if (value == this.merItems2[i].label) {
            //alert(this.merItems1[i].merc_prov);
            console.log(_this.merItems2[i]);
            _this.getMerAdds(_this.merItems2[i]);
          }
        }
      },
      checkMer3(value) {
        var _this = this;
        for (let i = 0; i < this.merItems3.length; i++) {
          if (value == this.merItems3[i].label) {
            _this.merLev3 = value;
            _this.stoe_area_cod = this.merItems3[i].merc_area;
            // console.log(_this.merItems3[i])
          }
        }
      },
      changediqu1() {
        switch (this.step) {
          case 1:
            if (this.myItems2.length == 0) {
              this.$dialog.toast({
                mes: `请选择地区`,
                timeout: 2000,
              });
            } else {
              this.step = 2;
              this.addressSlots1[0].values = {};
              this.addressSlots1[0].width = "0%";
              this.addressSlots1[1].values = {};
              this.addressSlots1[2].values = {};
              this.addressSlots1[2].width = "0%";
              if (this.lbnk_cd_nm == "") {
                this.lbnk_cd_nm = "渤海银行";
              }

              this.getType();
            }
            break;
          case 2:
            //this.wc_lbnk_no = this.myItems4[0].wc_lbnk_no;
            console.log(this.addressSlots1[1]);
            if (this.lev3 == "") {
              this.lev3 = this.addressSlots1[1].values[0];
              this.wc_lbnk_no = this.myItems4[0].wc_lbnk_no;
            }

            this.addressSlots1[1].values = {};
            this.addressSlots1[0].width = "100%";
            this.addressSlots1[2].width = "100%";

            this.step = 1;
            this.show_sheet1 = false;
            break;
          default:
            break;
        }
      },
      changediqu2() {
        if (this.mcc_cd == "") {
          this.$dialog.toast({
            mes: `请选择商户类型`,
            timeout: 2000
          });
          this.merTypeLev1 = ""
          this.merTypeLev2 = ""
          this.merTypeLev3 = ""
        }
        this.show_sheet2 = false;
      },
      changediqu3() {
        if (this.stoe_area_cod == "") {
          this.$dialog.toast({
            mes: `请选择商户地址`,
            timeout: 2000
          });
          this.merLev1 = ""
          this.merLev2 = ""
          this.merLev3 = ""
        }
        this.show_sheet3 = false;
      },
      showpick1() {
        //alert(this.step);
        this.lbnk_cd_nm = "";
        this.lev3 = "";
        this.show_sheet1 = true;
        this.addressSlots1[0].values = Object.keys(this.aaa);
        this.addressSlots1[2].values = Object.keys(this.bbb);
        this.addressSlots1[1].values = {};
        this.addressSlots1[0].width = "100%";
        this.addressSlots1[2].width = "100%";
      },
      showpick2() {
        this.show_sheet2 = true;
        this.mcc_cd = "";
        this.addressSlots2[0].values = Object.keys(this.ccc);
        this.addressSlots2[1].values = [];
        this.addressSlots2[2].values = [];
      },
      showpick3() {
        this.show_sheet3 = true;
        this.stoe_area_cod = "";
        this.addressSlots3[0].values = Object.keys(this.ddd);
        this.addressSlots3[1].values = [];
        this.addressSlots3[2].values = [];
        //_this.addressSlots[1].values = Object.keys(_this.aaa);
      }
    },

    
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

  .yd-cell-item span i {
    color: #f00;
  }
</style>