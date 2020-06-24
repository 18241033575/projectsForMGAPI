const {mongoose, Schema} = require('./config');

const projectsResolveSchema = new Schema({
    taskId:      { type: Number },
    parentId:      { type: Number },
    task:      { type: String },
    preTask:      { type: String },
    taskStart:      { type: String },
    taskEnd:      { type: String },
    planDays:      { type: Number },
    actualDays:      { type: Number },
    state:      { type: Number },
}, {
    collection: 'project_child',
    versionKey: false
});

module.exports = mongoose.model('project_child', projectsResolveSchema);