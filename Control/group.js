/*
    * @Author: Jayshi
    * @Date: 2020.04.20
    * @Description: 分组列表
*/

// 使用schema
const Group = require('../Schema/group');
const User = require('../Schema/login');

// 获取分组列表
const getGroup = async (ctx, next) => {
const group = await Group.find();
    if (group) {
        ctx.body = {
            code: 200,
            data: group
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '未查询到数据'
        }
    }
};

// 操作分组信息
const setGroup = async (ctx, next) => {
    const req = ctx.request.body;
    if (req.type === 'add') {
        const findGroupName = await Group.findOne({name: req.name});
        if (findGroupName) {
            ctx.body = {
                code: 400,
                msg: '添加失败，已经存在该小组'
            }
        } else {
            const typeAdd = await Group.create({name: req.name, leader: req.leader});

            const updateLeader = await User.updateOne({ name: req.leader }, { group: req.name, isLeader: 1 });
            if (typeAdd) {
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
        }
    } else if(req.type === 'edit') {
        const categoryEdit = await Group.updateOne({ _id: req._id }, req);
        if (categoryEdit.n === 1 && categoryEdit.nModified === 1 && categoryEdit.ok === 1) {
            ctx.body = {
                code: 200,
                msg: '编辑成功'
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '编辑失败'
            }
        }
    }else {
        const updateLeader = await User.updateOne({ name: req.leader }, { isLeader: 0, group: '' });
        const typeDel = await Group.deleteOne({name: req.name});
        if (typeDel) {
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
    }
};

module.exports = {
    getGroup,
    setGroup
};