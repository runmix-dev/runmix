
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export function Component() {
  return (
    <div>
      <Helmet>
        <title>Runmix documentation</title>
      </Helmet>
      <div>
      Runmix docs page
      </div>
      <div>
        <Link to="/">back to home</Link>
      </div>
    </div>
  )
}

Component.displayName = 'DocsPage'