import { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Helmet } from 'react-helmet-async'
import { updateSiteName } from '../../stores/home'
import { useSelector } from 'react-redux'
import { json, useLoaderData, Link } from 'react-router-dom'

export function Component() {
  const [visible, setVisible] = useState(false)
  const handleClick = () => setVisible(true)
  const sitename = useSelector(state => state.home.sitename)
  const { version } = useLoaderData()
  return (
    <div className='app'>
      <Helmet>
        <title>Runmix Home Page</title>
      </Helmet>
      <h1 className='text-xl font-bold'>Welcome to {sitename}</h1>
      <div>Current version: {version || '0.0.0'}</div>
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

Component.displayName =  'HomePage'

export const loader = async ({ store }) => {
  store.dispatch(updateSiteName('Runmix Beta'))
  return json({ version: '0.0.1' })
}

export default Component