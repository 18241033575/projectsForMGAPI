const Router = require('koa-router');

const router = new Router();

router.get("/", async (ctx) => {
    console.log(1);
    ctx.body = '测试'
});


// 处理用户登录的 post
router.post("/user/login", async (ctx) => {
   const data = ctx.request.body;
});


module.exports = router;