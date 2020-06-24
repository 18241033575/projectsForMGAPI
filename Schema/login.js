const { mongoose, Schema } = require('./config');

const UserSchema = new Schema({
    name:      { type: String, required: true },
    password:      { type: String, required: true },
    auth:      { type: Number, required: true },
    group:      { type: String },
    isLeader:      { type: Number }
}, {
    collection: 'user',
    versionKey: false
});

module.exports = mongoose.model('user', UserSchema);