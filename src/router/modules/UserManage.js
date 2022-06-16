import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: '人员管理',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      component: () =>
        import(
          /* webpackChunkName: "user-manage" */ '@/views/user-manage/index'
        ),
      meta: {
        title: '用户列表',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/info/:id',
      name: 'userInfo',
      component: () =>
        import(/* webpackChunkName: "user-manage" */ '@/views/user-info/index'),
      props: true,
      meta: {
        title: 'userInfo'
      }
    },
    // {
    //   path: '/user/import',
    //   name: 'import',
    //   component: () =>
    //     import(/* webpackChunkName: "user-manage" */ '@/views/import/index'),
    //   meta: {
    //     title: 'excelImport'
    //   }
    // }
  ]
}
