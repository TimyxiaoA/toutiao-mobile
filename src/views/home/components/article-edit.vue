<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        slot="default"
        class="edit-btn"
        type="danger"
        round
        size="mini"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="toOrDelete(channel, index)"
      >
        <div
          slot="text"
          :class="{
            text: true,
            active: index === active
          }"
        >
          {{ channel.name }}
        </div>
        <!-- 右侧图标 -->
        <van-icon
          v-if="isEdit && !defaultChannel.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10" class="recommend-grid" direction="horizontal">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="addUserChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addChannelById,
  removeChannelById
} from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      requried: true
    },
    active: {
      type: Number,
      requried: true
    }
  },
  components: {},

  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制是否编辑
      defaultChannel: [0] // 默认不能删除的频道,储存频道的id
    }
  },
  computed: {
    /* recommendChannels() {
      const channels = []
      this.allChannels.forEach(channel => {
        // find 找到符合条件的第一个就返回，后面就不再查找！
        const ret = this.myChannels.find(
          myChannel => myChannel.id === channel.id
        )
        // 我的频道没有找到 channel，则收集
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    } */
    // 推荐频道列表
    recommendChannels() {
      // filter 把符合条件的元素返回到新数组
      return this.allChannels.filter(channel => {
        // find 找到符合条件的第一个就返回，后面就不再查找！
        return !this.myChannels.find(myChannel => myChannel.id === channel.id)
      })
    },
    ...mapState(['user'])
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    // 加载所有频道
    async loadAllChannels() {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('获取所有频道数据失败')
      }
    },
    // 添加频道
    async addUserChannel(channel) {
      if (this.user) {
        try {
          const { data: res } = await addChannelById({
            id: channel.id,
            seq: this.myChannels.length
          })
          console.log(res)
          if (res.data.channels.length) {
            this.$toast('添加频道成功')
            // 前端添加
            this.myChannels.push(channel)
          }
        } catch (err) {
          this.$toast('添加频道失败')
        }
      } else {
        // 前端添加
        this.myChannels.push(channel)
        this.$toast('添加频道成功')
        // 将最新数据保存到本地
        setItem('unLoginChannels', this.myChannels)
      }
    },
    // 跳转 高亮显示 或者 删除频道
    async toOrDelete(channel, index) {
      if (this.isEdit) {
        // 编辑状态 删除频道

        try {
          if (this.defaultChannel.includes(channel.id)) {
            return this.$toast('默认频道不能删除')
          }
          if (index <= this.active) {
            this.$emit('change-active', this.active - 1, true)
          }
          // 状态持久化 已登录
          if (this.user) {
            const res = await removeChannelById(channel.id)
            console.log(res)
            if (res.status === 204) {
              this.$toast('删除频道成功')
              // 前端删除
              this.myChannels.splice(index, 1)
            }
          } else {
            // 未登录
            // 前端删除
            this.myChannels.splice(index, 1)
            // 将最新数据保存到本地
            setItem('unLoginChannels', this.myChannels)
          }
        } catch (err) {
          console.log(err)
          this.$toast('删除频道失败')
        }
      } else {
        // 非编辑状态 跳转页面并高亮显示
        this.$emit('change-active', index, false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 85px;
  /deep/.van-grid-item__content {
    padding: 20px 16px;
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;

    .active {
      color: red;
    }
  }

  .van-cell__value {
    display: flex;
    flex-direction: row-reverse;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/.my-grid {
    /*  .van-grid-item__text {
      margin-top: 0;
    } */
    .text {
      font-size: 28px;
      white-space: nowrap;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-clear {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 30px;
      color: #c2c2c2;
      z-index: 2;
    }
  }
  /deep/.recommend-grid {
    .van-icon-plus {
      font-size: 24px;
    }
    .van-grid-item__text {
      white-space: nowrap;
      font-size: 28px;
      margin-left: 3px;
    }
  }
}
</style>
