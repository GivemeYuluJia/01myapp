<template>
    <div>
      <div>个人中心</div>
      <div>用户名: {{$store.state.user.username}}</div>
      <button @click="handleToLoginout()">退出</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Mine',
  methods: {
    handleToLoginout() {
      this.axios.get('/api/users/loginout').then((res) => {
        const ststus = res.data.status
        if (ststus === 0) {
          this.$store.commit('user/USER_NAME', { username: '' })
          this.$router.push('/center/login')
        }
      })
    }
  },
  // 局部路由守卫
  beforeRouteEnter (to, from, next) {
    axios.get('/api/users/getUser').then((res) => {
      console.log('getUser', res)
      const ststus = res.data.status
      if (ststus === 0) {
        next(vm => {
          vm.$store.commit('user/USER_NAME', { username: res.data.data.username })
        })// 通过 `vm` 访问组件实例
      } else {
        next('/center/login')
      }
    })
  }

}
</script>
