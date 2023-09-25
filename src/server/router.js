import express from 'express'
import { renderToString } from 'react-dom/server'
import assets from '@dist/server/assets.json'
import { HelmetProvider } from 'react-helmet-async'
import routes from '../shared/routes'

const routers = express.Router()

routers.get('/*', async (req, res) => {
  if (!routes[req.path]) {
    return res.send(404)
  }
  const helmetContext = {}
  const App = (await routes[req.path].component()).default
  const appString = await renderToString(<HelmetProvider context={helmetContext}><App /></HelmetProvider>)
  const {helmet} = helmetContext
  res.render('index', {
    appString,
    titleTag: helmet.title.toString(),
    assets,
    injectedPreloadState: {},
    isProd: __PROD__,
  })
})

export default routers