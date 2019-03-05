<template>
  <kw-layout>
    <kw-nav v-if="targetUser">{{targetUser.username}}</kw-nav>
    <kw-main has-nav has-footer>
      <div class="message-wrapper" v-for="(message, index) in messages" :key="index">
        <div class="left-message" v-if="message.source === 'other'">
          <img :src="targetUser.avatar" class="avatar"/>
          <span class="message">{{message.message}}</span>
        </div>
        <div class="right-message" v-else>
          <img :src="user.avatar" class="avatar"/>
          <span class="message">{{message.message}}</span>
        </div>
      </div>
    </kw-main>
    <kw-footer>
      <div class="footer-wrapper">
        <kw-input placeholder="" v-model="message"></kw-input>
        <kw-button :disabled="!message" @click="sendMessage">发送</kw-button>
      </div>
    </kw-footer>
  </kw-layout>
</template>

<script>
  import WebSocket from '../socket'

  export default {
    name: 'chat',
    data () {
      return {
        targetUser: null,
        message: '',
        messages: []
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.targetUser = to.params.user
        vm.findMessage()
      })
    },
    methods: {
      findMessage () {
        this.$http.get(`/api/chat/find/${this.user.id}`).then(response => {
          // 过滤与当前目标对象的聊天数据
          let result = response.data.filter(data => {
            return data.target._id = this.targetUser._id
          })

          if (result.length > 0) {
            this.messages = result[0].messages
          }
        })
      },
      sendMessage () {
        const message = {
          target: this.targetUser._id,
          current: this.user.id,
          message: this.message
        }
        WebSocket.send(message)

        this.messages.push({
          message: this.message,
          source: 'self'
        })
        //
        this.saveMessage()

        this.message = ''
      },
      saveMessage () {
        let chat = {
          target: {
            avatar: this.targetUser.avatar,
            username: this.targetUser.username,
            _id: this.targetUser._id
          },
          count: 0,
          messages: this.messages,
          userId: this.user.id
        }
        this.$http.post('/api/chat/add', chat).then(response => {
          console.log(response)
          this.message = ''
        })
      }
    },
    mounted () {
      WebSocket.init({user: this.user}, message => {
        this.messages.push({
          message: message.message,
          source: 'other'
        })

        this.saveMessage()
      }, error => {
        console.log(error)
      })
    }
  }
</script>

<style lang="scss">
  .message-wrapper{
    margin: 10px 4px;
    .avatar{
      width: 40px;
      height: 40px;
    }
    .message{
      padding: 10px;
      font-size: 14px;
      border-radius: 4px;
    }
    .left-message{
      display: flex;
      align-items: center;
      .message{
        margin-left: 10px;
        background: #fff;
      }
    }
    .right-message{
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      .message{
        margin-right: 10px;
        background: greenyellow;
      }
    }
  }
.footer-wrapper{
  display: flex;
  align-items: center;
}
</style>
