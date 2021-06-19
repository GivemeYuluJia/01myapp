<template>
    <div class="register_body">
      <div>
        <i class="iconfont iconyouxiang"></i>
        <input class="register_text" type="email" placeholder="Email" v-model="email">
      </div>
      <div>
        <i class="iconfont iconuser"></i>
        <input class="register_text" type="text" placeholder="输入用户名" v-model="username">
      </div>
      <div>
        <i class="iconfont iconyiliaohangyedeICON-"></i>
        <input class="register_text" type="password" placeholder="请输入您的密码" v-model="password">
      </div>
      <div>
        <i class="iconfont iconquerenmima"></i>
        <input class="register_text" type="password" placeholder="再次输入您的密码" v-model="repassword">
      </div>
      <div class="register_btn">
        <input type="submit" value="注册" @click="handleToRegister()">
      </div>
      <div class="register_link">
            <router-link to="/center/login">立刻登陆</router-link>
            <router-link to="/center/findPassword">找回密码</router-link>
      </div>
    </div>
</template>

<script>
import { messageBox } from '@/components/JS'
export default {
  name: 'Degister',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    handleToRegister() {
      this.axios.post('/api/users/register', {
        username: this.username,
        password: this.password,
        repassword: this.repassword,
        email: this.email
      }).then((res) => {
        // console.log(res)
        const status = res.data.status
        const self = this
        if (status === 0) {
          messageBox({
            title: '注册',
            content: '注册成功',
            ok: '确定',
            handleOk() {
              self.$router.push('/center/login')
            }
          })
        } else if (status === -5) {
          messageBox({
            title: '注册',
            content: '用户名或邮箱未输入',
            ok: '确定',
            handleOk() {
              console.log('')
            }
          })
        } else if (status === -4) {
          messageBox({
            title: '注册',
            content: '旧密码或新密码不能为空',
            ok: '确定',
            handleOk() {
              console.log('')
            }
          })
        } else if (status === -3) {
          messageBox({
            title: '注册',
            content: '两次密码输入不一致',
            ok: '确定',
            handleOk() {
              console.log('')
            }
          })
        } else {
          messageBox({
            title: '注册',
            content: '注册失败',
            ok: '确定',
            handleOk() {
              console.log('失败')
            }
          })
        }
      })
    }
  }

}
</script>
<style scoped>
    #content .register_body{width: 100%;}
    .register_body div:nth-of-type(1),div:nth-of-type(2),div:nth-of-type(3),div:nth-of-type(4){display: flex;border-bottom: 1px #ccc solid;height: 45px;}
    .register_body>div>i{margin:10px 5px 0 5px}
    .register_body .register_text{width: 100%;height: 40px;border: none;margin-bottom: 5px;outline: none;text-indent: 10px;}
    .register_body .register_btn{height: 50px;margin: 10px;display: block;}
    .register_body .register_btn input{width: 100%;height: 100%;background: #e54847;border-radius: 3px;border: none;display: block;color: #fff;font-size: 20px;}
    .register_body .register_link{display: flex;justify-content: space-between;border: none;}
    .register_body .register_link a{text-decoration: none;margin: 0 5px;font-size: 12px;color: #e54847;}
</style>
