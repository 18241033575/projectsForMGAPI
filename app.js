const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require("koa2-cors");
const mongoose = require('mongoose');
const mysql = require('mysql');

const config = require('./config');

const { join } = require('path');

/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});*/
// import mongoose from 'mongoose'

const app = new Koa();
app.use(logger());
app.use(cors());
app.use(bodyParser());

/*mongoose.connect(config.db, {useNewUrlParser:true}, (err) => {
    if (err) {
        console.error('Failed to connect to database');
    } else {
        console.log('Connecting database successfully');
    }
});*/

mongoose.connect(config.db, {useNewUrlParser:true}, (err) => {
    if (err) {
        console.error('Failed to connect to database');
    } else {
        console.log('Connecting database successfully');
    }
});

const links = require('./routers/links');
const projects = require('./routers/projects');
const login = require('./routers/login');
const group = require('./routers/group');


app.use(links.routes()).use(links.allowedMethods());
app.use(projects.routes()).use(projects.allowedMethods());
app.use(login.routes()).use(login.allowedMethods());
app.use(group.routes()).use(group.allowedMethods());





app.listen(config.port, () => {
   console.log(`服务器运行在${config.port}端口`);
});