<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <!-- 评论项组件 -->
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @click-reply="$emit('click-reply', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      validator: value => {
        return ['a', 'c'].includes(value)
      },
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        // 1.异步更新数据
        const { data: res } = await getComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        // 2.
        console.log(res)
        const { results } = res.data
        this.list.push(...results)
        this.$emit('onload-success', res.data)
        // 3.加载状态结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取评论失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
