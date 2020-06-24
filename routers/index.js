const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const UserSchema = require('../Schema/config');
const mongoose = require('mongoose');
const router = new Router();

/*const files = fs.readdirSync(__dirname);
files
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => {
        const file_name = file.substr(0, file.length - 3);
        const file_entity = require(path.join(__dirname, file));
        if (file_name !== 'index') {
            router.use(`/${file_name}`, file_entity.routes(), file_entity.allowedMethods())
        }
    });*/

// 链接mongodb的服务器
const db = mongoose.createConnection("mongodb://localhost:27017/blog", {useNewUrlParser: true});
// 通过 database 对象创造操作user数据库的模型对象
const User = db.model("users", UserSchema);

// 用原生es6的promise取代mongoose自实现的promise
mongoose.Promise = global.Promise;

db.on("error", () => {
    console.log("数据库连接失败");
});

db.on("open", () => {
    console.log("数据库连接成功");
});

router.get('/', async (ctx, next) => {
    let data = {
        name: 'shilei',
        age: 26,
        sex: 1
    };
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set("Content-Type", "application/json");
    ctx.body = JSON.stringify(data)
});


// 登录接口
router.post('/login', async (ctx, next) => {
    const Users = db.collection('user');
    await new Promise((resolve, reject) => {
        Users.findOne({ name: ctx.request.body.username },(err, res) => {
            if (err) throw err;
            db.close();
            resolve(res);
        });
    }).then((res) => {
        let resData = {};
        if (res === null) {
            resData.code = 400;
            resData.msg = '用户名不存在';
            ctx.body = resData;
        }else if (res.password !== ctx.request.body.password) {
            resData.code = 400;
            resData.msg = '密码错误';
            ctx.body = resData;
        }else {
            resData.code = 200;
            resData.msg = '登录成功';
            ctx.body = resData;
        }
    })
});

// 获取后台用户
router.get('/netUser', async (ctx, next) => {
    const netUsers = db.collection('manage_user');
    await new Promise((resolve, reject) => {
        netUsers.find().toArray((err, res) => {
            if (err) throw err;
            resolve(res)
        })
    }).then((res) => {
        let resData = {};
        if (res === null) {
            resData.code = 400;
            resData.msg = '暂无数据';
        } else{
            resData.code = 200;
            resData.msg = '查询成功';
            resData.data = res;
        }
        ctx.body = resData;
    })
});


// 获取全部消息
router.get('/message', async (ctx, next) => {
    const Message = db.collection('message');
    await new Promise((resolve, reject) => {
        Message.find().toArray((err, res) => {
            if (err) throw err;
            resolve(res)
        })
    }).then((res) => {
        let resData = {};
        if (res === null) {
            resData.code = 400;
            resData.msg = '暂无数据';
        } else{
            resData.code = 200;
            resData.msg = '查询成功';
            resData.data = res;
        }
        ctx.body = resData;
    })
});



// 获取系统分类
router.get('/category', async (ctx, next) => {
    const Category = db.collection('skills_category');
    await new Promise((resolve, reject) => {
        Category.find().toArray((err, res) => {
            if (err) throw err;
            resolve(res)
        })
    }).then((res) => {
        let resData = {};
        if (res === null) {
            resData.code = 400;
            resData.msg = '暂无数据';
        } else{
            resData.code = 200;
            resData.msg = '查询成功';
            resData.data = res;
        }
        ctx.body = resData;
    })
});


router.get('/demo/child', async (ctx, next) => {
    ctx.body = '<html>' +
        '<form action="http://localhost:8888/demo/child" method="post">' +
        '<label>姓名</label><input name="name">\n' +
        '<label>密码</label><input name="password">' +
        '<button type="submit">提交</button>' +
        '</form>' +
        '</html>'
});

// 提交测试
router.post('/demo/child', async (ctx, next) => {
    const Users = db.collection('user');
    await new Promise((resolve, reject) => {
        Users.findOne({name: ctx.request.body.name},(err, res) => {
            if (err) throw err;
            if (res === null) {
                Users.insertOne({name: ctx.request.body.name},(err, res) => {
                   if (err) throw err;
                    resolve('创建成功');
                });
            }else {
                resolve('用户名已被注册!');
            }
            db.close();
        });
    }).then((res) => {
        ctx.body = res;
    });
});

module.exports = router;