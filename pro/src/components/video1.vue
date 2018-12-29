<template>
  <div class="look-v">
    <section class="view-wrap" v-if="accObj">
      <div class="v-im" :class="[{'sub-center': accObj.coursewareList.length%4 == 0||accObj.coursewareList.length == 10},{'justCenter':accObj.coursewareList.length <3}]">
        <div v-if="accObj.coursewareList.length != 0" v-for="(item,index) in accObj.coursewareList" :key="index">
          <div class="view" v-if="item.type != 'mp4'" @click="toIndexbig(accObj.coursewareList,item,index)">
            <img class="img" ref="img" v-if="item.coursewarePath" :src="`${item.coursewarePath}?x-oss-process=image/resize,l_100`" :onerror="`this.src = '${defaultImg}`" alt="">
            <span class="error-tip" v-else>暂无图片</span>
          </div>
          <div v-else class="v-vo" @click='toMovie(item)'>
            <img class="img" ref="img" v-if="item.coursewareName" src="../assets/logo.png">
            <span class="error-tip" v-else>暂无图片</span>
          </div>
        </div>
        <div class="v-dec" v-if="accObj.coursewareList[0].type != 'mp4'">
          <i class="icon icon-big"></i>
          <span>点击图片放大</span>
        </div>
      </div>
    </section>
    <div class="video-player-box" @click="showVideo('none')">
      <i class="close"></i>
      <video-player @error="onError($event)" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @statechanged="playerStateChanged($event)" @ended="onPlayerEnded($event)" :options="playerOptions" :playsinline="true" ref="videoPlayer" />
    </div>
  </div>
</template>
 
<script>
import { videoPlayer } from "vue-video-player";
// import "../../../static/css/video-js.css";
require("videojs-contrib-hls");
export default {
  props: ["accObj"],
  components: { videoPlayer },
  data() {
    return {
      defaultImg: require('../assets/share_logo.png'),
      playerOptions: {},
      playerOption: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        // aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  methods: {
    toMovie(item) {
      if (item.coursewarePath) {
        this.showVideo("block");
        const type = item.coursewarePath.split("/");
        if (type[type.length - 1].indexOf(".m3u8") >= 0) {
          this.playerOptions = {
            sources: [
              {
                src: item.coursewarePath,
                type: "application/x-mpegURL"
              }
            ],
            ...this.playerOption
          };
        } else {
          this.playerOptions = {
            sources: [
              {
                src: item.coursewarePath,
                type: "video/mp4"
              }
            ],
            ...this.playerOption
          };
        }
      }
    },
    showVideo(type) {
      document.querySelector(".video-player-box").style.display = type;
      if (type == "none") {
        const Player = this.$refs.videoPlayer.player;
        Player.pause();
      }
    },
    toIndexbig(obj,item,index) {
      let viewIndex = obj.filter(item =>{return item.type != 'mp4'}).indexOf(item);
      this.accObj.viewindex = viewIndex;
      this.$emit("toIndexbig", this.accObj);
    },
    onPlayerPlay(player) {
       //全屏播放
      if (!player.isFullscreen()) {
        player.requestFullscreen();
        player.isFullscreen(true);
      } else {
        player.exitFullscreen();
        player.isFullscreen(false);
      }
    },
    playerStateChanged(player) {
      // console.log(player);
    },
    onPlayerPause(player) {
      console.log("Pause");
    },
    onPlayerEnded(player) {
      console.log("end");
    },
    onError(player, item, index) {
      // this.optionArr[index].sources[0].src = item.coursewarePath;
    },
    getFileUrl(item) {
      var arr = item.coursewarePath.split("/");
      var fileName = arr[arr.length - 1];
      return `static/images/${fileName}`;
    }
  }
};
</script>
