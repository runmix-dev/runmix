import express from 'express'
import { renderToString } from 'react-dom/server'
import RunmixApp from '../App.jsx'
import assets from '@dist/server/assets.json'
import { StaticRouter } from 'react-router-dom/server'

const routers = express.Router()

routers.get('/*', async (req, res) => {
  const helmetContext = {}
  const appString = await renderToString(
  <RunmixApp
    helmetContext={helmetContext}
    Router={StaticRouter}
    routerProps={{
      location: req.originalUrl
    }}
  />
  )
  const {helmet} = helmetContext
  res.render('index', {
    appString,
    titleTag: helmet.title.toString(),
    injectedPreloadState: {},
    assets,
    isProd: __PROD__,
  })
})

export default routers