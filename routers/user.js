const Router = require('koa-router');
const router = new Router();
// 可以都放到index里？
const user = require('../Control/user');

router.post('/login', user.userLogin);



module.exports = router;