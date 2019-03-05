<template>
  <kw-layout>
    <kw-nav title="朋友圈" back-text="返回">
      <kw-icon icon="camera" color="red" size="large" slot="right" @click="$router.push('/publish')"></kw-icon>
    </kw-nav>
    <kw-main has-nav >
      <kw-loadmore @refresh="refresh" @loadmore="loadmore" :all-loaded="isAllLoaded" all-loaded-text="没有更多数据">
        <header class="header">
          <div class="user-info">
            <span class="username">{{user.username}}</span>
            <div class="avatar">
              <img :src="user.avatar" class="image"/>
            </div>
          </div>
        </header>
        <div class="cell-views">
          <div class="init-data" v-if="isInit">
            <kw-spinner></kw-spinner>
          </div>
          <cell-view v-for="(moment, index) in moments" :moment="moment" :key="index"></cell-view>
        </div>
      </kw-loadmore>
    </kw-main>
  </kw-layout>
</template>

<script>
  import jwtDecode from 'jwt-decode'
  import CellView from '../components/CellView'
  export default {
    name: 'moments',
    components: {
      CellView
    },
    data () {
      return {
        moments: [],
        isInit: true,
        isAllLoaded: false,
        pagination: {
          currentPage: 2,
          pageSize: 3
        }
      }
    },
    computed: {
      user () {
        const token = localStorage.zychatToken
        if (!token) {
          return {}
        }
        //解析token
        return jwtDecode(token)
      }
    },
    methods: {
      refresh ($loadmore) {
        this.pagination.currentPage = 2
        this.isAllLoaded = false
        this.findLatestData(() => {
          $loadmore.refreshDone()
        })
      },
      loadmore ($loadmore) {
        this.$http.get(`/api/profile/find/${this.pagination.currentPage}/${this.pagination.pageSize}`).then(response => {
          const data = response.data
          this.moments.push(...data)
          if (data && data.length > 0) {
            this.pagination.currentPage++
          } else {
            this.isAllLoaded = true
          }
          $loadmore.loadmoreDone()
        })
      },
      findLatestData (callback) {
        this.$http.get('/api/profile/find/1/3').then(response => {
          this.isInit = false
          this.moments = [...response.data]
          callback && callback()
        })
      }
    },
    created () {
      this.isInit = true
      this.findLatestData()
    }
  }
</script>
<style scoped>
  .header{
    position: relative;
    height: 250px;
    background: pink;
  }
  .user-info{
    position: absolute;
    bottom: 0;
    right: 10px;
    transform: translateY(50%);
    display: flex;
    align-items: flex-start;
    color: #fff;
  }
  .username{
    margin-right: 20px;
  }
  .avatar{
    width: 50px;
    height: 50px;
    border: 1px solid #d2d2d2;
    padding: 2px;
    background: #fff;
  }
  .image{
    width: 100%;
    height: 100%;
  }

  .cell-views{
    padding-top: 40px;
    background: #fff;
  }

  .cell-views .init-data{
    display: flex;
    justify-content: center;
  }
</style>
