// login & register
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const jwtConfig = require('../../config/jwt')

const passport = require('passport')

const User = require('../../models/User')

/**
 * @method GET
 * @url api/user/test
 * @desc 返回请求的json数据
 * @access public
 */
router.get('/test', (req, res) => {
  res.json({msg: 'login works'})
})

/**
 * @method POST
 * @url api/user/register
 * @desc 返回请求的json数据
 * @access public
 */
router.post('/register', (req, res) => {
  // 查询数据库中是否拥有用户名
  User.findOne({username: req.body.username}).then(user => {
    if (user) {
      return res.status(400).json({username: '用户名已注册'})
    } else {
      const avatar = gravatar.url('12345@qq.com', {
        s: 200,
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        nickname: req.body.nickname,
        avatar
      })

      // 加密密码
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err

          newUser.password = hash
          newUser.save().then(user => {
            res.json(user)
          }).catch(err => {
            console.log(err)
          })
        })
      })
    }
  })
})

/**
 * @method POST
 * @url api/user/login
 * @desc 返回请token
 * @access public
 */
router.post('/login', (req, res) => {
  const {username, password} = req.body
  // 查询用户是否存在
  User.findOne({username}).then(user => {
    if (!user) {
      return res.status(404).json('用户不存在')
    }
    // 判断密码是否正确
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          id: user.id,
          username: user.username,
          avatar: user.avatar
        }
        jwt.sign(rule, jwtConfig.secretOrKey, {expiresIn: jwtConfig.expiresIn}, (err, token) => {
          if (err) throw err
          res.json({
            success: true,
            token: jwtConfig.tokenPrefix + token
          })
        })
      } else {
        res.status(400).json('密码错误')
      }
    })
  })
})

/**
 * @method GET
 * @url api/user/current
 * @desc 返回当前用户
 * @access private
 */

/*
router.get('/current', '验证token', (req, res) => {})
 */
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    avatar: req.user.avatar
  })
})

/**
 * @method GET
 * @url api/user/all
 * @desc 返回所有用户
 * @access private
 */

router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
 User.find({}).then(users => {
   res.status(200).json(users)
 })
})

/**
 * @method GET
 * @url api/user/find
 * @desc 返回所有用户
 * @access private
 */

router.get('/find/:userId', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findOne({
    _id: req.params.userId
  }).then(user => {
    res.status(200).json(user)
  })
})

module.exports = router
