const { router } = require('../routers/index');
const user_operate = require('../Control/test');

router.post('/test', user_operate.getAllData);