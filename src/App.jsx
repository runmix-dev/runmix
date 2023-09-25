import './assets/style.css'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route} from 'react-router-dom'
// import HomePage from './views/home'
import DocsPage from './views/docs'

import { lazy } from 'react'
const HomePage = lazy(() => import('./views/home'))
// const DocsPage = lazy(() => import('./views/docs'))

export default function RunmixApp({Router, routerProps, helmetContext = {}}) {
  return (
    <HelmetProvider context={helmetContext}>
      <Router {...routerProps}>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/docs' element={<DocsPage />}></Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}