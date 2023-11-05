import express from 'express'
import { renderToString } from 'react-dom/server'
import assets from '@dist/server/assets.json'
import createStore from '../stores/create'
import { createStaticHandler, StaticRouterProvider, createStaticRouter } from 'react-router-dom/server'
import createFetchRequest from './request'
import createRoutes from '../shared/routes'
import createApp from '../universal-app';

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
    createApp({
      store,
      helmetContext,
      RouterProvider: StaticRouterProvider,
      routerProps: { router, context },
    }),
  );
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