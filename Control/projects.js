/*
    * @Author: Jayshi
    * @Date: 2020.04.26
    * @Description: 任务列表
*/

// 使用schema
const Projects = require('../Schema/projects');
// const ProjectsResolve = require('../Schema/projects_resolve');
const User = require('../Schema/login');
// 操作方法
// 获取分类列表
const getProjects = async (ctx, next) => {
    const req = ctx.query;
    let nowYear = new Date().getFullYear();
    let nowMonth = new Date().getMonth() + 1;
    // 获取当前月份天数
    let days = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    // req.group = null;
    // 根据分组表聚合用户和用户任务之间的练习 -- 通过用户名
    const project = await User.aggregate([
        {
            $lookup: {
                from: 'project_list',
                localField: 'name',
                foreignField: 'name',
                as: 'projects'
            }
        },
        {'$match': {group: req.group}}
    ]);


    // 遍历数据，有parentId的数据将被整合到对应_id上 数组名children，删除在原数据上的数据
    project.forEach(function (item, index) {
        if (item.projects.length > 0) {
            for (let j = item.projects.length - 1; j >= 0; j--) {
                if (item.projects[j].taskStart < (nowYear + '-' + (nowMonth < 10 ? '0' + nowMonth : nowMonth))) {
                    item.projects.splice(j, 1)
                }
            }
        }
    });

    // 结构任务数组 projects 和 children 生成新数组
    let midArray = [];

    for (let i = 0; i < project.length; i++) {
        if (project[i].projects.length > 0) {
            for (let j = 0; j < project[i].projects.length; j++) {
                if (project[i].projects[j].children) {
                    project[i].projects = project[i].projects.concat(project[i].projects[j].children);
                    project[i].projects[j].children = []
                }
            }

        }
        // console.log({projects: project[i].projects});
        midArray = midArray.concat(project[i].projects)
    }

    // 根据新返回数据拆分父任务和子任务
    let returnData = [];
    for (let i = midArray.length - 1; i >= 0; i--) {
        if (!midArray[i].parentId) {
            returnData.push(midArray[i]);
            midArray.splice(i,1);
        }
    }
    returnData.forEach(function (item) {
        for (let i = 0; i < midArray.length; i++ ) {

            if (midArray[i].parentId == item._id) {
                if (!item.children) {
                    item.children = [];
                }
                item.children.push(midArray[i]);

            }
        }
    });
    if (project) {
        ctx.body = {
            code: 200,
            data: returnData
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '未查询到数据'
        }
    }
};

// 更新任务
const setProjects = async (ctx, next) => {
    const req = ctx.request.body;

    const project = await Projects.updateOne({_id: req._id}, req);
    if (project.n === 1 && project.nModified === 1 && project.ok === 1) {
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

// 添加任务
const addProjects = async (ctx, next) => {
    const req = ctx.request.body;
    const project = await Projects.create(req);
    if (project) {
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

// 删除任务
const delProjects = async (ctx, next) => {
    const req = ctx.request.body;
    const project = await Projects.deleteOne({_id: req._id});
    if (project) {
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


// 根据人获取小组成员
const getUsersByUser = async (ctx, next) => {
    const req = ctx.request.body;
    const user = await User.find({ name: req.name });
    let resUser;
    if (req.all) {
        resUser = await User.find({ group: user[0].group }, { name: 1 });
    } else {
        resUser = await User.find({ group: user[0].group, name: { $ne: req.name } }, { name: 1 });
    }

    if (resUser) {
        ctx.body = {
            code: 200,
            data: resUser
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '查询失败'
        }
    }

};


module.exports = {
    getProjects,
    setProjects,
    addProjects,
    delProjects,
    getUsersByUser
};