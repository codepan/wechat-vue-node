<template>
  <div class="index">
    <router-view class="route-view"></router-view>
    <kw-tabbar v-model="activeTabIndex" fixed="bottom">
      <kw-tabbar-item title="微信" to="/chats">
        <kw-icon :icon="activeTabIndex === 0 ? 'comment' : 'comment-outline'" slot="icon"></kw-icon>
      </kw-tabbar-item>
      <kw-tabbar-item title="通讯录" to="/contacts">
        <kw-icon :icon="activeTabIndex === 1 ? 'address-book' : 'address-book-outline'" slot="icon"></kw-icon>
      </kw-tabbar-item>
      <kw-tabbar-item title="发现" dot to="/discover">
        <kw-icon :icon="activeTabIndex === 2 ? 'compass' : 'compass-outline'" slot="icon"></kw-icon>
      </kw-tabbar-item>
      <kw-tabbar-item title="我" to="/me">
        <kw-icon :icon="activeTabIndex === 3 ? 'user' : 'user-outline'" slot="icon"></kw-icon>
      </kw-tabbar-item>
    </kw-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        activeTabIndex: 0
      }
    }
  }
</script>

<style scoped>
  .index{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .route-view{
    padding-bottom: 50px;
    overflow: scroll;
    overflow-scrolling: touch;
  }
</style>
