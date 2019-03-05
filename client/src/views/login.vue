<template>
  <div class="page-wrapper">
    <article class="main">
      <h2 class="title">用户登录</h2>
      <kw-form label-width="70">
        <kw-form-item label="用户名">
          <kw-input placeholder="邮箱/手机号" v-model="user.username"></kw-input>
        </kw-form-item>
        <kw-form-item label="密码">
          <kw-input placeholder="请设置密码" type="password" v-model="user.password"></kw-input>
        </kw-form-item>
      </kw-form>
      <div class="control">
        <kw-button type="success" size="full" @click="login" :disabled="!user.username || !user.password">登录</kw-button>
      </div>
    </article>
    <footer class="footer">
      <kw-button type="text" color="success" @click="toRegister">立即注册</kw-button>
    </footer>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode'

  export default {
    name: 'register',
    data () {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        if (!this.validateForm()) {
          return
        }

        this.$http.post('/api/user/login', this.user).then(response => {
          const {token} = response.data

          // 存储token
          window.localStorage.setItem('zychatToken', token)

          // 解析token
          const decodeToken = jwtDecode(token)
          // console.log(decodeToken)

          // 存储到vuex中
          this.$store.dispatch('setUser', decodeToken)
          // 进入主页
          this.$router.push('/')
        })
      },
      validateForm () {
        const {username, password} = this.user

        if (!username) {
          this.$toast('请输入用户名')
          return false
        }

        if (!password) {
          this.$toast('请输入密码')
          return false
        }

        return true
      },
      toRegister () {
        this.$router.push('register')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-wrapper {
    .main {
      margin: 20px 20px 0;
      .title {
        text-align: center;
        margin-bottom: 20px;
      }
      .control{
        margin-top: 20px;
      }
    }
    .footer{
      margin-top: 40px;
      text-align: center;
    }
  }
</style>
