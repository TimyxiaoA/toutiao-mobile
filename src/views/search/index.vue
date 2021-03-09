<template>
  <div class="search-container">
    <!-- 顶部 搜索栏 -->
    <form class="search-from" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296FA"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /顶部 搜索栏 -->

    <!--//! 搜索结果  此组件优先级最高-->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- /搜索结果 -->

    <!-- 搜索联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- /搜索联想建议 -->

    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
    ></search-history>
    <!-- 搜索历史 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
export default {
  name: 'searchIndex',

  data() {
    return {
      searchText: '', // 搜索输入框内容
      isResultShow: false, // 控制搜索结果组件展示
      searchHistories: [] // 储存搜索历史
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  methods: {
    onSearch(val) {
      console.log(val)
      // 将文本数据赋值到 searchText
      this.searchText = val
      // 展示搜索结果页面
      this.isResultShow = true
      // 将最新的不重复的添加到数组中
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
    },
    onCancel() {
      console.log('取消')
      this.$router.push(this.$route.query.derirect || '/')
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-from {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
