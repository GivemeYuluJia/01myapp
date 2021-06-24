<template>
    <div>
      <div>个人中心</div>
      <div>用户名: {{$store.state.user.username}}</div>
      <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="_bblank">进入管理后台</a> </div>
      <div v-else>用户身份：普通会员</div>
      <div>
        <input type="file" name="file" value="头像上传" @change="handleToUpload">
        <img :src="$store.state.user.userHead" alt="" class="userHead">
      </div>
      <button @click="handleToLoginout()">退出</button>
    </div>
</template>

<script>
import axios from 'axios'
import { messageBox } from '@/components/JS'

export default {
  name: 'Mine',
  methods: {
    handleToLoginout() {
      this.axios.get('/api/users/loginout').then((res) => {
        const ststus = res.data.status
        if (ststus === 0) {
          localStorage.removeItem('username')
          localStorage.removeItem('isAdmin')
          this.$store.commit('user/USER_NAME', { username: '', isAdmin: false, userHead: '' })
          this.$router.push('/center/login')
        }
      })
    },
    handleToUpload(ev) {
      var file = ev.target.files[0]
      var param = new FormData()
      param.append('file', file, file.name)
      // 指定上传文件头信息
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // console.log(ev)
      this.axios.post('/api/users/uploadUserHead', param, config).then((res) => {
        const status = res.data.status
        const self = this
        if (status === 0) {
          messageBox({
            title: '信息',
            content: '头像上传成功',
            ok: '确定',
            handleOk() {
              self.$store.commit('user/USER_NAME', {
                username: self.$store.state.user.username,
                isAdmin: self.$store.state.user.isAdmin,
                // 有缓存
                userHead: res.data.data.userHead + '?' + Math.random()
              })
            }
          })
        } else {
          messageBox({
            title: '信息',
            content: '头像上传失败',
            ok: '确定',
            handleOk() {

            }
          })
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
            isAdmin: res.data.data.isAdmin,
            userHead: res.data.data.userHead
          })
        })// 通过 `vm` 访问组件实例
      } else {
        next('/center/login')
      }
    })
  }

}
</script>
<style scoped>
 .userHead{width: 100px;height: 100px;border-radius: 50%;overflow: hidden;}
</style>
