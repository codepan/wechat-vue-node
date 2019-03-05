<template>
  <kw-grid cell-height="cell-width" has-border cell-spacing="4">
    <kw-grid-cell v-for="(image, index) in images" :key="index" class="cell-image">
      <img :src="image" class="image"/>
      <button class="btn-remove" @click="remove(index)">X</button>
    </kw-grid-cell>
    <kw-grid-cell class="cell-plus" @click.native="add" v-if="images.length < 9">
      <kw-icon icon="add" color="#bbb" size="60"></kw-icon>
    </kw-grid-cell>
  </kw-grid>
</template>

<script>
  import Vue from 'vue'

  import KwUpload from '../components/kwupload'
  Vue.use(KwUpload)

  export default {
    name: 'upload',
    data () {
      return {
        images: [], // 用于前端展示的图片数组
        uploadFiles: [] // 提交到数据库的图片文件数组
      }
    },
    methods: {
      add () {
        this.$file.select((files, localFiles) => {
          if (this.images.length + localFiles.length > 9 ) {
            this.$toast('最多发表9张图片')
            return
          }
          this.uploadFiles.push(...files)
          this.images.push(...localFiles)

          this.$emit('change', this.uploadFiles)
        })
      },
      remove (index) {
        this.images.splice(index, 1)
      }
    }
  }
</script>

<style scoped>
  .cell-image{
    position: relative;
  }
  .cell-image .btn-remove{
    position: absolute;
    top: -8px;
    right: -5px;
    border: none;
    outline: none;
    width: 20px;
    height: 20px;
    padding: 0;
    text-align: center;
    color: #ffff;
    background-color: #20af0e;
    line-height: 10px;
    border-radius: 50px;
  }
  .cell-plus{
    background: #f8f8f8;
  }
  .image{
    width: 100%;
    height: 100%;
  }
</style>
