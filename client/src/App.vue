<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  import jwtDecode from 'jwt-decode'

  export default {
    name: 'app',
    created () {
      if (window.localStorage.zychatToken) {
        const decodeToken = jwtDecode(window.localStorage.zychatToken)
        this.$store.dispatch('setUser', decodeToken)
      }
    }
  }
</script>
<style>
  html, body, #app{
    width: 100%;
    height: 100%;
  }
</style>
