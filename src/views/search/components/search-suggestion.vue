<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      :title="item"
      icon="search"
    />
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: [] // 联想建议列表
    }
  },
  watch: {
    // 使用监听实时获取数据变化
    searchText: {
      handler: debounce(function(val) {
        console.log(val)
        this.loadSearchSuggestions(val)
      }, 300),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    async loadSearchSuggestions(q) {
      const { data: res } = await getSearchSuggestion(q)
      console.log(res)
      this.suggestions = res.data.options
    }
  }
}
</script>

<style lang="less" scoped></style>
