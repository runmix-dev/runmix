import express from 'express'
import { renderToString } from 'react-dom/server'
import assets from '@dist/server/assets.json'
import { HelmetProvider } from 'react-helmet-async'
import routes from '../shared/routes'
import createStore from '../stores/create'
import { Provider } from 'react-redux'

const routers = express.Router()

routers.get('/*', async (req, res) => {
  if (!routes[req.path]) {
    return res.send(404)
  }
  const helmetContext = {}
  const { default: App, getServerSideProps } = await routes[req.path].component();
  const store = createStore({})
  const pageProps = getServerSideProps ? await getServerSideProps({ store }) : {};
  const injectedPreloadState = {store: store.getState(), pageProps}
  const appString = renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <App {...pageProps} />
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