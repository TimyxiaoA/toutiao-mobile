<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search.js'
export default {
  name: 'Searchresult',
  props: {
    searchText: {
      type: String,
      requried: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },

  methods: {
    async onLoad() {
      // 1.异步更新数据
      try {
        const { data: res } = await getSearchResults({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        console.log(res)
        // 2
        this.list.push(...res.data.results)
        // 3. 加载状态结束
        this.loading = false
        // 4. 数据全部加载完成
        if (res.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        // this.$toast('获取数据失败')
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
