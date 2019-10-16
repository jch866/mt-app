import passport from 'koa-passport';
import localStrategy from 'passport-local';
import UserModel from '../models/user';
passport.use(new localStrategy(async function(username, password, done) {
        let where = { username };
        let result = await UserModel.findOne(where);
        if (result != null) {
            if (result.password === password) {
                return done(null, result)
            } else {
                return done(null, false, 'wrong password')
            }
        } else {
            return done(null, false, 'user hav\'t exit!')
        }
    }))
    //序列化 存在seesion中
passport.serializeUser(function(user, done) {
        done(null, user)
    })
    //反序列化  
passport.deserializeUser(function(user, done) {
    return done(null, user)
})

export default passport;