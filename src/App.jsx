import { useState } from 'react'
import logo from './assets/images/logo.png'
import './assets/style.css'

export default function RunmixApp() {
  const [visible, setVisible] = useState(false)
  const handleClick = () => setVisible(true)
  return (
    <div>
      <h1>Welcome to RunmixApp</h1>
      {visible && <div>You clicked button</div>}
      <button onClick={handleClick}>Click me to test hydration</button>
      <img src={logo} style={{width: 60}} />
    </div>
  );
}