import express from 'express'
import { renderToString } from 'react-dom/server'
import assets from '@dist/server/assets.json'
import { HelmetProvider } from 'react-helmet-async'
import createStore from '../stores/create'
import { Provider } from 'react-redux'
import { createStaticHandler, StaticRouterProvider, createStaticRouter } from 'react-router-dom/server'
import createFetchRequest from './request'
import createRoutes from '../shared/routes'

const routers = express.Router()

routers.get('*', async (req, res) => {
  const fetchRequest = createFetchRequest(req)
  const helmetContext = {}
  const store = createStore({})
  const routes = createRoutes({ store })
  const handler = createStaticHandler(routes)
  const context = await handler.query(fetchRequest)
  const router = createStaticRouter(handler.dataRoutes, context)
  const injectedPreloadState = {store: store.getState()}
  
  const appString = renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <StaticRouterProvider router={router} context={context}>
        </StaticRouterProvider>
      </HelmetProvider>
    </Provider>
  )
  const {helmet} = helmetContext
  res.render('index', {
    appString,
    titleTag: helmet.title.toString(),
    assets,
    injectedPreloadState,
    isProd: __PROD__,
  })
})

export default routers