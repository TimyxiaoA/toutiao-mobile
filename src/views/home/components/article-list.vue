<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell v-for="(article, index) in list" :key="index">
          <article-item :article="article"></article-item>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAticlesById } from '@/api/article.js'
import ArticleItem from '@/components/article-item/index.vue'
import { debounce } from 'lodash'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      requried: true
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [],
      loading: false, // 控制加载状态
      finished: false, // 控制完成状态
      timestamp: null,
      error: false, // 控制错误提示
      isRefreshLoading: false, // 控制下拉刷新是否加载
      refreshSuccessText: '刷新成功' // 刷新成功的文案
    }
  },

  methods: {
    async onLoad() {
      try {
        // 1. 获取异步数据
        const { data: res } = await getAticlesById({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 2.将数据写入到 list 数组中
        this.list.push(...res.data.results)
        // 3.加载状态结束
        this.loading = false

        // 4.数据全部加载完成
        if (res.data.results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        // 1. 获取异步数据
        const { data: res } = await getAticlesById({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 2.将数据写入到 list 数组中
        this.list.unshift(...res.data.results)
        // 3.加载状态结束
        this.isRefreshLoading = false
        this.refreshSuccessText = `刷新成功,更新了${res.data.results.length}条数据!`
      } catch (err) {
        // 4.更新失败时
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败,稍后再试!'
      }
    }
  },
  mounted() {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  activated() {
    // 从缓存中被激活
    this.$refs['article-list'].scrollTop = this.scrollTop
  },
  deactivated() {
    // 从缓存中失去活动
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
