<template>
    <div class="login_body">
        <div>
            <input class="login_text" v-model="username" type="text" placeholder="账号/手机号/Email">
        </div>
        <div>
            <input class="login_text" v-model="password" type="password" placeholder="请输入您的密码">
        </div>
        <div class="login_btn">
            <input type="submit" value="登陆" @click="handleToLogin()">
        </div>
        <div class="login_link">
            <router-link to="/center/register">立刻注册</router-link>
            <router-link to="/center/findPassword">找回密码</router-link>
        </div>
    </div>
</template>
<script>
import { messageBox } from '@/components/JS'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleToLogin() {
      this.axios.post('/api/users/login', {
        username: this.username,
        password: this.password
      }).then((res) => {
        // console.log(res)
        const status = res.data.status
        const self = this
        if (status === 0) {
          messageBox({
            title: '登陆',
            content: '登陆成功',
            ok: '确定',
            handleOk() {
              self.$router.push('/center/mine')
            }
          })
        } else {
          messageBox({
            title: '登陆',
            content: '登陆失败',
            ok: '确定',
            handleOk() {
              console.log('取消')
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
    #content .login_body{width: 100%;}
    .login_body .login_text{width: 100%;height: 40px;border: none;border-bottom: 1px #ccc solid;margin-bottom: 5px;outline: none;text-indent: 10px;}
    .login_body .login_btn{height: 50px;margin: 10px;}
    .login_body .login_btn input{width: 100%;height: 100%;background: #e54847;border-radius: 3px;border: none;display: block;color: #fff;font-size: 20px;}
    .login_body .login_link{display: flex;justify-content: space-between;}
    .login_body .login_link a{text-decoration: none;margin: 0 5px;font-size: 12px;color: #e54847;}
</style>
