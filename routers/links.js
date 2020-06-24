const Router = require('koa-router');
const router = new Router();
// 可以都放到index里？
const link = require('../Control/links');

router.get('/links', link.getLinks);
router.post('/links', link.addLinks);
router.post('/links', link.editLinks);
router.post('/links', link.delLinks);



module.exports = router;