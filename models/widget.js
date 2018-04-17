const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const widgetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true, max: 100},
    color: {type: String, max: 50},
    coordinates: {
        from: [Number],
        to: [Number]
    },
    dimensions: {
        height: Number,
        width: Number
    },
    package_name: {type: String, required: true, max: 100},
    text: {type: String, max: 200},
    category: {type: String, max: 50},
    widget_class: {type: String, required: true},
    application_name: {type: String, required: true, max: 100},
    downloads: String,
    url: String,
    src: {type: String, required: true}
});

module.exports = mongoose.model('Widget', widgetSchema);
