/*
    * @Author: Jayshi
    * @Date: 2019.12.25
    * @Description: 友情链接列表
*/

// 使用schema
const Links = require('../Schema/links');
// 操作方法
// 获取分类列表
const getLinks = async (ctx, next) => {
    const req = ctx.request.body;

    const links = await Links.find();
    if (links) {
        ctx.body = {
            code: 200,
            data: Links
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '数据库错误'
        }
    }
};
// 添加分类
const addLinks = async (ctx, next) => {
    const req = ctx.request.body;
    const links = await Links.insert({ value: req.value });
    if (links) {
        ctx.body = {
            code: 200,
            msg: '添加成功'
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '添加失败'
        }
    }
};


// 编辑分类
const editLinks = async (ctx, next) => {
    const req = ctx.request.body;
    if (req.type !== 'edit' && !req.id) {
        ctx.body = {
            code: 400,
            msg: '参数有误'
        };
        return
    }

    const links = await Links.update({id: req.id},{$set: {value: req.value}});
    if (links) {
        ctx.body = {
            code: 200,
            msg: '修改成功'
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '修改失败'
        }
    }
};

// 删除分类
const delLinks = async (ctx, next) => {
    const req = ctx.request.body;
    const links = await Links.remove({id: req.id},{ justOne: true })
    if (links) {
        ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '删除失败'
        }
    }
};

module.exports = {
    getLinks,
    addLinks,
    editLinks,
    delLinks
};