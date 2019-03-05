<template>
  <div class="page-wrapper">
    <header class="header">
      <kw-button type="text" color="success" @click="toLogin">取消</kw-button>
    </header>
    <article class="main">
      <h2 class="title">用户注册</h2>
      <kw-form label-width="70">
        <kw-form-item label="用户名">
          <kw-input placeholder="邮箱/手机号" v-model="user.username"></kw-input>
        </kw-form-item>
        <kw-form-item label="昵称">
          <kw-input placeholder="例如：codepan" v-model="user.nickname"></kw-input>
        </kw-form-item>
        <kw-form-item label="密码">
          <kw-input placeholder="请设置密码" type="password" v-model="user.password"></kw-input>
        </kw-form-item>
        <kw-form-item label="确认密码">
          <kw-input placeholder="请确认密码" type="password" v-model="confirmPassword"></kw-input>
        </kw-form-item>
      </kw-form>
      <div class="control">
        <kw-button type="success" size="full" @click="register">注册</kw-button>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        user: {
          username: '',
          nickname: '',
          password: ''
        },
        confirmPassword: ''
      }
    },
    methods: {
      register () {
        if (!this.validateForm()) {
          return
        }

        this.$http.post('/api/user/register', this.user).then(response => {
          this.$router.push('/login')
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

        if (!this.confirmPassword) {
          this.$toast('请输入确认密码')
          return false
        }

        if (password !== this.confirmPassword) {
          this.$toast('两次密码输入不一致')
          return false
        }

        return true
      },
      toLogin () {
        this.$router.push('login')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-wrapper{
    .header{

    }
    .main{
      margin-top: 40px;
      padding: 0 20px;
      .title{
        text-align: center;
        margin-bottom: 20px;
      }
      .control{
        margin-top: 20px;
      }
    }
  }
</style>
