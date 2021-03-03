<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }"
  >
    <!-- 左侧 title 内容 -->
    <div slot="title" class="title  van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <!-- 下方有三张图片的情况 -->
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" :src="img" fit="cover" />
        </div>
      </div>

      <!-- 下方提示内容 -->
      <div
        :class="[
          'label-info',
          article.cover.type === 1 ? 'only-one-cover' : ''
        ]"
      >
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!--右侧只有一张图片的情况 右侧图片内容 -->
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      slot="default"
      :src="article.cover.images[0]"
      fit="cover"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .van-cell__value {
    flex: unset;
    margin-left: 25px;
  }
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info span {
    font-size: 23px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .only-one-cover {
    margin-top: 50px;
  }
  .cover-wrap {
    display: flex;
    padding-top: 15px;
    padding-bottom: 25px;
    .cover-item {
      flex: 1;
      height: 146px;
      &:nth-child(-n + 2) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
