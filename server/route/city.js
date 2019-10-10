import Router from 'koa-router';
const router = new Router({
    prefix: '/demo'
})
router.get('/list', async function(ctx, next) {
    ctx.body = {
        list: ['beijin', 'tianjin']
    }
})

export default router;