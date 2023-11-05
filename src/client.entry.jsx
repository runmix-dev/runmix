import { hydrateRoot } from 'react-dom/client';
import createRoutes from './shared/routes'
import { createBrowserRouter, RouterProvider, matchRoutes } from 'react-router-dom'
import createStore from './stores/create';
import createApp from './universal-app';

const store = createStore({ preloadedState: window.__PRELOADED_STATE__.store });

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
  hydrateRoot(
    document.getElementById('root'), (
      createApp({
        helmetContext, store, RouterProvider, routerProps: { router },
      })
    ),
  );
}

hydrate()