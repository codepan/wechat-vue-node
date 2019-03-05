<template>
  <kw-layout>
    <kw-header title="发表文字">
      <kw-button slot="left" type="text" color="#c0c4cc" @click="$router.go(-1)">取消</kw-button>
      <kw-button slot="right" type="text" color="primary" @click="publish" :disabled="!content">发表</kw-button>
    </kw-header>
    <kw-main has-header bg-color="light" class="publish-main">
      <kw-input type="textarea" v-model="content" no-border rows="3" autosize placeholder="这一刻的想法..."></kw-input>
      <upload class="grid-publish" @change="setImages"></upload>
    </kw-main>
  </kw-layout>
</template>

<script>
  import jwtDecode from 'jwt-decode'
  import Upload from '../components/Upload'
  export default {
    name: 'Publish',
    data () {
      return {
        content: '',
        images: []
      }
    },
    components: {
      Upload
    },
    computed: {
      user () {
        const user = localStorage.zychatToken
        if (!user) {
          return {}
        }

        return jwtDecode(user)
      }
    },
    methods: {
      setImages (images) {
        // 获取Base64
        images.forEach(file => {
          this.uploadFile(file)
        })
      },
      uploadFile (file) {
        let fileReader = new FileReader()
        fileReader.onload = e => {
          this.images.push(e.target.result)
        }

        fileReader.readAsDataURL(file)
      },
      publish () {
        const params = {
          title: this.user.username,
          avatar: this.user.avatar,
          content: this.content,
          images: this.images.join('|')
        }

        const loading = this.$loading({
          mask: true
        })
        this.$http.post('/api/profile/add', params).then(() => {
          loading.close()
          this.$router.push('/moments')
        })
      }
    }
  }
</script>
<style scoped>
  .publish-main{
    padding: 30px;
  }
  .grid-publish {
    margin: 20px 0;
  }
</style>
