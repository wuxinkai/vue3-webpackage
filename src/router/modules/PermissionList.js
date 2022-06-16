import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'permissionList',
  meta: { title: '通讯列表', icon: 'personnel' },
  children: [
    {
      path: '/user/permission',
      component: () =>
        import(
          /* webpackChunkName: "permission-list" */ '@/views/permission-list/index'
        ),
      meta: {
        title: '权限列表',
        icon: 'permission'
      }
    },
    {
      path: '/user/useVModel',
      component: () => import('@/views/useVModel/index'),
      meta: {
        title: '父子通讯',
        icon: 'permission'
      }
    }
  ]
}

