<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm" @click="onConfirm">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {}
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 裁剪框限制在画布当中
      dragMode: 'move', // 不允许直接选择裁剪框的大小，只能移动
      aspectRatio: 1, // 截图框的比例
      autoCropArea: 1, // 自动截取的比例，一边顶满
      cropBoxMovable: false, // 只能是背后的画布移动
      cropBoxResizable: false, // 截图区域不允许缩放大小
      background: false // 关闭自带背景
    })
  },
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        console.log(blob)
        this.updatePhoto(blob)
      })
    },
    async updatePhoto(blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data: res } = await updateUserPhoto(formData)
        console.log(res)
        // 关闭弹层，更新视图
        this.$emit('close')
        this.$emit('update-photo', res.data.photo)
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  width: 100%;
  height: 100%;
  background: #000;
  .img {
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;

    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
