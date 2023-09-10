import { createRoot } from 'react-dom/client'

function RunmixApp() {
  return (
    <div>
      <h1>Welcome to RunmixApp</h1>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<RunmixApp />)