import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

// 导入 Vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载全局样式
import './styles/index.less'

// 加载 relativeTime 过滤器
import '@/utils/dayjs.js'
// 加载注册 Vant 组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
