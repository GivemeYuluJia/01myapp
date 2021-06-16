<template>
    <div>
        <Header title="我的Y颜"></Header>
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Center',
  components: {
    Header
  }
}
</script>
