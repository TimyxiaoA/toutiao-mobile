<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人资料"
      left-arrow
      @click-left="$router.push($route.query.redirect || '/my')"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 用户头像 -->
    <van-cell class="avatar" title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar-img" fit="cover" round :src="user.photo" />
    </van-cell>
    <!-- 用户昵称 -->
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowUpdateName = true"
    />
    <!-- 用户性别 -->
    <van-cell
      title="性别"
      :value="user.gender === 1 ? '女' : '男'"
      is-link
      @click="isShowUpdateGender = true"
    />
    <!-- 用户生日 -->
    <van-cell
      title="生日"
      :value="user.birthday || '1977-00-00'"
      is-link
      @click="isShowUpdateBirthday = true"
    />

    <!-- 编辑昵称弹层 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <!-- 编辑用户昵称组件 -->
      <update-name
        v-if="isShowUpdateName"
        v-model="user.name"
        @close="isShowUpdateName = false"
      />
    </van-popup>
    <!-- /编辑昵称弹层 -->
    <!-- 编辑性别 -->
    <van-popup v-model="isShowUpdateGender" position="bottom">
      <update-gender
        v-if="isShowUpdateGender"
        v-model="user.gender"
        @close="isShowUpdateGender = false"
      />
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup v-model="isShowUpdateBirthday" position="bottom">
      <update-birthday
        v-if="isShowUpdateBirthday"
        v-model="user.birthday"
        @close="isShowUpdateBirthday = false"
      />
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup
      v-model="isShowUpdatePhoto"
      style="height: 100%"
      position="bottom"
    >
      <update-photo
        v-if="isShowUpdatePhoto"
        :img="img"
        @close="isShowUpdatePhoto = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data() {
    return {
      user: {},
      isShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthday: false,
      isShowUpdatePhoto: false,
      img: ''
    }
  },
  created() {
    this.loadProfile()
  },
  methods: {
    async loadProfile() {
      try {
        const { data: res } = await getUserProfile()
        this.user = res.data
        console.log(res)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]

      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)

      // 展示预览图片弹出层
      this.isShowUpdatePhoto = true

      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    align-items: center;
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
    }
    .avatar-img {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
