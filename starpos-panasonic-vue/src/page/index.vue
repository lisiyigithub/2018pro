<template>
  <container class="index1">
    <yd-navbar slot="header">
      <router-link to="#" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </router-link>

      <img slot="center" src="http://static.ydcss.com/www/img/logo.png" />

      <router-link to="#" slot="right">
        <yd-navbar-next-icon>前进</yd-navbar-next-icon>
      </router-link>
    </yd-navbar>

  </container>
</template>
<script>
  import container from "../components/container";
  import axios from "axios";
  import api from "../api/api.js";
  export default {
    components: {
      container: container
    },
    created() {
      axios({
          method: "post",
          url: "http://localhost:3000/bbb",
          data: {}
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      try {
        this.getIPs(function (ip) {
          console.log("ip地址:" + ip);
        })
      } catch (error) {

      }
    },
    methods: {
      getIPs(callback) {
        var ip_dups = {};
        var RTCPeerConnection = window.RTCPeerConnection ||
          window.mozRTCPeerConnection ||
          window.webkitRTCPeerConnection;
        var useWebKit = !!window.webkitRTCPeerConnection;
        if (!RTCPeerConnection) {
          var win = iframe.contentWindow;
          RTCPeerConnection = win.RTCPeerConnection ||
            win.mozRTCPeerConnection ||
            win.webkitRTCPeerConnection;
          useWebKit = !!win.webkitRTCPeerConnection;
        }

        var mediaConstraints = {
          optional: [{
            RtpDataChannels: true
          }]
        };

        var servers = {
          iceServers: [{
            urls: "stun:stun.l.google.com:19302"
          }]
        };

        var pc = new RTCPeerConnection(servers, mediaConstraints);

        function handleCandidate(candidate) {
          var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
          var ip_addr = ip_regex.exec(candidate)[1];

          if (ip_dups[ip_addr] === undefined)
            callback(ip_addr);
          ip_dups[ip_addr] = true;
        }

        pc.onicecandidate = function (ice) {
          if (ice.candidate)
            handleCandidate(ice.candidate.candidate);
        };

        pc.createDataChannel("");

        pc.createOffer(function (result) {

          pc.setLocalDescription(result, function () {}, function () {});

        }, function () {});

        setTimeout(function () {
          var lines = pc.localDescription.sdp.split('\n');
          lines.forEach(function (line) {
            if (line.indexOf('a=candidate:') === 0)
              handleCandidate(line);
          });
        }, 1000);
      }
    },
  };
</script>
<style>
</style>