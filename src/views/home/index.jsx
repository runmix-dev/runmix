import { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [visible, setVisible] = useState(false)
  const handleClick = () => setVisible(true)
  return (
    <div className='app'>
      <Helmet>
        <title>Runmix Home Page</title>
      </Helmet>
      <h1>Welcome to Runmix</h1>
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