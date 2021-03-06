<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onAddComment"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComments } from '@/api/comment.js'

export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async onAddComment() {
      this.$toast.loading({
        message: '发表中...',
        forbidClick: true,
        duration: 0 // 持续展示
      })
      try {
        const { data: res } = await addComments({
          target: this.target,
          content: this.message,
          art_id: null
        })
        console.log(res)
        // 1.关闭弹出层 2.将发布内容添加到视图顶部 3.清空输入框
        this.$emit('post-success', res.data)
        this.message = ''
        this.$toast.success('发表成功')
      } catch (err) {
        this.$toast.fail('发表失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
