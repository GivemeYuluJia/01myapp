<template>
  <div>
    <!-- <section> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <!-- </section> -->
    <TabBar v-show="isTabbarShow"></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import { mapState } from 'vuex'
export default {
  components: {
    TabBar
  },
  computed: {
    ...mapState(['isTabbarShow'])
  }
}
</script>
<style scoped>
div{overflow: hidden;height: 100%;}
  /* section{padding-bottom: 52px;} */
</style>>
