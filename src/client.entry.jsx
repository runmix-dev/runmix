import { hydrateRoot } from 'react-dom/client';
import routes from './shared/routes'
import './assets/style.css'
import { HelmetProvider } from 'react-helmet-async'
import { emitter } from '@components/react-router-dom'
import { Provider } from 'react-redux'
import store from './stores'

let reactRoot

const watchRoute = () => {
  emitter.on('routechange', evt => {
    const {to, state} = evt
    replaceRoot(to)
  })
}

const replaceRoot = (pathname) => {
  routes[pathname].component().then(({default: App}) => {
    const helmetContext = {}
    reactRoot.render(
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </Provider>
    )
  })
}

const hydrate = () => {
  const {pathname} = window.location
  routes[pathname].component().then(({default: App}) => {
    const helmetContext = {}
    const { pageProps } = window.__PRELOADED_STATE__
    reactRoot = hydrateRoot(document.getElementById('root'), (
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <App {...pageProps} />
        </HelmetProvider>
      </Provider>
    ))
  })
  watchRoute()
}

hydrate()