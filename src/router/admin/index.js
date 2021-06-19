export default {
  path: '/admin',
  component: () => import('@/views/Admin'),
  children: [
    {
      path: 'users',
      component: () => import('@/views/Admin/users')
    },
    {
      path: 'cinema',
      component: () => import('@/views/Admin/cinema')
    },
    {
      path: 'film',
      component: () => import('@/views/Admin/film')
    },
    {
      path: '',
      redirect: '/Admin/users'
    }
  ]
}
