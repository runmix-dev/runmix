import { hydrateRoot } from 'react-dom/client';
import createRoutes from './shared/routes'
import './assets/style.css'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider, matchRoutes } from 'react-router-dom'
import store from './stores'

let reactRoot

async function prepareComponent(routes) {
  let lazyMatches = matchRoutes(
    routes,
    window.location
  )?.filter((m) => m.route.lazy)

  if (lazyMatches && lazyMatches.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        let routeModule = await m.route.lazy();
        Object.assign(m.route, {
          ...routeModule,
          lazy: undefined,
        });
      })
    );
  }
}

const hydrate = async () => {
  const routes = createRoutes({ store })
  await prepareComponent(routes)
  const helmetContext = {}
  let router = createBrowserRouter(routes);
  reactRoot = hydrateRoot(document.getElementById('root'), (
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <RouterProvider router={router}>
        </RouterProvider>
      </HelmetProvider>
    </Provider>
  ))
}

hydrate()