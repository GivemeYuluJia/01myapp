<template>
  <div>
    <!-- <section> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <!-- </section> -->
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  components: {
    TabBar
  }
}
</script>
<style scoped>
div{overflow: hidden;height: 100%;}
  /* section{padding-bottom: 52px;} */
</style>>
