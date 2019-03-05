<template>
  <div class="cell-view">
    <div class="cell-view-avatar">
      <img :src="moment.avatar" class="avatar"/>
    </div>
    <article class="cell-view-content">
      <h2 class="title">{{moment.username}}</h2>
      <div class="content" v-if="moment.title">{{moment.title}}</div>
      <div class="images">
        <kw-grid cell-height="cell-width" cell-spacing="4" v-if="moment.images">
          <kw-grid-cell v-for="(image, index) in moment.images" :key="index">
            <img :src="image" class="image"/>
          </kw-grid-cell>
        </kw-grid>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'CellView',
    props: {
      moment: Object
    }
  }
</script>

<style scoped>
  .cell-view{
    display: flex;
    align-items: flex-start;
    padding: 15px 20px;
    border-bottom: 1px solid #f2f2f2;
    background: #fff;
  }
  .cell-view-avatar{
    width: 40px;
    height: 40px;
  }
  .avatar{
    width: 100%;
    height: 100%;
  }
  .cell-view-content{
    flex: 1;
    margin-left: 10px;
    font-size: 16px;
  }
  .title{
    color: cornflowerblue;
    font-weight: bolder;
  }
  .content{
    margin-top: 10px;
  }
  .images{
    margin-top: 10px;
    padding-right: 30px;
  }
  .image{
    width: 100%;
    height: 100%;
  }
</style>
