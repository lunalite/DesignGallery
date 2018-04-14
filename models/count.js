const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true, max: 100},
    count: {type: Number, required: true}
});


module.exports = mongoose.model('Count', countSchema);
