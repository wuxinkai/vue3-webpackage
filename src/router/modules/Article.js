import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: { title: '文章', icon: 'article' },
  children: [
    {
      path: '/article/ranking',
      component: () =>
        import(
          /* webpackChunkName: "article-ranking" */ '@/views/article-ranking/index'
        ),
      meta: {
        title: '动态列拖拽排序',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      component: () =>
        import(
          /* webpackChunkName: "article-ranking" */ '@/views/article-detail/index'
        ),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
