const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

const apiRouter = require('./routes/api.js')
app.use(express.static('client'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ secret: 'grehjznejzkhgjrez', saveUninitialized: false, resave: false }))

app.use('/api/', apiRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = app
