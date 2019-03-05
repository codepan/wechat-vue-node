const express = require('express')
const router = express.Router()
const passport = require('passport')
const Chat = require('../../models/Chat')

/**
 * @method POST
 * @url api/chat/add
 * @desc
 * @access private
 */
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {target, userId, messages, count} = req.body
  Chat.findOne({target, userId}).then(chat => {
    if (!chat) {
      new Chat({target, userId, messages, count}).save().then(chat => {
        res.json(chat)
      })
    } else {
      chat.messages = messages
      chat.count = count
      chat.save().then(chat => {
        res.json(chat)
      })
    }
  })
})

/**
 * @method GET
 * @url api/chat/find/:userId
 * @desc 获取用的所有聊天记录
 * @access private
 */
router.get('/find/:userId', passport.authenticate('jwt', {session: false}), (req, res) => {
  Chat.find().then(chats => {
    if (!chats) {
      res.status(404).json('没有任何消息')
    }

    chats = chats.filter(chat => {
      return chat.userId === req.params.userId
    })

    res.json(chats)
  }).catch(error => {
    res.status(404).json(error)
  })
})

module.exports = router
