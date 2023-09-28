import { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Helmet } from 'react-helmet-async'
import { Link } from '@components/react-router-dom'
import { updateSiteName } from '../../stores/home'
import { useSelector } from 'react-redux'

export default function HomePage({version}) {
  const [visible, setVisible] = useState(false)
  const handleClick = () => setVisible(true)
  const sitename = useSelector(state => state.home.sitename)
  return (
    <div className='app'>
      <Helmet>
        <title>Runmix Home Page</title>
      </Helmet>
      <h1>Welcome to {sitename}, current version: {version || '0.0.0'}</h1>
      <div>
        <Link to="/docs">Go to docs page</Link>
      </div>
      <div>
        <img src={logo} style={{width: 60}} />
      </div>
      {visible && <div>You clicked button</div>}
      <button className='btn' onClick={handleClick}>Click me to test hydration</button>
    </div>
  )
}

export const getServerSideProps = async ({ store }) => {
  store.dispatch(updateSiteName('Runmix Beta'))
  return { version: '0.0.1' }
}