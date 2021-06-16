<template>
    <div class="password_body">
      <div>
          <i class="iconfont iconyouxiang"></i>
          <input class="password_text" type="email" placeholder="邮箱" v-model="email">
        </div>
        <div>
          <i class="iconfont iconuser"></i>
          <input class="password_text" type="text" placeholder="用户名" v-model="username">
        </div>
        <div>
          <i class="iconfont iconyiliaohangyedeICON-"></i>
          <input class="password_text" type="password" placeholder="旧密码" v-model="password">
        </div>
        <div>
          <i class="iconfont iconquerenmima"></i>
          <input class="password_text" type="password" placeholder="新密码" v-model="newpassword">
        </div>
        <div class="password_btn">
          <input type="submit" value="提交" @click="handleToUpdate()">
        </div>
        <div class="password_link">
          <router-link to="/center/login">立刻登陆</router-link>
          <router-link to="/center/register">立刻注册</router-link>
        </div>
    </div>
</template>

<script>
import { messageBox } from '@/components/JS'
export default {
  name: 'FindPassword',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      newpassword: ''
    }
  },
  methods: {
    handleToUpdate() {
      this.axios.post('/api/users/findPassword', {
        email: this.email,
        username: this.username,
        password: this.password,
        newpassword: this.newpassword
      }).then((res) => {
        // console.log('111', res)
        const status = res.data.status
        const self = this
        if (status === 0) {
          messageBox({
            title: '修改密码',
            content: '修改成功',
            ok: '确定',
            handleOk() {
              self.$router.push('/center/login')
            }
          })
        } else if (status === -5) {
          messageBox({
            title: '修改密码',
            content: '用户名或邮箱未输入',
            ok: '确定',
            handleOk() {
              console.log('')
            }
          })
        } else if (status === -4) {
          messageBox({
            title: '修改密码',
            content: '旧密码或新密码不能为空',
            ok: '确定',
            handleOk() {
              console.log('')
            }
          })
        } else if (status === -3) {
          messageBox({
            title: '修改密码',
            content: '旧密码和新密码不能一致',
            ok: '确定',
            handleOk() {
              console.log('')
            }
          })
        } else {
          messageBox({
            title: '修改密码',
            content: '修改失败',
            ok: '确定',
            handleOk() {
              console.log('')
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
    #content .password_body{width: 100%;}
    .password_body div:nth-of-type(1),div:nth-of-type(2),div:nth-of-type(3),div:nth-of-type(4){display: flex;border-bottom: 1px #ccc solid;height: 45px;}
    .password_body>div>i{margin:10px 5px 0 5px}
    .password_body .password_text{width: 100%;height: 40px;border: none;margin-bottom: 5px;outline: none;text-indent: 10px;}
    .password_body .password_btn{height: 50px;margin: 10px;display: block;}
    .password_body .password_btn input{width: 100%;height: 100%;background: #e54847;border-radius: 3px;border: none;display: block;color: #fff;font-size: 20px;}
    .password_body .password_link{display: flex;justify-content: space-between;border: none;}
    .password_body .password_link a{text-decoration: none;margin: 0 5px;font-size: 12px;color: #e54847;}
</style>
