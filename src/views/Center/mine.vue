<template>
    <div>
      <div>个人中心</div>
      <div>用户名: {{$store.state.user.username}}</div>
      <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="_bblank">进入管理后台</a> </div>
      <div v-else>用户身份：普通会员</div>
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
          localStorage.removeItem('username')
          localStorage.removeItem('isAdmin')
          this.$store.commit('user/USER_NAME', { username: '', isAdmin: false })
          this.$router.push('/center/login')
        }
      })
    }
  },
  // 局部路由守卫
  beforeRouteEnter (to, from, next) {
    axios.get('/api/users/getUser').then((res) => {
      // console.log('getUser', res)
      const ststus = res.data.status
      if (ststus === 0) {
        next(vm => {
          localStorage.setItem('username', res.data.data.username)
          localStorage.setItem('isAdmin', res.data.data.isAdmin)
          vm.$store.commit('user/USER_NAME', {
            username: res.data.data.username,
            isAdmin: res.data.data.isAdmin
          })
        })// 通过 `vm` 访问组件实例
      } else {
        next('/center/login')
      }
    })
  }

}
</script>
