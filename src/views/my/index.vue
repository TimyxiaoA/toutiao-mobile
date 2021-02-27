<template>
  <div class="my-container">
    <!-- 已登录头部区域 -->
    <div v-if="user" class="header on-login">
      <div class="user-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" fit="cover" round />
          <span class="text">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button class="user-edit" round size="small">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录头部区域 -->

    <!-- 未登录头部区域 -->
    <div v-else class="header not-login">
      <div
        class="login-btn"
        @click="
          $router.push({
            name: 'login',
            params: {
              redirect: '/my'
            }
          })
        "
      >
        <img class="mobile-img" src="~@/assets/mobile.png" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 未登录头部区域 -->

    <!-- grid 宫格 -->
    <van-grid class="grid mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- cell 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'myIndex',

  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: '确认退出吗?'
        })
        .then(() => {
          // on confirm
          // 将 vuex中的user清空 就会显示 未登录页面
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUser() {
      try {
        const { data: res } = await getUserInfo()
        this.userInfo = res.data
      } catch (err) {}
    }
  },
  created() {
    if (this.user) {
      this.getUser()
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        margin-top: 15px;
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .on-login {
    .user-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .text {
          margin-left: 23px;
          font-size: 30px;
          color: #fff;
        }
      }
      .right {
        .user-edit {
          width: 115px;
          height: 32px;
          font-size: 20px;
          color: #666;
          letter-spacing: 1px;
          padding: 0;
        }
      }
    }
    .data-stats {
      height: 130px;
      display: flex;
      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span {
        font-size: 28px;
        color: #333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
