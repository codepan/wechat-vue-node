const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const passport = require('passport')

const app = express()
//
const user = require('./routes/api/user')
const profile = require('./routes/api/profile')
const chat = require('./routes/api/chat')

// mongo config
const dbURI = require('./config/mongo').uri

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// connect to mongodb
mongoose.connect(dbURI, {useNewUrlParser: true}).then(() => {
  console.log('Mongodb Connected')
}).catch(err => {
  console.log(err)
})

// 初始化passport
app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/user', user)
app.use('/api/profile', profile)
app.use('/api/chat', chat)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port:${port}`)
})
