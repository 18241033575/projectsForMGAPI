const {mongoose, Schema} = require('./config');

const linksSchema = new Schema({
    id: Number,
    url: String,
    applyer: Number,
    passer: Number
}, {
    collection: 'links',
    versionKey: false
});

module.exports = mongoose.model('links', linksSchema);