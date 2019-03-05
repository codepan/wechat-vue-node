<template>
  <kw-layout>
    <kw-header title="发现"></kw-header>
    <kw-main has-header>
      <kw-list>
        <kw-item title="朋友圈" is-link to="/moments">
          <img :src="friendsCircleIcon" class="image" slot="icon"/>
        </kw-item>
      </kw-list>
    </kw-main>
  </kw-layout>
</template>

<script>
  import friendsCircleIcon from '../assets/friends-circle.jpg'
  export default {
    name: 'discover',
    data () {
      return {
        friendsCircleIcon
      }
    }
  }
</script>
<style scoped>
  .image{
    width: 20px;
    height: 20px;
  }
  .text{
    margin-left: 10px;
  }
</style>
