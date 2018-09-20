<template>
  <div class="tijiao">
    <header>
    </header>
    <div class="main">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">商户名称<i>*</i></span>
          <yd-input ref="input1" slot="right" v-model="stoe_nm" regex="^(?![0-9]*$)[\u4e00-\u9fa5a-zA-Z0-9_]{8,20}$" placeholder="请输入商户名称"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">联系人<i>*</i></span>
          <yd-input ref="input2" slot="right" v-model="stoe_cnt_nm" regex="^(?![0-9]*$)[\u4e00-\u9fa5a-zA-Z0-9_]{2,10}$" placeholder="请输入联系人"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">手机号码<i>*</i></span>
          <yd-input ref="input3" slot="right" v-model="stoe_cnt_tel" regex="/^(0|86|17951)?1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/" placeholder="请输入手机号码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">邮箱<i>*</i></span>
          <yd-input ref="input4" slot="right" v-model="mailbox" regex="/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/" placeholder="请输入邮箱"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group>
        <yd-cell-item arrow @click.native="showpick1">
          <span slot="left">商户类型<i>*</i></span>
          <span slot="right">{{lev1}}{{lev2}}{{lev3}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group>
        <yd-cell-item arrow @click.native="showpick">
          <span slot="left">商户地址<i>*</i></span>
          <span slot="right">{{merLev1}}{{merLev2}}{{merLev3}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">详细地址<i>*</i></span>
          <yd-input ref="input5" slot="right" v-model="stoe_adds" placeholder="请输入详细地址" regex="^(?![0-9]*$)[\u4e00-\u9fa5a-zA-Z0-9_]{4,30}$"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow @click.native="showpick5" v-show="menum5">
          <span slot="left">请选择设备数量<i>*</i></span>
          <span slot="right">{{menums}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <div class="title">营业场所照（门头、收银台、营业场所）（至少1张，最多3张）<i>*</i></div>
      <!-- <uploader :srcUrl="'${api.api}uploadPic'" :max="3" :flg='6' :type='6'></uploader> -->
      <uploader :srcUrl="`http://sandbox.starpos.com.cn/estmadp1/uploadPic`" :max="3" :flg='6' :type='[1,2,3]' ref="uploader3"></uploader>

      <!-- <div class="title">测试</div>
      <uploader2 :srcUrl="`http://139.196.141.163:8480/mweb/common/fileUploadCallback.jsp?`" :max="3" :flg='6' :type='[1,2,3]' ref="uploader3"></uploader2> -->
    </div>
    <p class="bott"> 
      <yd-checkbox v-model="checkbox" color="#419BF9" size="15">确认已阅读并同意签订</yd-checkbox>
      <a href="javascript:void(0)" @click="jump">《星POS扫码支付商户注册服务协议》</a>
    </p>
    <footer>
      <yd-button size="large" class="button" @click.native='submit' :disabled='!checkbox'>提交</yd-button>
    </footer>
    <yd-actionsheet :items="myItems1" :v-model="false" ref='actionsheet'></yd-actionsheet>
    <mu-bottom-sheet :open="show1">
      <div class="scroll-controls">
        <span class="scroll-cancel" @click="show1=false">取消</span>
        <span class="scroll-Middle"></span>
        <span class="scroll-submit" @click="changediqu1">确认</span>
      </div>
      <div class="demo-picker-container">
        <mu-picker :slots="addressSlots1" :visible-item-count="5" @change="addressChange1" />
      </div>
    </mu-bottom-sheet>
    <yd-actionsheet :items="merItems1" :v-model="false" ref='actionsheet2'></yd-actionsheet>
    <mu-bottom-sheet :open="show2">
      <div class="scroll-controls">
        <span class="scroll-cancel" @click="show2=false;step=1">取消</span>
        <span class="scroll-Middle"></span>
        <span class="scroll-submit" @click="changediqu">确认</span>
      </div>
      <div class="demo-picker-container">
        <mu-picker :slots="addressSlots" :visible-item-count="5" @change="addressChange" />
      </div>
    </mu-bottom-sheet>
    <mu-bottom-sheet :open="show5">
    <div class="scroll-controls">
					<span class="scroll-cancel" @click="show5=false;">取消</span>
					<span class="scroll-Middle">(请选择设备数量)</span>
					<span class="scroll-submit" @click="changeshebei5">确认</span>
		</div>
		<div class="demo-picker-container">
      <mu-picker :slots="shebeiSlots" :visible-item-count="5" @change="shebeiChange5" :values="shebei5"/>
     </div>
    </mu-bottom-sheet>

    <yd-popup v-model="show" position="center" width="75%" :close-on-masker='false'>
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
import uploader from "../../components/uploader3";
//import uploader2 from "../../components/uploader2";
import axios from "axios";
import util from "../../utils/util";
import api from "../../api/api";
export default {
  data() {
    return {
      isUpdate: false, //此为修改标识
      checkbox: false,
      datetime3: "",

      anXinSignMobilePhone: "", //默认手机号
      //公共参数部分
      token_id: "", //201710210000013868
      usr_no: "", //000000005028
      //当前页面表单数据
      stoe_nm: "", //商户名称
      stoe_cnt_nm: "", //联系人名称
      stoe_cnt_tel: "", //手机号码
      mailbox: "", //邮箱
      mcc_cd: "", //商户类型
      stoe_area_cod: "", //地区码
      stoe_adds: "", //详细地址

      //表单参数部分
      icrp_id_no: "", //身份证号
      crp_exp_dt_tmp: "", //身份证号有效期
      stl_oac: "", //结算账户
      bnk_acnm: "", //账户户名
      wc_lbnk_no: "", //开户行
      lev3: "", //银行名称
      sn_no: "", //sn号
      terminl_num: "", //终端数量
      invite_no: "", //邀请码
      log_no: "",
      merc_id: "",
      //照片部分
      door_img: "", //	门头照 1
      foy_img: "", //	场景照 2
      choc_img: "", //	收银台照 3
      merc_bankcode_img: "", //	结算人身份证 4
      mer_con1_img: "", //ME50其他1 手持 8
      mer_con2_img: "", //ME50其他2 人门合照 9   
      hold_img: "", //	结算人手持身份证 5，ME50 身份证反面 5
      met_img: "", //	银行卡照 6
      merc_openbank_img: "", //	开户行许可证照 7
      show1: false,
      //一级菜单数据
      myItems1: [],
      lev1: "",
      //二级菜单数据
      myItems2: [],
      lev2: "",
      //三级菜单数据
      myItems3: [],
      lev3: "",
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
      //设备数量
      show5: false,
      shebeiSlots: [
        {
          width: "100%",
          textAlign: "center",
          values: {} // Object.keys({"1":[],"2":[],"3":[],"4":[],"5":[]})
        }
      ],
      shebei5: ['1'], //默认选择 mu-picker :values
      menums:"1", //ME50设备数量
      menum5:false, //me50默认显示
      ME50_sdk:"", //传后端me50 = Y
      ME50_num:"",
      //验证码
      code_s: "60",
      addrs: "",
      userId: "", //安心签userId
      projectCode: "", //安心签projectCode项目编号
      checkCode: "", //验证码
      ip: "", //当前ip
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

      addressSlots1: [
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
      step: 1
    };
  },
  computed: {
    phoneNumBefor() {
      return this.stoe_cnt_tel.substring(0, 3);
    },
    phoneNumAfter() {
      return this.stoe_cnt_tel.substr(7);
    }
  },
  created() {
    document.title = "商户信息";
    let _this = this;

    _this.getYourIP();
    //获取公共参数
    if (util.sesstionData("PublicParams") != false) {
      var paramsObj = util.sesstionData("PublicParams");
      this.token_id = paramsObj.token_id;
      this.usr_no = paramsObj.usr_no;
    }
    //获取表单参数
    if (util.sesstionData("formObj") != false) {
      var formObj = util.sesstionData("formObj");
      _this.icrp_id_no = formObj.icrp_id_no; //身份证号
      _this.crp_exp_dt_tmp = formObj.crp_exp_dt_tmp; //身份证号有限期
      _this.stl_oac = formObj.stl_oac; //结算账户
      _this.bnk_acnm = formObj.bnk_acnm; //账户户名
      _this.wc_lbnk_no = formObj.wc_lbnk_no; //开户行
      _this.sn_no = formObj.sn_no; //sn号
      _this.invite_no = formObj.invite_no; //邀请码
      _this.terminl_num = formObj.terminl_num; //终端数量
      _this.ME50_num = formObj.ME50_num; //ME50数量
      _this.ME50_sdk = formObj.ME50_sdk; //设备Y判断

      //照片部分
      // _this.door_img = formObj.door_img; //	门头照 1
      // _this.foy_img = formObj.foy_img; //	场景照 2
      // _this.choc_img = formObj.choc_img; //	收银台照 3
      // _this.merc_bankcode_img = formObj.merc_bankcode_img; //	结算人身份证 4
      // _this.hold_img = formObj.hold_img; //	结算人手持身份证 5
      // _this.met_img = formObj.met_img; //	银行卡照 6
      // _this.merc_openbank_img = formObj.merc_openbank_img; //	开户行许可证照 7

      // _this.door_img == "" && (_this.door_img = formObj.door_img); //	门头照 1
      // _this.foy_img == "" && (_this.foy_img = formObj.foy_img); //	场景照 2
      // _this.choc_img == "" && (_this.choc_img = formObj.choc_img); //	收银台照 3
      _this.merc_bankcode_img == "" &&
        (_this.merc_bankcode_img = formObj.merc_bankcode_img); //	结算人身份证 4
      _this.mer_con1_img == "" &&
        (_this.mer_con1_img = formObj.mer_con1_img);  //ME50其他1 ME50手持
      _this.mer_con2_img == "" &&
        (_this.mer_con2_img = formObj.mer_con2_img); //ME50其他2 人和门店合照        
      _this.hold_img == "" && (_this.hold_img = formObj.hold_img); //	结算人手持身份证 5，ME50身份证反面
      _this.met_img == "" && (_this.met_img = formObj.met_img); //	银行卡照 6
      _this.merc_openbank_img == "" &&
        (_this.merc_openbank_img = formObj.merc_openbank_img); //	开户行许可证照 7
    }
    //判断是否为修改状态  是就获取数据
    if (util.sesstionData("UpdateParams") != false) {
      _this.isUpdate = true;
      var objData = util.sesstionData("UpdateParams");

      _this.stoe_nm = objData.stoe_nm;
      _this.stoe_cnt_nm = objData.stoe_cnt_nm;
      _this.stoe_cnt_tel = objData.stoe_cnt_tel;
      _this.mailbox = objData.mailbox;

      _this.lev1 = `${objData.sup_mcc_nm}/`;
      _this.lev2 = `${objData.mcc_typ_nm}/`;
      _this.lev3 = objData.mcc_nm;
      _this.mcc_cd = objData.mcc_cd;

      _this.merLev1 = `${objData.prov_nm}/`;
      _this.merLev2 = `${objData.city_nm}/`;
      _this.merLev3 = objData.area_nm;
      _this.stoe_area_cod = objData.stoe_area_cod;
      //_this.menums = objData.menums; //设备数

      _this.stoe_adds = objData.stoe_adds;
      _this.log_no = objData.log_no;
      _this.merc_id = objData.merc_id;

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
      sessionStorage.setItem("formObj", JSON.stringify(formObj));
    }
    //判断是否为页面跳转  是就获取数据
    if (util.sesstionData("jumpData") != false) {
      var objData = util.sesstionData("jumpData");

      _this.stoe_nm = objData.stoe_nm;
      _this.stoe_cnt_nm = objData.stoe_cnt_nm;
      _this.stoe_cnt_tel = objData.stoe_cnt_tel;
      _this.mailbox = objData.mailbox;

      _this.lev1 = objData.lev1;
      _this.lev2 = objData.lev2;
      _this.lev3 = objData.lev3;
      _this.mcc_cd = objData.mcc_cd;

      _this.merLev1 = objData.merLev1;
      _this.merLev2 = objData.merLev2;
      _this.merLev3 = objData.merLev3;
      _this.stoe_area_cod = objData.stoe_area_cod;

      _this.stoe_adds = objData.stoe_adds; //详细地址
      //_this.menums = objData.menums; //ME50设备数
    }
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
        this.myItems1 = [];
        for (let i = 0; i < res.data.REC.length; i++) {
          this.myItems1.push({
            label: res.data.REC[i].sup_mcc_nm,
            sup_mcc_cd: res.data.REC[i].sup_mcc_cd,
            stay: true /* 不关闭 */,
            callback: res => {
              _this.load2levels(res);
            }
          });
          _this.bbb[res.data.REC[i].sup_mcc_nm] = [];
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
            stay: true /* 不关闭 */,
            callback: res => {
              _this.load2levelsMer(res);
            }
          });
          _this.aaa[res.data.REC[i].prov_nm] = [];
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    let _this = this;
    if (this.isUpdate || util.sesstionData("jumpData") != false) {
      var objData = {};
      this.isUpdate && (objData = util.sesstionData("UpdateParams"));
      util.sesstionData("jumpData") != false &&
        (objData = util.sesstionData("jumpData"));

      console.log(objData.door_img);
      var list3 = [];
      objData.door_img != null &&
        objData.door_img != "" &&
        list3.push({
          srcUrl: `${api.imgApi}stmapp/${objData.door_img}`
        });
      _this.door_img = objData.door_img; //	门头照 1
      objData.foy_img != null &&
        objData.foy_img != "" &&
        list3.push({
          srcUrl: `${api.imgApi}stmapp/${objData.foy_img}`
        });
      _this.foy_img = objData.foy_img; //	场景照 2
      objData.choc_img != null &&
        objData.choc_img != "" &&
        list3.push({
          srcUrl: `${api.imgApi}stmapp/${objData.choc_img}`
        });
      _this.choc_img = objData.choc_img; //	收银台照 3
      console.log(list3);
      this.$refs.uploader3.files = list3;
    }
  },
  methods: {
    load2levels(t) {
      console.log(t);
      //alert("加载二级");
      let _this = this;
      _this.lev1 = `${t.label}/`;
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
          this.myItems2 = [];
          var err = [];
          for (let i = 0; i < res.data.REC.length; i++) {
            this.myItems2.push({
              label: res.data.REC[i].mcc_typ_nm,
              mcc_typ: res.data.REC[i].mcc_typ,
              stay: true /* 不关闭 */,
              callback: res => {
                _this.getType(res);
              }
            });
            err.push(res.data.REC[i].mcc_typ_nm);
          }
          _this.$refs.actionsheet.items = _this.myItems2;
          _this.addressSlots1[1].values = err;
          //_this.$refs.actionsheet2.items = _this.merItems2;
          _this.lev2 = `${_this.myItems2[0].label}/`;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 加载二级地址
    load2levelsMer(t) {
      console.log(t);

      let _this = this;

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
          this.merItems2 = [];
          var err = [];
          for (let i = 0; i < res.data.REC.length; i++) {
            this.merItems2.push({
              label: res.data.REC[i].city_nm,
              merc_city: res.data.REC[i].merc_city,
              stay: true /* 不关闭 */,
              callback: res => {
                _this.getMerType(res);
              }
            });
            err.push(res.data.REC[i].city_nm);
            //  console.log(err)
            //_this.addressSlots[1].values = err;
          }
          _this.addressSlots[1].values = err;
          //_this.$refs.actionsheet2.items = _this.merItems2;
          _this.merLev2 = _this.merItems2[0].label;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getType(t) {
      console.log(t);

      let _this = this;
      _this.lev2 = `${t.label}/`;
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
          this.myItems3 = [];
          for (let i = 0; i < res.data.REC.length; i++) {
            this.myItems3.push({
              label: res.data.REC[i].mcc_nm,
              mcc_cd: res.data.REC[i].mcc_cd,
              callback: res => {
                console.log(res);
                _this.lev3 = res.label;
                _this.mcc_cd = res.mcc_cd;
              }
            });
            err.push(res.data.REC[i].mcc_nm);
          }
          _this.addressSlots1[2].values = err;
          //_this.$refs.actionsheet.items = _this.myItems3;
          _this.lev3 = _this.myItems3[0].label;
          _this.mcc_cd = _this.myItems3[0].mcc_cd;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMerType(t) {
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
          _this.addressSlots[2].values = err;
          //_this.$refs.actionsheet2.items = _this.merItems3;
          _this.merLev3 = _this.merItems3[0].label;
          _this.stoe_area_cod = _this.merItems3[0].merc_area;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转协议页面
    jump() {
      this.jumpData();
      var formObj = util.sesstionData("formObj");

      // location.href = `/static/posProtocolShow.html?yi_name=${
      //   this.stoe_cnt_nm
      // }&yi_adress=${this.stoe_adds}&yi_phone=${this.stoe_cnt_tel}&yi_email=${
      //   this.mailbox
      // }&td_2s=0.38&td_3s=0.38&span1=${this.bnk_acnm}&span2=${
      //   this.stl_oac
      // }&span3=${formObj.lev3}`;

      this.$router.push({
        path: `/text?yi_name=${this.stoe_cnt_nm}&yi_adress=${
          this.stoe_adds
        }&yi_phone=${this.stoe_cnt_tel}&yi_email=${
          this.mailbox
        }&td_2s=0.38&td_3s=0.38&span1=${this.bnk_acnm}&span2=${
          this.stl_oac
        }&span3=${formObj.lev3}`
      });
    },
    //页面跳转时候保存数据
    jumpData() {
      var formObj = {};
      //当前页面表单数据
      formObj.stoe_nm = this.stoe_nm; //商户名称
      formObj.stoe_cnt_nm = this.stoe_cnt_nm; //联系人名称
      formObj.stoe_cnt_tel = this.stoe_cnt_tel; //手机号码
      formObj.mailbox = this.mailbox; //邮箱

      formObj.lev1 = this.lev1;
      formObj.lev2 = this.lev2;
      formObj.lev3 = this.lev3;
      formObj.mcc_cd = this.mcc_cd; //商户类型

      formObj.merLev1 = this.merLev1;
      formObj.merLev2 = this.merLev2;
      formObj.merLev3 = this.merLev3;
      formObj.stoe_area_cod = this.stoe_area_cod; //地区码

      formObj.stoe_adds = this.stoe_adds; //详细地址
      //formObj.menums = this.menums; //ME50设备数量
      //图片
      formObj.door_img = this.door_img;
      formObj.foy_img = this.foy_img;
      formObj.choc_img = this.choc_img;
      sessionStorage.setItem("jumpData", JSON.stringify(formObj));
    },
    check() {
      var re = /^[0-9]*$/g;

      if (this.$refs.input1.valid && this.stoe_nm != "") {
      } else {
        this.$dialog.toast({
          mes: "请输入正确的商户名称",
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
      if (this.$refs.input2.valid && this.stoe_cnt_nm != "") {
      } else {
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
      if (this.$refs.input3.valid && this.stoe_cnt_tel != "") {
      } else {
        this.$dialog.toast({
          mes: "请输入正确的手机号码",
          timeout: 2000
        });
        return false;
      }
      if (this.$refs.input4.valid && this.mailbox != "") {
      } else {
        this.$dialog.toast({
          mes: "请输入正确的邮箱信息",
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
      if (this.$refs.input5.valid && this.stoe_adds != "") {
      } else {
        this.$dialog.toast({
          mes: "请输入正确的详细地址信息",
          timeout: 2000
        });
        return false;
      }
      //var obj = util.sesstionData("formObj");

      if (
        (this.door_img == "" || this.door_img == undefined) &&
        (this.foy_img == "" || this.foy_img == undefined) &&
        (this.choc_img == "" || this.choc_img == undefined)
      ) {
        this.$dialog.toast({
          mes: "请上传门头、收银台相关图片",
          timeout: 2000
        });
        return false;
      }
    },
    submit() {
      let _this = this;
      let data2 = {
        token_id: this.token_id,
        opSys: "2",
        usr_no: this.usr_no,
        //当前页面表单数据
        stoe_nm: this.stoe_nm, //商户名称
        stoe_cnt_nm: this.stoe_cnt_nm, //联系人名称
        stoe_cnt_tel: this.stoe_cnt_tel, //手机号码
        mailbox: this.mailbox, //邮箱
        mcc_cd: this.mcc_cd, //商户类型
        stoe_area_cod: this.stoe_area_cod, //地区码
        stoe_adds: this.stoe_adds, //详细地址
        ME50_sdk:this.ME50_sdk, //设备Y
        ME50_num:this.ME50_num, //数量
        //表单参数部分
        icrp_id_no: this.icrp_id_no, //身份证号
        crp_exp_dt_tmp: this.crp_exp_dt_tmp, //身份证号有效期
        stl_oac: this.stl_oac, //结算账户
        bnk_acnm: this.bnk_acnm, //账户户名
        wc_lbnk_no: this.wc_lbnk_no, //开户行
        sn_no: this.sn_no, //sn号
        terminl_num: this.terminl_num, //终端数量
        invite_no: this.invite_no, //邀请码
        //照片
        door_img: _this.door_img, //	门头照 1
        foy_img: _this.foy_img, //	场景照 2
        choc_img: _this.choc_img, //	收银台照 3
        merc_bankcode_img: _this.merc_bankcode_img, //	结算人身份证 4
        mer_con1_img: _this.mer_con1_img,//其他1 ME50手持 8
        mer_con2_img: _this.mer_con2_img, //其他2 人和门店合照 9
        hold_img: _this.hold_img, //	结算人手持身份证 5
        met_img: _this.met_img, //	银行卡照 6
        merc_openbank_img: _this.merc_openbank_img //	开户行许可证照 7
      };
      var url2 = `${api.api}checkMerc.json`;

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
        url: url2,
        data: data2
      })
        .then(res => {
          if (res.data.repCode == "000000") {
              console.log(res);
              if (this.check() == false) {
                console.log("不成功");
              } else {
                console.log("成功");
                if (this.isUpdate) {
                  this.kaihu();
                } else {
                  this.anxinqian("1");
                }
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
          //_this.$dialog.loading.close();
          _this.$dialog.toast({
            mes: `开户校验失败,请重试`,
            timeout: 2000
          });
        });
      
        //安心签注册
        // var data = {
        //   token_id: this.token_id,
        //   opSys: "2",
        //   usr_no: this.usr_no,
        //   serviceId: "4830001", //安心签注册 1
        //   serviceId: "4830011", //获取编号 2
        //   serviceId: "4830101", //发送短信 3
        //   serviceId: "4830102", //验证验证码 4
        //   bnk_acnm: this.bnk_acnm,
        //   icrp_id_no: this.icrp_id_no,
        //   stoe_cnt_tel: this.stoe_cnt_tel,
        //   mailbox: this.mailbox
        // };
        // console.log(data);
        // axios({
        //   method: "post",
        //   url: `http://139.196.141.163:4244/epsn`,
        //   data: data
        // })
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
        // this.show = true;
      
    },
    kaihu() {
      let _this = this;
      _this.$dialog.loading.open("正在提交...");
      let data = {
        token_id: this.token_id,
        opSys: "2",
        usr_no: this.usr_no,
        //当前页面表单数据
        stoe_nm: this.stoe_nm, //商户名称
        stoe_cnt_nm: this.stoe_cnt_nm, //联系人名称
        stoe_cnt_tel: this.stoe_cnt_tel, //手机号码
        mailbox: this.mailbox, //邮箱
        mcc_cd: this.mcc_cd, //商户类型
        stoe_area_cod: this.stoe_area_cod, //地区码
        stoe_adds: this.stoe_adds, //详细地址
        ME50_sdk:this.ME50_sdk, //设备Y
        ME50_num:this.ME50_num, //数量
        //表单参数部分
        icrp_id_no: this.icrp_id_no, //身份证号
        crp_exp_dt_tmp: this.crp_exp_dt_tmp, //身份证号有效期
        stl_oac: this.stl_oac, //结算账户
        bnk_acnm: this.bnk_acnm, //账户户名
        wc_lbnk_no: this.wc_lbnk_no, //开户行
        sn_no: this.sn_no, //sn号
        terminl_num: this.terminl_num, //终端数量
        invite_no: this.invite_no, //邀请码
        //照片
        door_img: _this.door_img, //	门头照 1
        foy_img: _this.foy_img, //	场景照 2
        choc_img: _this.choc_img, //	收银台照 3
        merc_bankcode_img: _this.merc_bankcode_img, //	结算人身份证 4
        mer_con1_img: _this.mer_con1_img,//其他1 ME50手持 8
        mer_con2_img: _this.mer_con2_img, //其他2 人和门店合照 9
        hold_img: _this.hold_img, //	结算人手持身份证 5
        met_img: _this.met_img, //	银行卡照 6
        merc_openbank_img: _this.merc_openbank_img //	开户行许可证照 7
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
          let int = self.setInterval(function() {
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
      // var data = {
      //   token_id: this.token_id,
      //   opSys: "2",
      //   usr_no: this.usr_no,
      //   serviceId: "4830001", //1安心签注册
      //   serviceId: "4830011", //2获取编号
      //   serviceId: "4830101", //3发送短信
      //   serviceId: "4830102", //4验证验证码
      //   bnk_acnm: this.bnk_acnm,
      //   icrp_id_no: this.icrp_id_no,
      //   stoe_cnt_tel: this.stoe_cnt_tel,
      //   mailbox: this.mailbox
      // };
      console.log(data);
      axios({
        method: "post",
        url: `${api.AxqApi}`,
        data: data
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
                _this.kaihu();
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
    getYourIP() {
      let _this = this;
      var RTCPeerConnection =
        window.RTCPeerConnection ||
        window.webkitRTCPeerConnection ||
        window.mozRTCPeerConnection;
      if (RTCPeerConnection)
        (function() {
          var rtc = new RTCPeerConnection({
            iceServers: []
          });
          if (1 || window.mozRTCPeerConnection) {
            rtc.createDataChannel("", {
              reliable: false
            });
          }

          rtc.onicecandidate = function(evt) {
            if (evt.candidate) _this.grepSDP("a=" + evt.candidate.candidate);
          };
          rtc.createOffer(
            function(offerDesc) {
              _this.grepSDP(offerDesc.sdp);
              rtc.setLocalDescription(offerDesc);
            },
            function(e) {
              console.warn("offer failed", e);
            }
          );

          _this.addrs = Object.create(null);
          _this.addrs["0.0.0.0"] = false;
        })();
    },
    grepSDP(sdp) {
      let _this = this;
      var hosts = [];
      sdp.split("\r\n").forEach(function(line, index, arr) {
        if (~line.indexOf("a=candidate")) {
          var parts = line.split(" "),
            addr = parts[4],
            type = parts[7];
          if (type === "host") _this.updateDisplay(addr);
        } else if (~line.indexOf("c=")) {
          var parts = line.split(" "),
            addr = parts[2];
          _this.updateDisplay(addr);
        }
      });
    },
    updateDisplay(newAddr) {
      let _this = this;
      if (newAddr in _this.addrs) return;
      else _this.addrs[newAddr] = true;
      var displayAddrs = Object.keys(_this.addrs).filter(function(k) {
        return _this.addrs[k];
      });
      for (var i = 0; i < displayAddrs.length; i++) {
        if (displayAddrs[i].length > 16) {
          displayAddrs.splice(i, 1);
          i--;
        }
      }
      console.log(`当前ip为${displayAddrs[0]}`);
      _this.ip = displayAddrs[0];
    },
    showpick() {
      this.show2 = true;
      this.stoe_area_cod = "";
      this.addressSlots[0].values = Object.keys(this.aaa);
      this.addressSlots[1].values = [];
      this.addressSlots[2].values = [];
      //_this.addressSlots[1].values = Object.keys(_this.aaa);
    },
    addressChange(value, index) {
      switch (index) {
        case 0:
          this.check1(value);
          console.log(this.merItems1);
          //this.check2(this.city);
          break;
        case 1:
          this.check2(value);
          break;
        case 2:
          this.check3(value);
          break;
      }
      // this.address = [this.province, this.city, this.region];
      //this.deadlineTime = `${this.province}  ${this.city}  ${this.region}`;
    },
    check1(value) {
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

      this.addressSlots[2].values = [];
      //_this.province = value;
      //_this.arr = _this.aaa[value];

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
      for (let i = 0; i < this.merItems2.length; i++) {
        if (value == this.merItems2[i].label) {
          //alert(this.merItems1[i].merc_prov);
          console.log(_this.merItems2[i]);

          _this.getMerType(_this.merItems2[i]);
        }
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
    check3(value) {
      var _this = this;
      for (let i = 0; i < this.merItems3.length; i++) {
        if (value == this.merItems3[i].label) {
          _this.merLev3 = value;
          _this.stoe_area_cod = this.merItems3[i].merc_area;
          // console.log(_this.merItems3[i])
        }
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
      if (this.stoe_area_cod == "") {
        this.$dialog.toast({
          mes: `请选择地区`,
          timeout: 2000
        });
      }
      this.show2 = false;
    },
    showpick1() {
      this.show1 = true;
      this.mcc_cd = "";
      this.addressSlots1[0].values = Object.keys(this.bbb);
      this.addressSlots[1].values = [];
      this.addressSlots[2].values = [];
    },
    addressChange1(value, index) {
      switch (index) {
        case 0:
          this.checkMer1(value);
          break;
        case 1:
          this.checkMer2(value);
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

      for (let i = 0; i < this.myItems1.length; i++) {
        if (value == this.myItems1[i].label) {
          //alert(this.merItems1[i].merc_prov);
          console.log(_this.myItems1[i]);
          _this.load2levels(_this.myItems1[i]);
        }
      }
      _this.lev3 = "";
      _this.mcc_cd = "";

      //_this.province = value;
      //_this.arr = _this.aaa[value];

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
    checkMer2(value) {
      var _this = this;
      for (let i = 0; i < this.myItems2.length; i++) {
        if (value == this.myItems2[i].label) {
          //alert(this.merItems1[i].merc_prov);
          console.log(_this.myItems2[i]);

          _this.getType(_this.myItems2[i]);
        }
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
    checkMer3(value) {
      var _this = this;
      for (let i = 0; i < this.myItems3.length; i++) {
        if (value == this.myItems3[i].label) {
          _this.lev3 = value;
          _this.mcc_cd = _this.myItems3[i].mcc_cd;
          // console.log(_this.merItems3[i])
        }
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
    changediqu1() {
      if (this.mcc_cd == "") {
        this.$dialog.toast({
          mes: `请选择商户类型`,
          timeout: 2000
        });
      }
      this.show1 = false;
    },
    showpick5() {
      this.show5 = true;
      this.shebeiSlots[0].values = Object.keys({"1":[],"2":[],"3":[],"4":[],"5":[]}); //const
    },
    shebeiChange5(value, index) {
      switch (index) {
        case 0:
          this.menums = value
          break
      }
      this.shebei5 = [this.menums]
    },
    changeshebei5() { //确认
      let _this =this;
      _this.show5=false;
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

.yd-cell-left span i {color:#f00;}
</style>
