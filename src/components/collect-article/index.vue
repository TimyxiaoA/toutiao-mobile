<template>
  <van-button
    :class="{
      collected: value
    }"
    :icon="value ? 'star' : 'star-o'"
    @click="onCollect"
  />
</template>

<script>
import { deleteCollect, addCollect } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },

  methods: {
    async onCollect() {
      // 防抖优化
      this.loading = true
      try {
        if (this.value) {
          // 已收藏 取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏 添加收藏
          await addCollect(this.articleId)
        }
        // 视图改变
        this.$emit('input', !this.value)
        this.$nextTick(() => {
          this.$toast.success(this.value ? '收藏成功' : '取消收藏成功')
        })
      } catch (err) {
        this.$toast.fail('设置失败,请稍后再试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
