<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- 当两个路由都渲染同一个组件的时候，进行路由切换时，组件的生命周期函数(created,mounted等)不会调用，组件会重用，所以需要
      给router-view添加一个唯一的key，来保证路由切换的时候可以重新调用组件的生命周期函数，确保组件重新初始化 -->
      <router-view :key="key"></router-view>
      <!-- <router-view/> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
