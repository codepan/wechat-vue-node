const passportJwt = require('passport-jwt')
const Strategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const User = require('mongoose').model('user')

const jwtConfig = require('./jwt')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secretOrKey
}

module.exports = passport => {
  passport.use(new Strategy(options, (payload, done) => {
    User.findById(payload.id).then(user => {
      if (user) {
        return done(null, user)
      }

      return done(null, false)
    }).catch(err => console.log(err))
  }))
}
