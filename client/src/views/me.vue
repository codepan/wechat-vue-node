<template>
  <kw-layout>
    <kw-header>微信</kw-header>
    <kw-main has-header>
      <kw-list>
        <kw-item icon-type="avatar">
          <img :src="user.avatar" slot="icon"/>
          <span slot="title">
            用户名：{{user.username}}
          </span>
          <span slot="subtitle">
            昵称：{{user.nickname}}
          </span>
        </kw-item>
      </kw-list>
      <div class="logout">
        <kw-button size="full" color="primary" @click="logout">退出登录</kw-button>
      </div>
    </kw-main>
  </kw-layout>
</template>

<script>
  export default {
    name: 'chats',
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      logout () {
        window.localStorage.removeItem('zychatToken')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss">
  .logout {
    margin-top: 20px;
    padding: 0 20px;
    height: 40px;
  }
</style>
