<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="isFollowLoading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="isFollowLoading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { deleteFollow, addFollow } from '@/api/user.js'
export default {
  name: 'FollowUser',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      isFollowLoading: false
    }
  },

  methods: {
    async onFollow() {
      // 防抖优化
      this.isFollowLoading = true
      try {
        if (this.isFollowed) {
          // 已关注 取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注 添加关注
          await addFollow(this.userId)
        }
        this.isFollowLoading = false
        // 视图改变
        this.$emit('update:isFollowed', !this.isFollowed)
        this.$nextTick(() => {
          this.$toast.success(this.isFollowed ? '关注成功' : '取消关注成功')
        })
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return this.$toast.fail('不能关注自己')
        }
        this.isFollowLoading = false
        this.$toast.fail('设置失败,请稍后再试')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
