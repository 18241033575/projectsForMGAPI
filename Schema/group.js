const {mongoose, Schema} = require('./config');

const groupSchema = new Schema({
    name:      { type: String, required: true },
    leader:      { type: String, required: true }
}, {
    collection: 'group',
    versionKey: false,
});


module.exports = mongoose.model('group', groupSchema);