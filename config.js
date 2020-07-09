/*
    * @Author: Jayshi
    * @Date: 2019.12.22
    * @Description: config file
*/

module.exports = {
        port: 8888, // 项目启动的端口
        db: 'mongodb://localhost:27017/projects', // 数据库
        // db: 'mongodb://mongodb1.db.517.jiali:27017,mongodb2.db.517.jiali:27017/projects?replicaSet=mango?slaveOk=true', // 数据库    上传前需要更改为线上服务器
        saltTimes: 3 // 加盐的次数（用户密码加密）
};