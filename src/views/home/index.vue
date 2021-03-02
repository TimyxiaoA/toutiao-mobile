<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        :to="{ name: 'search', params: { redirect: '/' } }"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 标签页 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs
      v-model="active"
      class="channel-tabs"
      border
      animated
      swipeable
      title-inactive-color="#777"
      title-active-color="#333"
    >
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!--//! 封装展示内容的组件 便于缓存 -->
        <article-list :channel="channel"></article-list>
      </van-tab>

      <!-- 汉堡图标 -->
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isEditChannelShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑 -->
    <van-popup
      v-model="isEditChannelShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <article-edit
        :my-channels="channels"
        :active="active"
        @change-active="changeActive"
      ></article-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/views/home/components/article-list.vue'
import ArticleEdit from '@/views/home/components/article-edit.vue'
import { mapState } from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
export default {
  name: 'homeIndex',
  components: {
    ArticleList,
    ArticleEdit
  },
  data() {
    return {
      active: 0,
      // 用户所有频道列表
      channels: [],
      isEditChannelShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadChannels()
  },
  methods: {
    // 获取用户频道
    async loadChannels() {
      try {
        // 已登录
        if (this.user) {
          const { data: res } = await getUserChannels()
          console.log(res, 1111)
          this.channels = res.data.channels
        } else {
          // 未登录
          // 本地有缓存
          const localChannels = getItem('unLoginChannels')
          if (localChannels && localChannels.length) {
            this.channels = localChannels
          } else {
            // 本地没有缓存
            const { data: res } = await getUserChannels()
            console.log(res, 2222)
            this.channels = res.data.channels
            // 将频道数据储存到本地
            setItem('unLoginChannels', this.channels)
          }
        }
      } catch (err) {
        this.$toast('获取用户频道失败')
      }
    },
    // 改变active状态
    changeActive(index, flag) {
      this.active = index
      this.isEditChannelShow = flag
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/.channel-tabs {
    // border:1px solid #edeff3;
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      height: 82px;
      z-index: 1;
    }
    // tab 标签页
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
    }
    .van-tabs__nav--complete {
      padding: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background: #3296fa;
      border-radius: 3px;
    }

    .placeholder {
      flex-shrink: 0; //控制本身大小不被算入平分宽度
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 13px;
        width: 1px;
        height: 58px;
        background: url('~@/assets/gradient-gray-line.png');
      }
    }
  }
}
</style>
