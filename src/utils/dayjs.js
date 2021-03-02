import dayjs from 'dayjs'
import Vue from 'vue'
// 导入中文语言包
import 'dayjs/locale/zh-cn'

// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 加载全局语言
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

// 设置全局时间过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
