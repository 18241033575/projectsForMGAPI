/*
    * @Author: Jayshi
    * @Date: 2020.04.20
    * @Description: 分组列表
*/

// 使用schema
const Group = require('../Schema/group');

// 获取分组列表
const getGroup = async (ctx, next) => {
    /*    const group = await Group.aggregate([{
            $lookup: {
                from: 'project_child',
                localField: 'taskId',
                foreignField: 'parentId',
                as: 'children'
            },
        }]);*/
    const group = await Group.find();
    console.log(group);
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
    // 父级任务
    let pro1 =  await Projects.find({_id: req._id});
    if (pro1.length > 0) {
        const project = await Projects.updateOne({_id: req._id}, req);
        if (project.n === 1 && project.nModified === 1 && project.ok === 1) {
            ctx.body = {
                code: 200,
                msg: '修改成功'
            }
        }else {
            ctx.body = {
                code: 400,
                msg: '修改失败'
            }
        }
    } else {

        const projectsResolve = await ProjectsResolve.updateOne({_id: req._id}, req);
        console.log(projectsResolve);
        if (projectsResolve.n === 1 && projectsResolve.nModified === 1 && projectsResolve.ok === 1) {
            console.log(123);
            ctx.body = {
                code: 200,
                msg: '修改成功'
            }
        }else {
            ctx.body = {
                code: 400,
                msg: '修改失败'
            }
        }
    }
};

// 添加任务
const addProjects = async (ctx, next) => {
    const req = ctx.request.body;
    console.log(Projects);
    const project = await Projects.create(req);
    if (project) {
        ctx.body = {
            code: 200,
            msg: '修改成功'
        }
    }
};

module.exports = {
    getGroup,
    setGroup
};