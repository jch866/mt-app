import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer'; //发邮件不仅要设置邮箱还要安装这个包
import config from '../dbs/config';
import passport from 'koa-passport';
import UserModel from '../models/user';
import axios from './axios';
import { send } from 'q';
const router = new Router({
    prefix: '/user'
})
const Store = new Redis().client; //redis的客户端；
router.post('/register', async function(ctx) {
    let { username, password, code, email } = ctx.request.body;
    if (code) { //验证 验证码
        const saveCode = await Store.hget(`nodemailer:${username}`, 'code');
        const saveExpire = await Store.hget(`nodemailer:${username}`, 'expire');
        if (code === saveCode) {
            let nowtime = new Date().getTime();
            if (nowtime - saveExpire > 0) { //验证码过期
                ctx.body = {
                    code: -1,
                    msg: 'expird code'
                }
                return false;
            }
        } else {
            ctx.body = {
                code: -1,
                msg: 'wrong code ,please input right code'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: 'code is empty'
        }
    }
    //验证 用户名和密码是否正确
    let user = await UserModel.find({
        username
    });
    if (user.length) {
        ctx.body = {
            code: -1,
            msg: 'this user is registered！'
        }
        return;
    }
    //写库
    let nuser = await UserModel.create({ username, password, email });
    if (nuser) {
        //写库成功，自动登录
        let res = await axios.post('/user/login', { username, password });
        if (res.data && res.data.code === 0) {
            ctx.body = {
                code: 0,
                msg: 'register successed!',
                user: res.data.user
            }
        } else {
            ctx.body = {
                code: -1,
                msg: 'error'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: 'register failed'
        }
    }

})
router.post('/login', async function(ctx, next) {
    return passport.authenticate('local', function(err, user, info, status) {
        if (err) {
            ctx.body = {
                code: -1,
                msg: err
            }
        } else {
            if (user) {
                ctx.body = {
                    code: 0,
                    msg: 'login successed',
                    user
                }
                return ctx.login(user)
            } else {
                ctx.body = {
                    code: 1,
                    msg: 'login failed',
                    info
                }
            }
        }
    })(ctx, next)
})
router.post('/verify', async function(ctx, next) {
    let { username, email } = ctx.request.body;
    let saveExpire = await Store.hget(`nodemailer:${username}`, 'expire');
    let nowtime = new Date().getTime();
    if (saveExpire && nowtime - saveExpire < 0) {
        ctx.body = {
            code: -1,
            msg: 'Code send frequently,one time a minute'
        }
        return false
    }
    let { smtp } = config;
    let transporter = nodeMailer.createTransport({
            host: smtp.host,
            port: smtp.port,
            secure: false,
            auth: {
                user: smtp.user,
                pass: smtp.pass
            }
        })
        //邮件中接收的信息
    let sendInfo = {
        code: smtp.code(),
        email,
        expire: smtp.expire(),
        user: username
    }
    let message = {
        from: `'auth mail'<${smtp.user}>`,
        to: sendInfo.email,
        subject: '<<koa nuxt>> 验证码',
        html: `正在注册，邀请码是${sendInfo.code}`
    }
    transporter.sendMail(message, function(error, info) {
        if (error) {
            console.log(error)
            return console.log('email send error')
        } else {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            Store.hmset(`nodemail:${sendInfo.user}`, 'code', sendInfo.code, 'expire', sendInfo.expire, 'email', sendInfo.email)
        }
    })
    ctx.body = {
        code: 0,
        msg: 'Code send successed! Maybe will timeout,the expire is one minute!'
    }
})
router.get('/loginout', async function(ctx) {
    await ctx.logout();
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: 0,
            msg: 'login out'
        }
    } else {
        ctx.body = {
            code: -1,
            msg: 'not login out'
        }
    }

})
router.get('/getUser', async function(ctx) {
    if (ctx.isAuthenticated()) {
        const { username, email } = ctx.session.passport.user;
        ctx.body = {
            code: 0,
            user: username,
            email
        }
    } else {
        ctx.body = {
            code: -1,
            user: '',
            email: ''
        }
    }

})

export default router;