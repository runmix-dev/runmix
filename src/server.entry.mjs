import { renderToString } from 'react-dom/server'
import RunmixApp from './App.jsx'
import path from 'path'
const express = require('express')

const app = express()
app.use(express.static(path.resolve(__dirname)))

const handleHomePage = async function(req, res) {
  const content = await renderToString(<RunmixApp />)
  res.send(`
  <!DOCTYPE html>
  <html lang="">
  <head>
      <meta charset="utf-8">
      <title>Runmix Demo</title>
  </head>
  <body>
  <div id="root">${content}</div>
  <script src="./app.js"></script>
  </script>
  </body>
  </html>
  `)
}

app.get('/', handleHomePage)

app.listen(8080)

console.log('listening on 8080');