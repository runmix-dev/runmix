function injectStore(store) {
  return (component) => {
    const { loader, Component } = component
    const newCom = {Component}
    if (loader) {
      newCom.loader = ({ params, request }) => loader({ params, request, store })
    }
    return newCom
  }
}

function createRoutes({ store }) {
  return [
    {
      path: '/',
      lazy: () => import('../views/home').then(injectStore(store))
    },
    {
      path: '/docs',
      lazy: () => import('../views/docs').then(injectStore(store))
    }
  ]
}

export default createRoutes