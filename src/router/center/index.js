export default {
  path: '/center',
  component: () => import('@/views/Center'),
  children: [
    {
      path: 'mine',
      component: () => import('@/views/Center/mine')
    },
    {
      path: 'login',
      component: () => import('@/views/Center/login')
    },
    {
      path: 'register',
      component: () => import('@/views/Center/register')
    },
    {
      path: 'findpassword',
      component: () => import('@/views/Center/findpassword')
    },
    {
      path: '',
      redirect: '/center/mine'
    }
  ]
}
