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
        <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
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
    }
  },
  methods: {
    add() {
      let _this = this;
      this.$refs.file.click();
    },
    submit() {
      let _this = this;

      if (this.files.length === 0) {
        console.warn("no file!");
        return;
      }
      //delete _this.formData.srcUrl;
      //console.log(_this.formData.base64_img);
      console.log(_this.formData);
      axios({
        method: "post",
        url: `${api.api}addloadPic`,
        data: _this.formData
      })
        .then(res => {
          console.log(res);
          _this.$dialog.loading.close();
          if (res.data.repCode == "000000") {
            //console.log(util.sesstionData("formObj"));
            let obj = {};
            if (util.sesstionData("formObj") != false) {
              obj = util.sesstionData("formObj");
            }
            console.log(_this.type[this.files.length - 1]);
            switch (_this.type[this.files.length - 1]) {
              case 1:
                obj.door_img = res.data.imgfilepath;
                _this.$parent.door_img = res.data.imgfilepath;
                break;
              case 2:
                obj.foy_img = res.data.imgfilepath;
                _this.$parent.foy_img = res.data.imgfilepath;
                break;
              case 3:
                obj.choc_img = res.data.imgfilepath;
                _this.$parent.choc_img = res.data.imgfilepath;
                break;
              case 4:
                obj.merc_bankcode_img = res.data.imgfilepath;
                _this.$parent.merc_bankcode_img = res.data.imgfilepath;
                break;
              case 5:
                obj.hold_img = res.data.imgfilepath;
                _this.$parent.hold_img = res.data.imgfilepath;
                break;
              case 6:
                obj.met_img = res.data.imgfilepath;
                _this.$parent.met_img = res.data.imgfilepath;
                break;
              case 7:
                obj.merc_openbank_img = res.data.imgfilepath;
                _this.$parent.merc_openbank_img = res.data.imgfilepath;
                break;
              default:
                break;
            }
            // switch (_this.type) {
            //   case 1:
            //     obj.door_img
            //       ? obj.door_img.push(res.data.imgfilepath)
            //       : (obj.door_img = [res.data.imgfilepath]);
            //     break;
            //   case 2:
            //     obj.foy_img
            //       ? obj.foy_img.push(res.data.imgfilepath)
            //       : (obj.foy_img = [res.data.imgfilepath]);
            //     //obj.foy_img.length = res.data.imgfilepath;
            //     break;
            //   case 3:
            //     obj.choc_img
            //       ? obj.choc_img.push(res.data.imgfilepath)
            //       : (obj.choc_img = [res.data.imgfilepath]);
            //     //obj.choc_img.length = res.data.imgfilepath;
            //     break;
            //   case 4:
            //     obj.merc_bankcode_img
            //       ? obj.merc_bankcode_img.push(res.data.imgfilepath)
            //       : (obj.merc_bankcode_img = [res.data.imgfilepath]);
            //     //obj.merc_bankcode_img.length = res.data.imgfilepath;
            //     break;
            //   case 5:
            //     obj.hold_img
            //       ? obj.hold_img.push(res.data.imgfilepath)
            //       : (obj.hold_img = [res.data.imgfilepath]);
            //     //obj.hold_img.length = res.data.imgfilepath;
            //     break;
            //   case 6:
            //     obj.met_img
            //       ? obj.met_img.push(res.data.imgfilepath)
            //       : (obj.met_img = [res.data.imgfilepath]);
            //     //obj.met_img.length = res.data.imgfilepath;
            //     break;
            //   case 7:
            //     obj.merc_openbank_img
            //       ? obj.merc_openbank_img.push(res.data.imgfilepath)
            //       : (obj.merc_openbank_img = [res.data.imgfilepath]);
            //     // obj.merc_openbank_img.length = res.data.imgfilepath;
            //     break;
            //   default:
            //     break;
            // }
            sessionStorage.setItem("formObj", JSON.stringify(obj));
          } else {
            this.$dialog.toast({
              mes: `上传失败,失败原因：${res.data.repMsg}`,
              timeout: 2000,
              callback: () => {
                _this.remove(_this.files.length - 1);
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
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
    fileChanged() {
      const list = this.$refs.file.files;
      if (this.files.length < this.max) {
        for (let i = 0; i < list.length; i++) {
          if (!this.isContain(list[i])) {
            const item = {
              img_name: `${Date.parse(new Date())}.jpg`,
              img_flg: this.flg,
              opSys: "2",
              token_id: this.token_id,
              usr_no: this.usr_no
            };
            this.formData = item;
            //console.log(item); //这是请求数据
            this.html5Reader(list[i], item);
            this.files.push(item);
          }
        }
        this.$refs.file.value = "";
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
        console.log(e.target.result);
        this.$set(
          item,
          "base64_img",
          encodeURIComponent(encodeURIComponent(e.target.result))
         // _this.stringToHex(e.target.result)
          
        );

        console.log("压缩前文件大小" + e.target.result.length);

        if (e.target.result.length <= 500 * 1024) {
          //选中时自动调用提交函数
          this.submit();
        } else {
          console.log("大于500k了");
          var img = new Image();
          img.src = e.target.result;
          if (e.target.result.length >= 2048 * 1024) {
            console.log("大于2m了");
            img.onload = e => {
              this.$set(item, "base64_img", _this.resizeMe(img, 0.01));
              this.submit();
            };
          } else {
            img.onload = e => {
              this.$set(item, "base64_img", _this.resizeMe(img, 0.2));
              this.submit();
            };
          }
        }
      };
      reader.readAsDataURL(file);
    },
    //图片压缩函数
    resizeMe(img, num) {
      var canvas = document.createElement("canvas"), //创建canvas元素
        width = img.width, //确保canvas的尺寸和图片一样
        height = img.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height); //将图片绘制到canvas中
      var dataURL = canvas.toDataURL("image/jpeg", num); //转换图片为dataURL

      console.log(dataURL);
      console.log("压缩后文件大小" + dataURL.length);
      return dataURL;
    },
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