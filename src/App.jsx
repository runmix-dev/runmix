import { createRoot } from 'react-dom/client'
import logo from './assets/images/logo.png'
import './assets/style.css'

function RunmixApp() {
  return (
    <div>
      <h1>Welcome to RunmixApp</h1>
      <div>Add webpack-dev-server</div>
      <img src={logo} style={{width: 60}} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<RunmixApp />)