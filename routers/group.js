const Router = require('koa-router');
const router = new Router();
// 可以都放到index里？
const group = require('../Control/group');

router.get('/group', group.getGroup);
router.post('/group', group.setGroup);


module.exports = router;