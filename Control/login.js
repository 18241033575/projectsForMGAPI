/*
    * @Author: Jayshi
    * @Date: 2020.04.17
    * @Description: 登陆
*/

// 使用schema
const User = require('../Schema/login');
// 重新连接表


// 登录获取登陆信息
const userLogin = async (ctx, next) => {
    const req = ctx.request.body;
    const user = await User.findOne({name: req.username, password: req.password});
    if (user) {
        ctx.body = {
            code: 200,
            data: user,
            msg: '登陆成功'
        }
    } else {
        const userCount = await User.findOne({name: req.username});
        if (userCount) {
            ctx.body = {
                code: 400,
                msg: '密码错误'
            }
        }else {
            ctx.body = {
                code: 400,
                msg: '未查到该用户'
            }
        }
    }
};

// 获取登陆人信息
const getUser = async (ctx, next) => {
    const user = await User.find({ group: ''}, { name: 1 });
    if (user) {
        ctx.body = {
            code: 200,
            data: user
        }
    }else {
        ctx.body = {
            code: 400,
            msg: '未查到数据'
        }
    }
};



// 获取所有用户信息
const getAllUser = async (ctx, next) => {
    const allUser = await User.find({}, {name: 1, password: 1, auth: 1});
    if (allUser) {
        ctx.body = {
            code: 200,
            data: allUser
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '未查到数据'
        }
    }
};

// 设置所有用户信息
const setUser = async (ctx, next) => {
    const req = ctx.request.body;
    if (req.type === 'add') {
        const add = await User.findOne({ name: req.name });
        console.log(add);
        if (add) {
            ctx.body = {
                code: 400,
                msg: '该用户已存在'
            }
        }else {
            const addUser = await User.create({name: req.name, password: req.password, auth: req.role, isLeader: 0, group: ''});
            if (addUser) {
                ctx.body = {
                    code: 200,
                    msg: '新增成功'
                }
            } else {
                ctx.body = {
                    code: 400,
                    msg: '新增失败'
                }
            }
        }
    }else if (req.type === 'edit') {
        const userEdit = await User.updateOne({ _id: req._id }, req);
        if (userEdit.n === 1 && userEdit.nModified === 1 && userEdit.ok === 1) {
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
        const userDel = await User.deleteOne({name: req.name});
        if (userDel) {
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
    // const setUser = await
};

// 获取小组详情
const getGroupDet = async (ctx, next) => {
    const req = ctx.query;
    const groupDet = await User.find({group: req.group}, { name: 1, group: 1, isLeader: 1 }).sort({ name: 1 })
    if (groupDet) {
        ctx.body = {
            code: 200,
            data: groupDet
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '未查询到小组成员信息'
        }
    }
};

// 设置人员所在小组和是否为leader
const memberGroup = async (ctx, next) => {
    const req = ctx.request.body;
    if (req.type === 'add') {
        const addMember = await User.updateOne({ name: req.name }, {group: req.group});
        if (addMember.n === 1 && addMember.nModified === 1 && addMember.ok === 1) {
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
    } else if (req.type === 'remove') {
        const removeMember = await User.updateOne({ name: req.name }, {group: null});
        if (removeMember.n === 1 && removeMember.nModified === 1 && removeMember.ok === 1) {
            ctx.body = {
                code: 200,
                msg: '移除成功'
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '移除失败'
            }
        }
    }else {
        const removeLeader = await User.updateOne({ group: req.group, isLeader: 1 }, {isLeader: 0});

       /* const findUser = await User.findOne({ name: req.name });
        findUser.isLeader = 1;
        console.log(findUser);*/
        const addLeader = await User.updateOne({ name: req.name }, { isLeader: 1 });
        console.log(addLeader);
        // console.log(removeLeader);
        if (removeLeader.n === 1 && removeLeader.nModified === 1 && removeLeader.ok === 1 && addLeader.n === 1 && addLeader.nModified === 1 && addLeader.ok === 1) {
            ctx.body = {
                code: 200,
                msg: '设置成功'
            }
        }else {
            ctx.body = {
                code: 400,
                msg: '设置失败'
            }
        }
    }
};

module.exports = {
    userLogin,
    getUser,
    getAllUser,
    setUser,
    getGroupDet,
    memberGroup
};