/*
    * @Author: Jayshi
    * @Date: 2019.12.22
    * @Description: Test Control
*/

// 使用schema
const User = require('../Schema/user');

// API调用实例
const getAllData = async (ctx, next) => {
  const req = ctx.request.body;

  const test = await User.find({
      status: req.status
  }, { _id: 0 });

  if (test) {
      ctx.status = 200;
      ctx.body = {
          code: 200,
          data: test
      }
  } else {
      ctx.body = {
          code: 400,
          msg: '操作失败'
      }
  }

};

module.exports = {
  getAllData
};