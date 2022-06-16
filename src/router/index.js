import { createRouter, createWebHistory } from 'vue-router'

import layout from '@/layout/index'
import ArticleRouter from './modules/Article'
import UserManage from './modules/UserManage'
import RoleListRouter from './modules/RoleList'
import PermissionListRouter from './modules/PermissionList'
/**
 * 私有路由表
 */
export const privateRoutes = [
  ArticleRouter,
  UserManage,
  RoleListRouter,
  PermissionListRouter
]

/**
 * 公开路由表
 */
let publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: (/* webpackChunkName: "login" */) => import('@/views/login/index')
  },
  {
    path: '/',
    component: layout,
    redirect: '/page1',
    children: [
      {
        path: '/page1',
        name: 'page1',
        meta: {
          title: '第一个页面',
          icon: 'personnel'
        },
        component: () => import('../views/page1.vue'),
        children: [
          {
            path: '/page2',
            name: 'page2',
            meta: {
              title: '第2个页面',
              icon: 'personnel'
            },
            component: () => import('../views/page1.vue'),
            children: [
              {
                path: '/page3',
                name: 'page3',
                meta: {
                  title: '第3个页面',
                  icon: 'personnel'
                },
                component: () => import('../views/page1.vue')
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/profile/index'),
        meta: {
          title: '个人中心',
          icon: 'personnel'
        }
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          // 3.2 ref约提升260%的读取速度，50%写入速度。内存使用减少17%，依赖项跟踪速度提升40%
          title: 'ref的应用',
          icon: 'article-ranking'
        },
        component: () => import('../views/About/about.vue')
      }
    ]
  }
]
//私有和共用全部插入到页面
const router = createRouter({
  history: createWebHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})


export function resetRouter() {
  if (store.getters.userInfo && store.getters.userInfo.permission && store.getters.userInfo.permission.menus) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}



export default router
