<template>
 <div class="container">
  <header>
    <slot name="header">我是备用header</slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer">我是备用footer</slot>
  </footer>
</div>
</template>
<script>
export default {
  name: 'container',
  data() {
    return {};
  },
  created(){

  },
};
</script>
<style>

</style>

