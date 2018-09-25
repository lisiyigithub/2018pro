<template>
    <div id="detail">
        <header class="mui-bar mui-bar-nav mn-head">
			详情
		</header>
        <div class="content">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">
                        身份证号
                    </span>
                    <yd-input slot="right" placeholder="请输入身份证号码"></yd-input>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">
                        身份证有效期
                    </span>
                    <yd-datetime type="time" slot="right" v-model="datetime"></yd-datetime>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        结算账号
                    </span>
                    <yd-input slot="right" placeholder="只支持储蓄卡"></yd-input>
                </yd-cell-item>
                 <yd-cell-item>
                    <span slot="left">
                        账户户名
                    </span>
                    <yd-input slot="right" placeholder="请输入账户户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">
                        开户支行
                    </span>
                    <span slot="right"></span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        商户名称
                    </span>
                    <yd-input slot="right" placeholder="请输入商户名称"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        联系人
                    </span>
                    <yd-input slot="right" placeholder="请输入联系人"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        手机号码
                    </span>
                    <span slot="right">12345678</span>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">
                        商户类型
                    </span>
                    <span slot="right">右边内容一</span>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">
                        商户地址
                    </span>
                    <span slot="right">右边内容一</span>
                </yd-cell-item>
                <yd-cell-item>
                    <yd-input slot="right" placeholder="详细地址"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
            <div class="tit">
                <span>
                    银行卡上传
                </span>
            </div>
            <!-- <label>照相机</label>
            <input id="fileBtn" type="file" onchange="upload('#fileBtn', '#img');" accept="image/*" capture="camera"/>
            <img src="" id="img"/> -->
            <div>
                <input id="upload_file" type="file" style="display: none;" accept='image/*' name="file"  @change="fileChange($event)"/>
                <div class="image-item space" @click="showActionSheet()">
                    <div class="image-up"></div>
                </div>
            
                <div class="upload_warp">
                    <div class="upload_warp_img">
                        <div class="upload_warp_img_div" v-for="(item,index) in imgList">
                            <div class="upload_warp_img_div_top">
                                <img src="http://114.115.162.39/static/image/x.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                            </div>
                            <img :src="item.file.src" style="display: inline-block;">
                        </div>
                        <div class="upload_warp_left" id="upload_warp_left" @click="fileClick()" v-if="this.imgList.length < 6">
                        <!--<img src="../assets/upload.png">-->
                        <!-- <img src="../assets/images/添加图片.png" class="imgs"/> -->
                            <div>+</div>
                        </div>
                    </div>
            
                </div>
            
                <div class="upload_warp_text">
                <span>选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}</span>
                </div>
            </div>

            <div class="tit">
                <span>
                    证件上传
                </span>
            </div>
            <label>摄像机</label>
    <input type="file" id='video' accept="video/*" capture='camcorder'>
        </div>   
        <!-- <div class="con">
            成功
        </div>
        <button @click="change">更改</button>     -->
        <!-- success -->
        <div class="succ_out">
            <div class="succ_inner">
                <div>
                    <img src="../images/icon_success@2x.png" alt="">
                </div>              
                <h3>提交成功</h3>
                <p>我们会尽快审核,您可在商户中查看审核结果</p>
                <button>确认</button>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    name:"Detail",
    data(){
        return{
            datetime:"",
            imgList: [],
            datas: new FormData(),
            files:0,
            size:0

        }
    },   
    methods:{
        // upload(c, d){
        //     // "use strict";
        //     var $c = document.querySelector(c),
        //         $d = document.querySelector(d),
        //         file = $c.files[0],
        //         reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     reader.onload = function(e){
        //         $d.setAttribute("src", e.target.result);
        //     };
        // },
        change(){//改变提现页面内容页面
        //    $('.content').html(`
        //     <div class="succ">成功</div>
        //    `) //内容替换
            $('body').css('background','#fff')//改变背景色
            $('.content').hide()
            $('.con').show()
        },
        fileClick() {
          $('#upload_file').click();
 
        },
        //调用手机摄像头并拍照
        getImage() {
          let cmr = plus.camera.getCamera();
          cmr.captureImage(function(p) {
            plus.io.resolveLocalFileSystemURL(p, function(entry) {
              compressImage(entry.toLocalURL(),entry.name);
            }, function(e) {
              plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            });
          }, function(e) {
          }, {
            filter: 'image'
          });
        },
        //从相册选择照片
        galleryImgs() {
          plus.gallery.pick(function(e) {
            let name = e.substr(e.lastIndexOf('/') + 1);
            compressImage(e,name);
          }, function(e) {
          }, {
            filter: "image"
          });
        },
        //点击事件，弹出选择摄像头和相册的选项
        showActionSheet() {
          let bts = [{
            title: "拍照"
          }, {
            title: "从相册选择"
          }];
          plus.nativeUI.actionSheet({
              cancel: "取消",
              buttons: bts
            },
            function(e) {
              if (e.index == 1) {
                this.getImage();
              } else if (e.index == 2) {
                this.galleryImgs();
              }
            }
          );
        },
        fileChange(el) {
          this.files=$("#upload_file").get(0).files;
          console.log(this.files.length);
          for(let i=0;i<this.files.length;i++){
            this.datas.append("file",this.files[i]);
          }
          this.show1=false;
          console.log(typeof this.files);
          console.log(this.files);
          if (!el.target.files[0].size) return;
          this.fileList(el.target);
          el.target.value = ''
        },
        fileList(fileList) {
          let files = fileList.files;
          for (let i = 0; i < files.length; i++) {
            //判断是否为文件夹
            if (files[i].type != '') {
              this.fileAdd(files[i]);
            } else {
              //文件夹处理
              this.folders(fileList.items[i]);
            }
          }
        },
        //文件夹处理
        folders(files) {
          let _this = this;
          //判断是否为原生file
          if (files.kind) {
            files = files.webkitGetAsEntry();
          }
          files.createReader().readEntries(function (file) {
            for (let i = 0; i < file.length; i++) {
              if (file[i].isFile) {
                _this.foldersAdd(file[i]);
              } else {
                _this.folders(file[i]);
              }
            }
          })
        },
        fileAdd(file) {
          //总大小
          this.size = this.size + file.size;
          //判断是否为图片文件
          if (file.type.indexOf('image') == -1) {
            file.src = 'wenjian.png';
            this.imgList.push({
              file
            });
          } else {
            let reader = new FileReader();
            reader.vue = this;
            reader.readAsDataURL(file);
            reader.onload = function () {
              file.src = this.result;
              this.vue.imgList.push({
                file
              });
            }
          }
        },
        fileDel(index) {
          this.size = this.size - this.imgList[index].file.size;//总大小
          this.imgList.splice(index, 1);
        },
        bytesToSize(bytes) {
          if (bytes === 0){
            return '0 B';
          }
          let k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
          return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        dragenter(el) {
          el.stopPropagation();
          el.preventDefault();
        },
        dragover(el) {
          el.stopPropagation();
          el.preventDefault();
        },
        drop(el) {
          el.stopPropagation();
          el.preventDefault();
          this.fileList(el.dataTransfer);
        },
        shows(et,tx){
          this.strut=et;
          this.txt=tx;
        },
        handleClick(){
          this.$store.commit('add')
        }
    }
}
</script>
<style scoped="">
.con{
    color: red;
    display: none;
}
.succ_out{
    position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0,.4);
	z-index: 666;
    display: none;
}
.succ_inner{
    width: 268px;
    height: 220px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background:#fff;
}
.succ_inner>div{
    height: 45px;
    margin-top: 20px;
}
.succ_inner>div img{
    width: 45px;
    height: 45px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
}
.succ_inner h3{
    line-height: 50px;
    font-size: 16px;
}
.succ_inner p{
    line-height: 20px;
    margin: 0 15px 16px;
    font-size: 14px;
}
.succ_inner button{
    width: 100%;
    border: none;
    line-height: 50px;
    border-top: 1px solid #D8D8D8;
    color:#25A2F2; 
}
</style>


