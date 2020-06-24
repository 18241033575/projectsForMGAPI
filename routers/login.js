const Router = require('koa-router');
const router = new Router();
// 可以都放到index里？
const user = require('../Control/login');

router.get('/userNoGroup', user.getUser);
router.post('/login', user.userLogin);
router.get('/user', user.getAllUser);
router.get('/getGroupDet', user.getGroupDet);
router.post('/operateUser', user.setUser);
router.post('/memberGroup', user.memberGroup);


module.exports = router;