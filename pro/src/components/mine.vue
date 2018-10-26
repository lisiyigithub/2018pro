<template>
	<div id="mine">
		<div>
			<input id="upload_file" type="file" style="display: none;" accept='image/*' name="file"  @change="fileChange($event)"/>
			<div class="image-item space" @click="showActionSheet()">
			<div class="image-up"></div>
			</div>
		
			<div class="upload_warp">
			<div class="upload_warp_img">
				<div class="upload_warp_img_div" v-for="(item,index) in imgList">
				<div class="upload_warp_img_div_top">
					<div class="upload_warp_img_div_del" @click="fileDel(index)">X</div>
				</div>
				<img :src="item.file.src" style="display: inline-block;">
				</div>
				<div class="upload_warp_left" id="upload_warp_left" @click="fileClick()" v-if="this.imgList.length < 6">
				<!--<img src="../assets/upload.png">-->
					<!-- <div class="imgs">+</div> -->
				</div>
			</div>
		
			</div>
		
			<div class="upload_warp_text">
			<span>选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}</span>
			</div>
		</div>

    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
	</div>
</template>

<script>
import $ from 'jquery'
	export default{
		name:"Mine",
		data(){
        return{
          imgList: [],
          datas: new FormData(),
          files:0,
          size:0,
          slots: [
            {
              flex: 1,
              values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
              className: 'slot1',
              textAlign: 'right'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
              className: 'slot3',
              textAlign: 'left'
            }
          ]
        }
      },
      methods:{
        onValuesChange(picker, values) {
          if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
          }
        },
        //调用相册&相机
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
        },

        
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
      }
      }
	}
</script>

<style scoped>
#mine{
	margin-top: 44px;
	margin-bottom: 44px;
}
.imgs{
	width: 100px;
	height: 100px;
	border: 1px solid #ddd;
	text-align: center;
	line-height: 100px;
	font-size: 24px;
}
.upload_warp_left{
	height: 50px;
}
.upload_warp_img_div_del{
	width: 20px;
	height: 18px;
	line-height: 18px;
	text-align: center;
}
</style>