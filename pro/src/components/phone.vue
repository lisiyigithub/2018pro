<template>

<div class="mui-content">

<button @click="galleryImg">从相册选取</button>

<button @click="captureImage">拍照</button>

<div class="imgBox">

<img :src="imgSrc">

</div>

</div>

</template>

 

<script>

export default{
    name:"Phone",

data(){

return{

imgSrc:''//展示的图片路径

}

},

methods:{

// 从相册中选取图片

galleryImg(){

let This=this

console.log("从相册中选择图片:");

plus.gallery.pick( function(path){//从相册中选择图片

This.imgSrc=path

     alert(path);

}, function ( e ) {//取消选择图片

     console.log( "取消选择图片" );

}, {filter:"image"} );

},

// 拍照

captureImage(){

let This=this

var cmr = plus.camera.getCamera();//获取摄像头管理对象

     var res = cmr.supportedImageResolutions[0];//字符串数组，摄像头支持的拍照分辨率

     var fmt = cmr.supportedImageFormats[0];//字符串数组，摄像头支持的拍照文件格式

     console.log("拍照分辨率: "+res+", 拍照文件格式: "+fmt);

     cmr.captureImage( function( path ){//进行拍照操作

// 通过URL参数获取目录对象或文件对象

plus.io.resolveLocalFileSystemURL(path, function(entry) {

var tmpPath= entry.toLocalURL();//获取目录路径转换为本地路径URL地址

This.imgSrc=tmpPath

alert( "拍摄成功: " + tmpPath)

})

         },

         function( error ) {//捕获图像失败回调

             alert( "捕获图像失败: " + error.message );

         },

         {resolution:res,format:fmt}

     );

}

}

}

</script>

 

<style scoped>

.imgBox{

width: 450px;

height:400px;

}

.imgBox img{

width: 100%;

height: 100%;

}

</style>