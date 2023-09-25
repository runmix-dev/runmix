const routes = {
  '/': {
    component: () => import('../views/home')
  },
  '/docs': {
    component: () => import('../views/docs')
  }
}

export default routes