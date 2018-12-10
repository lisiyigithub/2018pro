<template>
  <div id="app">
    <router-view/>
    <!--<v-demo></v-demo>-->
  </div>
</template>

<script>
	import Demo from './components/demo.vue'
export default {
  name: 'App',
  components:{
  	'v-demo':Demo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
 /*background:red;*/
}
*{
	margin: 0;
	padding: 0;
}
</style>
