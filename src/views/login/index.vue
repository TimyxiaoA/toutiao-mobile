<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />

    <!-- 登陆表单 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-box">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginPage',

  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern: /^1[3|5|6|7|8]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ]
      },
      // 控制倒计时组件显示与隐藏
      isCountDownShow: false
    }
  },

  methods: {
    async onSubmit() {
      // 1.获取数据
      const user = this.user
      // 2.表单验证
      this.$toast.loading({
        message: '登陆中',
        forbidClick: true,
        duration: 0 // 持续展示
      })
      // 3.提交表单请求登录
      try {
        const { data: res } = await login(user)
        this.$toast.success('登录成功!')
        console.log(res)
        // 触发事件存储 token
        this.$store.commit('setUser', res.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码不正确!')
        } else {
          this.$toast.fail('登陆失败,请稍后再试!')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    async onSendSms() {
      // 1.效验表格
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        console.log('验证失败', err)
      }

      // 2.验证通过 展示倒计时
      this.isCountDownShow = true

      // 3.请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        this.$toast('发送成功!')
        console.log(res)
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送次数过多,请稍后再试!')
        } else {
          this.$toast('发送失败,请稍后再试!')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .van-button--small {
    padding: 0;
  }
  .login-btn-box {
    padding: 53px 28px;
    .login-btn {
      background: #6db4fb;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>
