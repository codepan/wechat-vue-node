<template>
  <kw-layout>
    <kw-header title="微信">
      <kw-icon icon="plus-circle-outline" slot="right"></kw-icon>
    </kw-header>
    <kw-main has-header>
      <kw-list>
        <kw-item icon-type="avatar" v-for="chat in chats" :key="chat._id" :title="chat.target.username" @click="toChat(chat.target)">
          <img :src="chat.target.avatar" slot="icon"/>
          <span slot="subtitle">{{chat.messages[chat.messages.length - 1].message}}</span>
          <kw-badge style="position: absolute;top:5px;left:44px;" v-if="chat.count">{{chat.count}}</kw-badge>
        </kw-item>
      </kw-list>
    </kw-main>
  </kw-layout>
</template>

<script>
  import WebSocket from '../socket'

  export default {
    name: 'chats',
    data () {
      return {
        chats: []
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      findChats () {
        this.$http.get(`/api/chat/find/${this.user.id}`).then(response => {
          this.chats = response.data
        })
      },
      pushMessage (message) {
        let filterChats = this.chats.filter(chat => {
          return chat.target._id === message.from
        })
        // 如果消息列表中有用户
        if (filterChats.length > 0) {
          filterChats[0].messages.push({
            message: message.message,
            source: 'other'
          })

          filterChats[0].count += 1

          this.saveMessage(filterChats[0].target, filterChats[0].messages, 1)
        } else {
          this.findUserById(message.from, user => {
            let messages = [{
              message: message.message,
              source: 'other'
            }]
            this.chats.push({
              target: {
                avatar: user.avatar,
                username: user.username,
                _id: user._id
              },
              count: 1,
              messages,
              userId: this.user.id
            })

            this.saveMessage(user, messages, 1)
          })
        }
      },
      findUserById (userId, callback) {
        this.$http.get(`/api/user/find/${userId}`).then(response => {
          callback(response.data)
        })
      },
      saveMessage (target, messages, count) {
        let chat = {
          target: {
            avatar: target.avatar,
            username: target.username,
            _id: target._id
          },
          userId: this.user.id,
          count,
          messages
        }
        this.$http.post(`/api/chat/add`, chat).then(response => {
          console.log(response.data)
        })
      },
      toChat (user) {
        this.$router.push({
          name: 'chat',
          params: {
            user
          }
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.findChats()
      })
    },
    mounted () {
      WebSocket.init({user: this.user}, message => {
        this.pushMessage(message)
        console.log(message, 'message')
      }, error => {
        console.log(error)
      })
    }
  }
</script>

<style lang="scss">
</style>
