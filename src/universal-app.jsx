import { Provider } from 'react-redux';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './assets/style.css'

const createApp = ({
  helmetContext, store, RouterProvider, routerProps = {},
}) => (
  <Provider store={store}>
    <HelmetProvider context={helmetContext}>
      <RouterProvider {...routerProps} />
    </HelmetProvider>
  </Provider>
);

export default createApp;