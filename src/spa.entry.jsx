import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import createStore from './stores/create';
import createApp from './universal-app';
import createRoutes from './shared/routes';

const store = createStore({ });

const mount = async () => {
  const routes = createRoutes({ store });
  const helmetContext = {};
  const router = createBrowserRouter(routes);
  createRoot(document.getElementById('root'))
    .render(createApp({
      helmetContext, store, RouterProvider, routerProps: { router },
    }));
};

mount();