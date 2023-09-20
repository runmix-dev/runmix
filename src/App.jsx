import { useState } from 'react'
import logo from './assets/images/logo.png'
import './assets/style.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function RunmixApp({helmetContext = {}}) {
  const [visible, setVisible] = useState(false)
  const handleClick = () => setVisible(true)
  return (
    <HelmetProvider context={helmetContext}>
      <div>
        <Helmet>
          <title>首页</title>
        </Helmet>
        <h1>Welcome to RunmixApp</h1>
        {visible && <div>You clicked button</div>}
        <button onClick={handleClick}>Click me to test hydration</button>
        <img src={logo} style={{width: 60}} />
      </div>
    </HelmetProvider>
  );
}