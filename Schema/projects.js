const {mongoose, Schema} = require('./config');

const projectsSchema = new Schema({
    task:      { type: String },
    name:      { type: String },
    preTask:      { type: String },
    taskStart:      { type: String },
    taskEnd:      { type: String },
    planDays:      { type: Number },
    actualDays:      { type: Number },
    state:      { type: Number },
    remark:      { type: String },
    parentId:      { type: String },
    isDepend:      { type: Number },
}, {
    collection: 'project_list',
    versionKey: false,
});


module.exports = mongoose.model('project_list', projectsSchema);