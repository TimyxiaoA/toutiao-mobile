<template>
  <div class="comment-reply">
    <van-nav-bar title="xx条回复">
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>

    <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>
    <!-- /当前评论项 -->

    <van-cell title="全部回复" />
    <!-- 评论回复列表 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'

export default {
  name: 'CommentReply',
  components: {
    CommentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped></style>
