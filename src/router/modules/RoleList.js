import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: '权限列表',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      component: () =>
        import(/* webpackChunkName: "role-list" */ '@/views/role-list/index'),
      meta: {
        title: '角色列表',
        icon: 'role'
      }
    }
  ]
}
