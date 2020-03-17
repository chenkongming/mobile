import Vue from "vue"
import VueRouter from "vue-router"
import store from '../store/index'
Vue.use(VueRouter)
import indexFrame from '../layout/index'
const routes = [
  {
    path: '/',
    component: indexFrame,
    redirect: '/index',
    meta: {
      title: '首页'
    },
    children: [
      {
        name: 'index',
        path: '/index',
        meta: {
          title: '首页'
        },
        component: () =>
          import(/* webpackChunkName: "index" */ '../views/home/index.vue')
      },
      {
        path: "/userCenter",
        name: "userCenter",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/userCenter/index.vue")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', '0')

router.beforeEach(function(to, from, next) {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (
      !fromIndex ||
        parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
        (toIndex === '0' && fromIndex === '0')
    ) {
      store.dispatch('app/updateDirectionAction', 'forward')
    } else {
      store.dispatch('app/updateDirectionAction', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', '' + historyCount)
    to.path !== '/' && history.setItem(to.path, '' + historyCount)
    store.dispatch('app/updateDirectionAction', 'forward')
  }

  next()
})
export default router
