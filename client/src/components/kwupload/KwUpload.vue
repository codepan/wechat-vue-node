<template>
  <div class="kw-upload">
    <input @change="handleChange" type="file" ref="myFile" multiple="multiple" accept="img/*">
  </div>
</template>

<script>
  export default {
    name: 'kwUpload',
    data () {
      return {
        selectCallback: null
      }
    },
    methods: {
      handleChange () {
        let files = [...this.$refs.myFile.files]
        let localFiles = []
        files.forEach(file => {
          let objUrl = this.getObjectURL(file)
          localFiles.push(objUrl)
        })

        this.selectCallback && typeof this.selectCallback === 'function' && this.selectCallback(files, localFiles)
      },
      getObjectURL (file) {
        let url = null
        if (window.createObjectURL) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL) { // mozilla firefox
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL) { // webkit safari chrome
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      }
    }
  }
</script>
