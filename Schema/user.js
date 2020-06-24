const { Schema } = require('./config');

const UserSchema = new Schema({
   username: String,
   password: String
}, {
    collection: 'user',
    versionKey: false
});

module.exports = mongoose.model('user', UserSchema);