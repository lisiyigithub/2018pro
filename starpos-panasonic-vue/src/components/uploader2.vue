<template>
    <div class="vue-uploader">
        <div class="file-list">
           
            <section v-for="(file, index) of files" class="file-item draggable-item">
                <img :src="file.srcUrl" alt="" ondragstart="return false;" class="IMG">
                <!-- <p class="file-name">{{file.name}}</p> -->
                <span class="file-remove" @click="remove(index)">+</span>
            </section>
            <section v-if="status == 'ready'" class="file-item">
                <div @click="add" class="add">
                    <span>+</span>
                </div>
            </section>
            
        </div>
        <!-- <section v-if="files.length != 0" class="upload-func">
            <div class="progress-bar">
               
                <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
            </div>
            <div class="operation-box">
                <button v-if="status == 'ready'" @click="submit">上传</button>
                <button v-if="status == 'finished'" @click="finished">完成</button>
            </div>
        </section> -->
        <input type="file" accept="image/*"  ref="file" multiple="multiple">
    </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import util from "../utils/util";
import api from "../api/api";
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      //公共参数
      timestamp: "", // 必填，生成签名的时间戳
      nonceStr: "ds121221ds", // 必填，生成签名的随机串
      signature: "", // 必填，签名，见附录1

      token_id: "", //201710210000013868
      usr_no: "", //000000005028

      status: "ready",
      files: [],
      point: {},
      uploading: false,
      percent: 0,
      formData: "", //请求数据
      //照片部分
      door_img: "", //	门头照 1
      foy_img: "", //	场景照 2
      choc_img: "", //	收银台照 3
      merc_bankcode_img: "", //	结算人身份证 4
      hold_img: "", //	结算人手持身份证 5
      met_img: "", //	银行卡照 6
      merc_openbank_img: "" //	开户行许可证照 7
    };
  },
  props: ["max", "srcUrl", "flg", "type"],
  created() {
    //获取公共参数
    if (util.sesstionData("PublicParams") != false) {
      var paramsObj = util.sesstionData("PublicParams");
      this.token_id = paramsObj.token_id;
      this.usr_no = paramsObj.usr_no;
      this.lody();
    }
  },
  methods: {
    add() {
      
      // this.$refs.file.click();
      wx.ready(function() {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            wx.getLocalImgData({
              localId: res.localIds[0],
              success: function(res) {
                alert(res.localData)
                var localData = res.localData;
                //alert(JSON.stringify(localData));
                //将base64转成文件流
                _this.fileChanged(_this.convertBase64UrlToBlob(localData));
                //formData.append("imageName", _this.convertBase64UrlToBlob(localData)); //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
              }
            });
          }
        });
      });
    },
    // submit(blob) {
    //   let _this = this;

    //   if (this.files.length === 0) {
    //     console.warn("no file!");
    //     return;
    //   }
    //   //delete _this.formData.srcUrl;
    //   //console.log(_this.formData.base64_img);
    //   console.log(_this.formData);
    //   axios({
    //     method: "post",
    //     url: `${api.api}addloadPic`,
    //     data: _this.formData
    //   })
    //     .then(res => {
    //       console.log(res);
    //       _this.$dialog.loading.close();
    //       if (res.data.repCode == "000000") {
    //         //console.log(util.sesstionData("formObj"));
    //         let obj = {};
    //         if (util.sesstionData("formObj") != false) {
    //           obj = util.sesstionData("formObj");
    //         }
    //         console.log(_this.type[this.files.length - 1]);
    //         switch (_this.type[this.files.length - 1]) {
    //           case 1:
    //             obj.door_img = res.data.imgfilepath;
    //             _this.$parent.door_img = res.data.imgfilepath;
    //             break;
    //           case 2:
    //             obj.foy_img = res.data.imgfilepath;
    //             _this.$parent.foy_img = res.data.imgfilepath;
    //             break;
    //           case 3:
    //             obj.choc_img = res.data.imgfilepath;
    //             _this.$parent.choc_img = res.data.imgfilepath;
    //             break;
    //           case 4:
    //             obj.merc_bankcode_img = res.data.imgfilepath;
    //             _this.$parent.merc_bankcode_img = res.data.imgfilepath;
    //             break;
    //           case 5:
    //             obj.hold_img = res.data.imgfilepath;
    //             _this.$parent.hold_img = res.data.imgfilepath;
    //             break;
    //           case 6:
    //             obj.met_img = res.data.imgfilepath;
    //             _this.$parent.met_img = res.data.imgfilepath;
    //             break;
    //           case 7:
    //             obj.merc_openbank_img = res.data.imgfilepath;
    //             _this.$parent.merc_openbank_img = res.data.imgfilepath;
    //             break;
    //           default:
    //             break;
    //         }

    //         sessionStorage.setItem("formObj", JSON.stringify(obj));
    //       } else {
    //         this.$dialog.toast({
    //           mes: `上传失败,失败原因：${res.data.repMsg}`,
    //           timeout: 2000,
    //           callback: () => {
    //             _this.remove(_this.files.length - 1);
    //           }
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       _this.$dialog.loading.close();
    //       this.$dialog.toast({
    //         mes: "上传失败,请重试",
    //         timeout: 2000,
    //         callback: () => {
    //           _this.remove(_this.files.length - 1);
    //         }
    //       });
    //     });
    // },
    submit(filedata) {
      alert("图片上传");
      let _this = this;
      // if (this.files.length === 0) {
      //   console.warn("no file!");
      //   return;
      // }
      console.log(name);

      console.log(filedata);
      var formData = new FormData();
      //formData.append("file", $Blob ,"file_"+Date.parse(new Date())+".png");
      formData.append("file", filedata);
      formData.append("img_flg", _this.flg);
      console.log(formData);
      //console.log(`http://139.196.141.163:8480/mweb/common/fileUploadCallbackpic.jsp?FolderName=/data/merc/201802/05/2011/&fil_nm=111.jpg&random_nm=${Math.random()}`)
      $.ajax({
        url: `${
          api.imgApi
        }mweb/common/fileUploadCallbackpic.jsp?FolderName=/data/merc/${new Date().getFullYear()}/${new Date().getMonth() +
          1}/${new Date().getUTCDate()}/${new Date().getHours()}/&fil_nm=111.jpg&random_nm=${Math.random()}`,
        type: "POST",
        cache: false,
        data: formData,
        processData: false,
        contentType: false
      })
        .done(function(res) {
          console.log(res)
          res = JSON.parse(res);
          alert(res);
          console.log(res);
          console.log(res.GWA.MSG_CD);
          _this.$dialog.loading.close();
          if (res.GWA.MSG_CD == "SCM00000") {
            //console.log(util.sesstionData("formObj"));
            let obj = {};
            if (util.sesstionData("formObj") != false) {
              obj = util.sesstionData("formObj");
            }

            console.log(_this.type[_this.files.length - 1]);
            switch (_this.type[_this.files.length - 1]) {
              case 1:
                obj.door_img = res.GWA.imgfilepath;
                _this.$parent.door_img = res.GWA.imgfilepath;
                break;
              case 2:
                obj.foy_img = res.GWA.imgfilepath;
                _this.$parent.foy_img = res.GWA.imgfilepath;
                break;
              case 3:
                obj.choc_img = res.GWA.imgfilepath;
                _this.$parent.choc_img = res.GWA.imgfilepath;
                break;
              case 4:
                obj.merc_bankcode_img = res.GWA.imgfilepath;
                _this.$parent.merc_bankcode_img = res.GWA.imgfilepath;
                break;
              case 5:
                obj.hold_img = res.GWA.imgfilepath;
                _this.$parent.hold_img = res.GWA.imgfilepath;
                break;
              case 6:
                obj.met_img = res.GWA.imgfilepath;
                _this.$parent.met_img = res.GWA.imgfilepath;
                break;
              case 7:
                obj.merc_openbank_img = res.GWA.imgfilepath;
                _this.$parent.merc_openbank_img = res.GWA.imgfilepath;
                break;
              default:
                break;
            }

            sessionStorage.setItem("formObj", JSON.stringify(obj));
          } else {
            this.$dialog.toast({
              mes: `上传失败,请重试`,
              timeout: 2000,
              callback: () => {
                _this.remove(_this.files.length - 1);
              }
            });
          }
        })
        .fail(function(res) {
          console.log(res)
          console.log(JSON.parse(res));
          alert(JSON.parse(res));
          _this.$dialog.loading.close();
          this.$dialog.toast({
            mes: "上传失败,请重试",
            timeout: 2000,
            callback: () => {
              _this.remove(_this.files.length - 1);
            }
          });
        });
    },
    finished() {
      this.files = [];
      this.status = "ready";
    },
    remove(index) {
      let _this = this;
      this.files.splice(index, 1);

      if (util.sesstionData("formObj") != false) {
        let obj = util.sesstionData("formObj");

        console.log(_this.type[index]);
        switch (_this.type[index]) {
          case 1:
            obj.door_img = "";
            break;
          case 2:
            obj.foy_img = "";
            break;
          case 3:
            obj.choc_img = "";
            break;
          case 4:
            obj.merc_bankcode_img = "";
            break;
          case 5:
            obj.hold_img = "";
            break;
          case 6:
            obj.met_img = "";
            break;
          case 7:
            obj.merc_openbank_img = "";
            break;
          default:
            break;
        }
        // //删除照片
        // switch (_this.type) {
        //   case 1:
        //     obj.door_img.splice(index, 1);
        //     break;
        //   case 2:
        //     obj.foy_img.splice(index, 1);
        //     break;
        //   case 3:
        //     obj.choc_img.splice(index, 1);
        //     break;
        //   case 4:
        //     obj.merc_bankcode_img.splice(index, 1);
        //     break;
        //   case 5:
        //     obj.hold_img.splice(index, 1);
        //     break;
        //   case 6:
        //     obj.met_img.splice(index, 1);
        //     break;
        //   case 7:
        //     obj.merc_openbank_img.splice(index, 1);
        //     break;
        //   default:
        //     break;
        // }
        sessionStorage.setItem("formObj", JSON.stringify(obj));
      }
    },
    fileChanged(filedata) {
      alert("啦啦啦");
      let _this = this;
      _this.submit(filedata);
      // const list = this.$refs.file.files;
      // console.log(this.$refs.file)
      //  console.log(this.$refs.file.files)
      // console.log(list)
      if (this.files.length < this.max) {
        // for (let i = 0; i < list.length; i++) {
        //   if (!this.isContain(list[i])) {
        const item = {
          //img_name: `${Date.parse(new Date())}.jpg`,
          img_flg: this.flg,
          opSys: "2"
          //token_id: this.token_id,
          // usr_no: this.usr_no
        };
        // console.log(list[i]);
        // var formData = new FormData();
        // formData.append("file", list[i]);
        // console.log(formData)
        // var reader = new FileReader();
        // reader.readAsArrayBuffer(list[i]);

        // console.log(list[i]);
        // reader.onload = function() {
        //   var blob = new Blob([reader.result]);
        //   //提交到服务器

        _this.submit(filedata);
        //   // fd.append("file", blob);
        // };
        //this.formData = item;
        //console.log(item); //这是请求数据
        //this.html5Reader(filedata, item);
        this.files.push(item);
        //   }
        // }
        // this.$refs.file.value = "";
        this.$dialog.loading.open("图片上传中...");
      } else {
        console.log("超过了");
      }
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      let _this = this;
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "srcUrl", e.target.result);
        //console.log(e.target.result)
        this.$set(
          item,
          "base64_img",
          encodeURIComponent(encodeURIComponent(e.target.result))
        );

        console.log("压缩前文件大小" + e.target.result.length);

        // if (e.target.result.length <= 500 * 1024) {
        //   //选中时自动调用提交函数
        //   this.submit();
        // } else {
        //   console.log("大于500k了");
        //   var img = new Image();
        //   img.src = e.target.result;
        //   if (e.target.result.length >= 2048 * 1024) {
        //     console.log("大于2m了");
        //     img.onload = e => {
        //       this.$set(item, "base64_img", _this.resizeMe(img, 0.01));
        //       this.submit();
        //     };
        //   } else {
        //     img.onload = e => {
        //       this.$set(item, "base64_img", _this.resizeMe(img, 0.2));
        //       this.submit();
        //     };
        //   }
        // }
      };
      reader.readAsDataURL(file);
    },
    //图片压缩函数
    // resizeMe(img, num) {
    //   var canvas = document.createElement("canvas"), //创建canvas元素
    //     width = img.width, //确保canvas的尺寸和图片一样
    //     height = img.height;
    //   canvas.width = width;
    //   canvas.height = height;
    //   canvas.getContext("2d").drawImage(img, 0, 0, width, height); //将图片绘制到canvas中
    //   var dataURL = canvas.toDataURL("image/jpeg", num); //转换图片为dataURL

    //   console.log(dataURL);
    //   console.log("压缩后文件大小" + dataURL.length);
    //   return dataURL;
    // },
    isContain(file) {
      this.files.forEach(item => {
        if (item.name === file.name && item.size === file.size) {
          return true;
        }
      });
      return false;
    },
    uploadProgress(evt) {
      const component = this;
      if (evt.lengthComputable) {
        const percentComplete = Math.round(evt.loaded * 100 / evt.total);
        component.percent = percentComplete / 100;
      } else {
        console.warn("upload progress unable to compute");
      }
    },
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
            jsApiList: ["scanQRCode", "chooseImage", "getLocalImgData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.error(function(res) {
            alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
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
    convertBase64UrlToBlob(urlData) {
      // var u = navigator.userAgent;
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var bytes = urlData;
      // if (isiOS) {
      //   bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
      // }
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
     // var blob = new File([ab], { type: "image/png" });
      var blob = new File([ab],'222.png',{type: "image/png"});  
      console.log(blob)
      // alert(JSON.stringify(blob));
      return blob;
    }
  }
};
</script>
<style>
.vue-uploader {
  border: 1px solid #e5e5e5;
  height: 3.2rem;
}
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 100px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 80px;
  height: 80px;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 12px;
  display: none;
  top: 4px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 80px;
  border: 1px dashed #ececec;
  font-size: 30px;
  cursor: pointer;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.vue-uploader > input[type="file"] {
  display: none;
}
</style>