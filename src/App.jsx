import { useState } from 'react'
import logo from './assets/images/logo.png'
import './assets/style.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function RunmixApp({helmetContext = {}}) {
  const [visible, setVisible] = useState(false)
  const handleClick = () => setVisible(true)
  return (
    <HelmetProvider context={helmetContext}>
      <div className='app'>
        <Helmet>
          <title>首页</title>
        </Helmet>
        <h1>Welcome to Runmix</h1>
        <div>
          <img src={logo} style={{width: 60}} />
        </div>
        {visible && <div>You clicked button</div>}
        <button className='btn' onClick={handleClick}>Click me to test hydration</button>
      </div>
    </HelmetProvider>
  );
}