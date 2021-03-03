<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="searchHistories.splice(0)">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      v-for="(text, index) in searchHistories"
      :key="index"
      :title="text"
      @click="onSearchOrDelete(text, index)"
    >
      <van-icon v-show="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      requried: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onSearchOrDelete(text, index) {
      // 删除状态
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除状态
        this.$emit('search', text)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
