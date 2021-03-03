<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
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
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi') // 全局加不区分大小写
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/.active {
    color: #3296fa;
  }
}
</style>
