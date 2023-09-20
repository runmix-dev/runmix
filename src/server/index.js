require('dotenv').config()
const express = require('express')
const path = require('path')
import routers from './router'
const { SERVER_PORT } = process.env

const app = express()

app.use(express.static(path.resolve(__dirname, '../client')))
app.set('views', path.resolve(__dirname, '../../src/server/views'))
app.set('view engine', 'ejs')

app.use('/', routers)

app.listen(SERVER_PORT, () => {
  console.log(`[express] server started at http://localhost:${SERVER_PORT}`)
})