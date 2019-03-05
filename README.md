# express
封装了nodejs中的http模块，是一个用nodejs来快速搭建web服务器的框架

````js
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('helloworld')
})

app.listen(port, () => {
  console.log(`Server running on port:${port}`)
})
````
# nodemon
修改了express代码之后都需要重启服务器才能够生效。
nodemon它会监测项目中的所有文件，一旦发现文件有改动，nodemon 会自动重启应用            
```
npm install -g nodemon

nodemon server.js // 默认的是index.js
```
# body-parser
解析请求体body中的参数，用于post请求
#bcryptjs
用来加密密码
```js
const bcrypt = require('bcryptjs')
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('password', salt, (err, hash) => {
    if(err) throw err
    console.log(`${hash} is new password`)
  })
})
```
#gravatar
获取网络头像和
# jsonwebtoken(jwt)
生成token
```
npm i jsonwebtoken
const jwt = require('jsonwebtoken')
// jwt.sign(payload, secretOrPrivateKey, [options, callback])
// payload:规则是说使用那些数据进行token的生成，即将来解析token之后会得到那些信息

jwt.sign({id: user.id, username: user.username}, 'secret', {expiresIn: 3600}, (err, token) => {
  if (err) throw err
  res.json({
    success: true,
    token: 'zy' + token
  })
})
```
# passport passport-jwt
passport-jwt用来获取到使用jwt生成的token

passport用来校验token的有效性
```
const express = require('express')
const app = express()
const passport = require('passport')

// 初始化passport
app.use(passport.initialize())
```
#concurrently
连载执行多个脚本

 
Store
  Getter 获取数据
  Mutation 修改数据
  
