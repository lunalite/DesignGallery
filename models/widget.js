var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var widgetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true, max: 100},
    // clickable: Boolean,
    color: {type: String, max: 50},
    // "content-desc": {type: String, max: 200},
    coordinates: {
        from: [Number],
        to: [Number]
    },
    dimensions: {
        height: Number,
        width: Number
    },
    // focusable: Boolean,
    // leaf: Boolean,
    package_name: {type: String, required: true, max: 100},
    text: {type: String, max: 200},
    widget_class: {type: String, required:true},
    application_name: {type: String, required: true, max: 100},
    downloads: String,
    url: String,
    src: {type: String, required: true}
});

widgetSchema.statics.findWidgets = function (btnType, cb) {
    return this.model('Widget').find({widget_class: btnType}, cb).limit(30);
};

module.exports = mongoose.model('Widget', widgetSchema);
