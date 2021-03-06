<template>
  <van-button
    :class="{
      liked: value === 1
    }"
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { deleteLike, addLike } from '@/api/article.js'

export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
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
    async onLike() {
      // 防抖优化
      this.loading = true
      try {
        let attitude = -1
        if (this.value === 1) {
          // 已收藏 取消收藏
          await deleteLike(this.articleId)
        } else {
          // 未收藏 添加收藏
          await addLike(this.articleId)
          attitude = 1
        }
        // 视图改变
        this.$emit('input', attitude)
        this.$nextTick(() => {
          this.$toast.success(this.value === 1 ? '点赞成功' : '取消点赞成功')
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
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
