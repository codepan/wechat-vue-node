const express = require('express')
const router = express.Router()
const passport = require('passport')

const Profile = require('../../models/Profile')

/**
 * @method GET
 * @url api/user/test
 * @access public
 */
router.get('/test', (req, res) => {
  res.json('profile works')
})

/**
 * @method POST
 * @url api/profile/add
 * @desc
 * @access private
 */
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {avatar, title, content, images} = req.body
  let profile = {
    avatar,
    title,
    content
  }
  // 处理多张图片
  if (images) {
    profile.images = images.split('|')
  }

  // 存储数据
  new Profile(profile).save().then(profile => {
    res.json(profile)
  })
})

/**
 * @method GET
 * @url api/profile/find
 * @desc 分页获取数据
 * @params
 *  currentPage: 1
 *  pageSize: 10
 * @access private
 */
router.get('/find/:currentPage/:pageSize', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {currentPage = 1, pageSize = 3} = req.params

  Profile.find().sort({date: -1}).then(profiles => {
    console.log(profiles.length, 'length')
    if (!profiles) {
      res.status(404).json('没有任何消息')
    }

    res.json(profiles.slice(pageSize * (currentPage - 1), pageSize * (currentPage - 1) + pageSize))
  })
})

module.exports = router
