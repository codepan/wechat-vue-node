<template>
  <kw-layout>
    <kw-nav>详细资料</kw-nav>
    <kw-main has-nav>
      <kw-list>
        <kw-item icon-type="thumbnail">
          <img slot="icon" :src="targetUser.avatar"></img>
        </kw-item>
      </kw-list>
      <div class="button-wrapper">
        <kw-button size="full" color="success" @click="toSendMessage">发消息</kw-button>
      </div>
    </kw-main>
  </kw-layout>
</template>
<script>
export default {
  name: "information",
  computed: {
    targetUser () {
      return this.$store.getters.targetUser
    }
  },
  methods: {
    toSendMessage () {
      this.$router.push({
        name: 'chat',
        params: {
          user: this.targetUser
        }
      })
    }
  }
};
</script>
<style lang="scss">
  .button-wrapper{
    margin: 20px;
  }
</style>
