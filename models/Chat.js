const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  count: {
    type: Number
  },
  userId: {
    type: String,
    required: true
  },
  messages: [
    {
      source: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    }
  ],
  target: {
    avatar: {
      type: String
    },
    username: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Chat = mongoose.model('chat', ChatSchema)
