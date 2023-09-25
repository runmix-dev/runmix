import { hydrateRoot, createRoot } from 'react-dom/client';
import routes from './shared/routes'
import './assets/style.css'
import { HelmetProvider } from 'react-helmet-async'
import { emitter } from '@components/react-router-dom'

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
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    )
  })
}

const hydrate = () => {
  const {pathname} = window.location
  routes[pathname].component().then(({default: App}) => {
    const helmetContext = {}
    reactRoot = hydrateRoot(document.getElementById('root'), (
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    ))
  })
  watchRoute()
}

hydrate()