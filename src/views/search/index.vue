<template>
  <div class="search-container">
    <!-- 顶部 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296FA"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- /顶部 搜索栏 -->

    <!--//! 搜索结果  此组件优先级最高-->
    <search-result v-if="isResultShow"></search-result>
    <!-- /搜索结果 -->

    <!-- 搜索联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
    ></search-suggestion>
    <!-- /搜索联想建议 -->

    <!-- 搜索历史 -->
    <search-history v-else></search-history>
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
      searchText: '',
      isResultShow: false
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
      this.isResultShow = true
    },
    onCancel() {
      console.log('取消')
      this.$router.push(this.$route.params.derirect || '/')
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
