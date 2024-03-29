import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt');
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session';
import Redis from 'koa-redis';
import json from 'koa-json';
import passport from './route/passport';
import dbconfig from './dbs/config';
// import city from './route/city'
import user from './route/user'
import geo from './route/geo'
const app = new Koa()

app.keys = ['mt', 'keyskeys'];
app.proxy = true;
app.use(bodyParser({ extendTypes: ['json', 'form', 'text'] }));
app.use(session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new Redis()
}));
app.use(json())

mongoose.connect(dbconfig.dbs, { useNewUrlParser: true })
app.use(passport.initialize());
app.use(passport.session())



// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    const {
        host = process.env.HOST || '127.0.0.1',
            port = process.env.PORT || 3000
    } = nuxt.options.server

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }
    // app.use(city.routes()).use(city.allowedMethods());
    app.use(user.routes()).use(user.allowedMethods());
    app.use(geo.routes()).use(geo.allowedMethods());
    app.use((ctx) => {
        ctx.status = 200
        ctx.respond = false // Bypass Koa's built-in response handling
        ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
        nuxt.render(ctx.req, ctx.res)
    })

    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()