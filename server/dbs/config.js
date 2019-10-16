export default {
    dbs: 'mongodb://127.0.0.1:27017/user',
    redis: {
        get host() {
            return '127.0.0.1'
        },
        get post() {
            return 6379
        }
    },
    smtp: {
        get host() {
            return 'smtp.qq.com'
        },
        get port() {
            return 587
        },
        get user() {
            return '274458208@qq.com'
        },
        get pass() { //邮件服务授权码
            return 'qxatttwqslwxbidc'
        },
        get code() {
            return () => Math.random().toString(16).slice(2, 6).toUpperCase();
        },
        get expire() {
            return () => {
                return new Date().getTime() + 60 * 60 * 1000;
            }
        }
    },
}