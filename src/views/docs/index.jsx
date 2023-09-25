
import { Helmet } from 'react-helmet-async'
import { Link } from '@components/react-router-dom'

export default function DocsPage() {
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