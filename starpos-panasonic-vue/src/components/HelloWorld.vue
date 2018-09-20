<template>
  <div class="index">
    <header>
      <img src="../assets/woyaobangding_bg_logo@2x.png">
    </header>
    <div class="main">
      <yd-cell-group>
        <yd-cell-item>

          <input slot="right" type="number" placeholder="请输入手机号">
        </yd-cell-item>

      </yd-cell-group>

    </div>
    <footer></footer>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created() {
      
    },
    methods: {
      
    }
  }
</script>

<style scoped>
</style>